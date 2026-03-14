/**
 * Token Generation Script — TrustID Extension Screen Library
 *
 * Automated pipeline: tokens.css → figma-variables.json
 *
 * This script is the bridge between the CSS token source of truth and
 * the Figma Variables API. It parses tokens.css, detects variable types,
 * groups tokens into Figma Variable Collections with appropriate modes,
 * and writes a structured manifest that the Figma plugin consumes.
 *
 * Usage: pnpm generate:tokens
 *
 * Pipeline:
 *   1. Read tokens.css as plain text
 *   2. Extract :root (light) and [data-theme='dark'] (dark) token blocks
 *   3. Parse all --tid-* declarations from each block
 *   4. Categorize tokens by name prefix → collection group
 *   5. Detect Figma variable type for each value (COLOR, FLOAT, STRING)
 *   6. Determine modes per collection (Light/Dark if any dark overrides exist)
 *   7. Write figma-variables.json in the Figma Variables API format
 *
 * Output format mirrors Figma's Variable API:
 *   Manifest → Collections → Variables → Values (per mode)
 *
 * @see src/tokens/tokens.css — canonical token definitions
 * @see src/types/tokens.ts — TypeScript types for the manifest
 * @see docs/PRD.md § 7.1 — Figma plugin's expected collection structure
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import type { FigmaVarType, FigmaVariable, FigmaCollection, FigmaVariablesManifest } from '../../src/types/tokens';

/* ══════════════════════════════════════════════════════════════════════
   Paths
   ══════════════════════════════════════════════════════════════════════ */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Canonical token source — CSS custom properties in :root and [data-theme='dark'] */
const TOKENS_CSS = resolve(__dirname, '../../src/tokens/tokens.css');

/** Generated manifest consumed by the Figma plugin */
const OUTPUT_JSON = resolve(__dirname, '../../src/tokens/figma-variables.json');

/* ══════════════════════════════════════════════════════════════════════
   Collection Configuration
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Maps internal category keys to Figma collection display names.
 * The order here determines collection order in the manifest (and thus
 * the order they appear in Figma's Variables panel).
 *
 * Dark mode detection is automatic — if ANY token in a category has a
 * dark override in [data-theme='dark'], the collection gets Light/Dark modes.
 * Otherwise it gets a single "Default" mode.
 */
const COLLECTION_NAMES: Record<string, string> = {
  color: 'Colors',
  border: 'Borders',
  typography: 'Typography',
  spacing: 'Spacing',
  radius: 'Border Radius',
  sizing: 'Sizing',
  shadow: 'Shadows',
  'z-index': 'Z-Index',
  transition: 'Transitions',
  opacity: 'Opacity',
  blur: 'Backdrop Blur',
  gradient: 'Gradients',
};

/**
 * Ordered list of collection keys — controls output order.
 * Colors first (most frequently referenced), structural tokens in the
 * middle, decorative/animation tokens last.
 */
const COLLECTION_ORDER = [
  'color',
  'border',
  'shadow',
  'gradient',
  'typography',
  'spacing',
  'radius',
  'sizing',
  'z-index',
  'transition',
  'opacity',
  'blur',
];

/* ══════════════════════════════════════════════════════════════════════
   Token Category Detection
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Determines the Figma Variable collection category based on token name.
 * Uses prefix matching with most-specific-first ordering to avoid
 * false positives (e.g., "border-focus" is a border color, not a focus token).
 *
 * @param name — Token name without the --tid- prefix (e.g., "brand", "sp-4")
 * @returns Category key matching a COLLECTION_NAMES entry
 */
function categorize(name: string): string {
  /* ── RGB channel tokens ──
     Decomposed RGB values (e.g., "14, 111, 255") used in rgba() patterns.
     Grouped with color since they represent the same design decisions. */
  if (name.endsWith('-rgb')) return 'color';

  /* ── Color tokens ──
     Ordered from most-specific prefix to broadest to prevent mis-categorization.
     Example: "icon-on-color" must match before a hypothetical "icon-size-*". */
  if (name.startsWith('ink') || name.startsWith('text-')) return 'color';
  if (name.startsWith('brand') || name.startsWith('success') || name.startsWith('error') || name.startsWith('warning')) return 'color';
  if (name.startsWith('page-bg') || name.startsWith('surface')) return 'color';
  if (name.startsWith('btn-') || name.startsWith('toggle-')) return 'color';
  if (name.startsWith('icon-on-') || name.startsWith('info')) return 'color';
  if (name.startsWith('black-') || name.startsWith('white-')) return 'color';

  /* ── Border (colors + widths) ──
     Both border colors (#E5E7EB) and border widths (1px) share one collection.
     The Figma plugin can sub-group by type if needed. */
  if (name.startsWith('border')) return 'border';

  /* ── Typography ── */
  if (name.startsWith('ff-') || name.startsWith('fw-')) return 'typography';
  if (name.startsWith('fs-')) return 'typography';
  if (name.startsWith('ls-') || name.startsWith('lh-')) return 'typography';

  /* ── Spacing ── */
  if (name.startsWith('sp-')) return 'spacing';

  /* ── Border Radius ── */
  if (name.startsWith('radius-')) return 'radius';

  /* ── Sizing ── */
  if (name.startsWith('size-')) return 'sizing';

  /* ── Shadows ── */
  if (name.startsWith('shadow-')) return 'shadow';

  /* ── Z-Index ── */
  if (name.startsWith('z-')) return 'z-index';

  /* ── Transitions ── */
  if (name.startsWith('duration-') || name.startsWith('ease-')) return 'transition';

  /* ── Opacity ── */
  if (name.startsWith('opacity-')) return 'opacity';

  /* ── Backdrop Blur & Saturation ── */
  if (name.startsWith('blur-') || name.startsWith('saturate-')) return 'blur';

  /* ── Gradients ── */
  if (name.startsWith('gradient-')) return 'gradient';

  /* ── Outline/border width (falls under Borders collection) ── */
  if (name.startsWith('outline-')) return 'border';

  return 'other';
}

/* ══════════════════════════════════════════════════════════════════════
   Figma Variable Type Detection
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Determines the Figma Variable resolved type from a CSS value string.
 *
 * Figma supports three resolved types:
 *   COLOR  — RGBA color values (the plugin will parse hex → RGBA)
 *   FLOAT  — Numeric values (the plugin strips units and stores raw numbers)
 *   STRING — Everything else (font stacks, shadows, gradients, easing curves)
 *
 * Type detection uses the LIGHT mode value since it's always present.
 * Dark values for the same token always share the same type.
 *
 * @param value — CSS property value string (e.g., "#0E6FFF", "8px", "'Inter', sans-serif")
 */
function detectType(value: string): FigmaVarType {
  const v = value.trim();

  /* ── COLOR ──
     Hex colors (#RGB, #RRGGBB, #RRGGBBAA) and the "transparent" keyword.
     rgb()/rgba() functional notation also qualifies, but our tokens use hex. */
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return 'COLOR';
  if (v === 'transparent') return 'COLOR';

  /* ── FLOAT ──
     Pure numbers (z-index, font-weight, opacity) and values with CSS units.
     The Figma plugin strips units — only the numeric value is stored.
     Covers: px, ms, em, rem, %, and unitless. */
  if (/^-?[\d.]+$/.test(v)) return 'FLOAT';
  if (/^-?[\d.]+(?:px|ms|em|rem|%)$/.test(v)) return 'FLOAT';

  /* ── STRING ──
     Everything else: font-family stacks, box-shadows, gradients, cubic-bezier
     easing functions, comma-separated RGB channels, "none", "9999px" (pill radius),
     complex multi-value shorthands. These are stored as raw strings in Figma. */
  return 'STRING';
}

/* ══════════════════════════════════════════════════════════════════════
   CSS Parsing
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Regex to match CSS custom property declarations: --tid-name: value;
 *
 * Captures:
 *   Group 1: token name without --tid- prefix (kebab-case, alphanumeric + hyphens)
 *   Group 2: value (everything up to the semicolon, trimmed later)
 *
 * The [^;]+ is greedy so multi-value properties (e.g., box-shadow with commas)
 * are captured in full. The regex does NOT match nested blocks or @-rules.
 */
const TOKEN_PATTERN = /--tid-([a-z0-9-]+)\s*:\s*([^;]+);/g;

/**
 * Extracts all --tid-* tokens from a CSS block string.
 *
 * Creates a new regex instance per call to avoid stale lastIndex state
 * from the global regex flag. Returns a Map preserving declaration order.
 *
 * @param cssBlock — Raw CSS text from inside a rule block (e.g., :root { ... })
 * @returns Map of token name → CSS value, in source order
 */
function extractTokens(cssBlock: string): Map<string, string> {
  const tokens = new Map<string, string>();
  /* Create a fresh regex to avoid shared lastIndex state between calls.
     RegExp.exec with /g flag maintains lastIndex on the regex object,
     which would cause the second call (dark block) to miss tokens if
     the regex instance were reused. matchAll avoids this entirely. */
  const regex = new RegExp(TOKEN_PATTERN.source, 'g');
  let match;
  while ((match = regex.exec(cssBlock)) !== null) {
    tokens.set(match[1], match[2].trim());
  }
  return tokens;
}

/* ══════════════════════════════════════════════════════════════════════
   Manifest Builder
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Builds the Figma Variables manifest from parsed light and dark token maps.
 *
 * Algorithm:
 *   1. Group light tokens by category
 *   2. For each category, check if ANY token has a dark override
 *   3. If yes → multi-mode collection (Light/Dark); if no → single-mode (Default)
 *   4. Build variables with values keyed by mode name
 *   5. Order collections by COLLECTION_ORDER
 *
 * @param lightTokens — All tokens from :root
 * @param darkTokens — Override tokens from [data-theme='dark']
 */
function buildManifest(
  lightTokens: Map<string, string>,
  darkTokens: Map<string, string>,
): FigmaVariablesManifest {

  /* ── Step 1: Group tokens by category ── */
  const grouped = new Map<string, { name: string; lightValue: string; darkValue: string | null }[]>();

  for (const [name, lightValue] of lightTokens) {
    const category = categorize(name);
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push({
      name,
      lightValue,
      darkValue: darkTokens.get(name) ?? null,
    });
  }

  /* ── Step 2: Build collections ── */
  const collections: FigmaCollection[] = [];
  let totalTokens = 0;

  for (const categoryKey of COLLECTION_ORDER) {
    const tokens = grouped.get(categoryKey);
    if (!tokens || tokens.length === 0) continue;

    /* Determine if this collection needs Light/Dark modes.
       A collection gets dual modes if ANY of its tokens has a dark override.
       This avoids creating unnecessary modes for structural tokens
       (spacing, sizing, etc.) that don't change between themes. */
    const hasDarkMode = tokens.some((t) => t.darkValue !== null);
    const modes = hasDarkMode ? ['Light', 'Dark'] : ['Default'];

    /* Build variable entries with values keyed by mode name */
    const variables: FigmaVariable[] = tokens.map((t) => {
      const type = detectType(t.lightValue);

      const values: Record<string, string> = {};
      if (hasDarkMode) {
        values['Light'] = t.lightValue;
        /* Dark value falls back to light value when no override exists.
           This ensures every variable has a value in every mode —
           required by the Figma Variables API. */
        values['Dark'] = t.darkValue ?? t.lightValue;
      } else {
        values['Default'] = t.lightValue;
      }

      return { name: t.name, type, values };
    });

    const collectionName = COLLECTION_NAMES[categoryKey] ?? categoryKey;
    collections.push({ name: collectionName, modes, variables });
    totalTokens += variables.length;
  }

  /* ── Step 3: Handle uncategorized tokens ── */
  const otherTokens = grouped.get('other');
  if (otherTokens && otherTokens.length > 0) {
    console.warn(
      `WARNING: ${otherTokens.length} uncategorized token(s) found:`,
      otherTokens.map((t) => `--tid-${t.name}`).join(', '),
    );
    console.warn('Add prefix patterns to categorize() to fix this.');
  }

  return {
    generatedAt: new Date().toISOString(),
    tokenCount: totalTokens,
    collectionCount: collections.length,
    collections,
  };
}

/* ══════════════════════════════════════════════════════════════════════
   Main Entry Point
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Reads tokens.css, parses both theme blocks, builds the manifest,
 * writes figma-variables.json, and prints a summary.
 */
function main() {
  const css = readFileSync(TOKENS_CSS, 'utf-8');

  /* ── Extract :root and [data-theme='dark'] blocks ──
     The regex uses /s (dotAll) so . matches newlines within the block.
     The nested-brace pattern (?:\{[^}]*\}[^}]*)* handles any nested rules,
     though tokens.css currently has flat declarations only. */
  const rootMatch = css.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
  const darkMatch = css.match(/\[data-theme=['"]dark['"]\]\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);

  if (!rootMatch) {
    console.error('ERROR: Could not find :root block in tokens.css');
    process.exit(1);
  }

  const lightTokens = extractTokens(rootMatch[1]);
  const darkTokens = darkMatch ? extractTokens(darkMatch[1]) : new Map<string, string>();

  /* Build the manifest with collections, modes, and typed variables */
  const manifest = buildManifest(lightTokens, darkTokens);

  /* Write the manifest */
  writeFileSync(OUTPUT_JSON, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

  /* ── Summary ── */
  console.log(`\n  Token Generation Complete`);
  console.log(`  ════════════════════════`);
  console.log(`  Total tokens: ${manifest.tokenCount}`);
  console.log(`  Collections:  ${manifest.collectionCount}`);
  console.log('');
  for (const col of manifest.collections) {
    const modeLabel = col.modes.join('/');
    const typeBreakdown = {
      COLOR: col.variables.filter((v) => v.type === 'COLOR').length,
      FLOAT: col.variables.filter((v) => v.type === 'FLOAT').length,
      STRING: col.variables.filter((v) => v.type === 'STRING').length,
    };
    const typeParts = Object.entries(typeBreakdown)
      .filter(([, count]) => count > 0)
      .map(([type, count]) => `${count} ${type}`)
      .join(', ');
    console.log(`  ${col.name} (${modeLabel}): ${col.variables.length} vars — ${typeParts}`);
  }
  console.log(`\n  → ${OUTPUT_JSON}\n`);
}

main();
