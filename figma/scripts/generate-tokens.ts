/**
 * Token Generation Script — TrustID Extension Screen Library
 *
 * Parses src/tokens/tokens.css and generates src/tokens/figma-variables.json
 * for the Figma plugin's Variable sync. This is the bridge between the
 * CSS token source of truth and Figma's Variable system.
 *
 * Usage: pnpm generate:tokens
 *
 * How it works:
 *   1. Reads tokens.css as plain text
 *   2. Extracts all --tid-* custom property declarations from :root (light)
 *   3. Extracts dark theme overrides from [data-theme='dark']
 *   4. Categorizes each token by its name prefix
 *   5. Writes the structured manifest to figma-variables.json
 *
 * @see src/tokens/tokens.css for the canonical token definitions
 * @see src/types/tokens.ts for the manifest TypeScript types
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/* ── Paths ── */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TOKENS_CSS = resolve(__dirname, '../../src/tokens/tokens.css');
const OUTPUT_JSON = resolve(__dirname, '../../src/tokens/figma-variables.json');

/* ── Token Category Detection ── */

/**
 * Determines the Figma Variable collection category based on token name prefix.
 * Maps --tid-{prefix}-* patterns to collection groups.
 */
function categorize(name: string): string {
  // Color tokens (most specific first)
  if (name.startsWith('ink') || name.startsWith('text-')) return 'color';
  if (name.startsWith('brand') || name.startsWith('success') || name.startsWith('error') || name.startsWith('warning')) return 'color';
  if (name.startsWith('page-bg') || name.startsWith('surface')) return 'color';
  if (name.startsWith('btn-') || name.startsWith('toggle-')) return 'color';
  if (name.startsWith('icon-on-')) return 'color';
  if (name.startsWith('border')) return 'border';

  // Typography
  if (name.startsWith('ff-') || name.startsWith('fw-')) return 'typography';
  if (name.startsWith('fs-')) return 'typography';
  if (name.startsWith('ls-') || name.startsWith('lh-')) return 'typography';

  // Spacing
  if (name.startsWith('sp-')) return 'spacing';

  // Radius
  if (name.startsWith('radius-')) return 'radius';

  // Sizing
  if (name.startsWith('size-')) return 'sizing';

  // Shadows
  if (name.startsWith('shadow-')) return 'shadow';

  // Z-index
  if (name.startsWith('z-')) return 'z-index';

  // Transitions
  if (name.startsWith('duration-') || name.startsWith('ease-')) return 'transition';

  // Opacity
  if (name.startsWith('opacity-')) return 'opacity';

  // Outline / border width
  if (name.startsWith('outline-')) return 'border';

  return 'other';
}

/* ── CSS Parsing ── */

/** Regex to match CSS custom property declarations: --tid-name: value; */
const TOKEN_REGEX = /--tid-([a-z0-9-]+)\s*:\s*([^;]+);/g;

/**
 * Extracts all --tid-* tokens from a CSS block string.
 * Returns a Map of token name → value.
 */
function extractTokens(cssBlock: string): Map<string, string> {
  const tokens = new Map<string, string>();
  let match;
  while ((match = TOKEN_REGEX.exec(cssBlock)) !== null) {
    tokens.set(match[1], match[2].trim());
  }
  return tokens;
}

/* ── Main ── */

function main() {
  const css = readFileSync(TOKENS_CSS, 'utf-8');

  // Split into :root (light) and [data-theme='dark'] blocks
  const rootMatch = css.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
  const darkMatch = css.match(/\[data-theme=['"]dark['"]\]\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);

  if (!rootMatch) {
    console.error('ERROR: Could not find :root block in tokens.css');
    process.exit(1);
  }

  const lightTokens = extractTokens(rootMatch[1]);
  const darkTokens = darkMatch ? extractTokens(darkMatch[1]) : new Map<string, string>();

  // Build manifest
  const tokens = Array.from(lightTokens.entries()).map(([name, lightValue]) => ({
    name,
    category: categorize(name),
    lightValue,
    darkValue: darkTokens.get(name) ?? null,
  }));

  const manifest = {
    generatedAt: new Date().toISOString(),
    tokenCount: tokens.length,
    tokens,
  };

  writeFileSync(OUTPUT_JSON, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  console.log(`Generated ${tokens.length} tokens → ${OUTPUT_JSON}`);
}

main();
