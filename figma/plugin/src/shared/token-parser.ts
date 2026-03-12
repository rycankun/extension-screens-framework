/**
 * Token Parser — Figma Plugin Shared Utilities
 *
 * Converts the figma-variables.json manifest into data structures
 * that the Figma Plugin API can consume directly. Handles:
 *   - Hex color strings → Figma RGBA objects (0–1 range)
 *   - CSS unit values ("8px", "0.5") → raw numbers
 *   - Complex strings (shadows, gradients) → pass-through strings
 *
 * The parser is used by code.ts (main thread) to create/update
 * Figma Variables from the token manifest.
 *
 * @see src/tokens/figma-variables.json — input manifest
 * @see src/types/tokens.ts — TypeScript interfaces
 * @see figma/plugin/src/code.ts — consumer of parsed tokens
 */

/* ── Types ── */

/**
 * Figma RGBA color in 0–1 range.
 * Figma's API uses floats (0–1), not integers (0–255).
 */
export interface FigmaRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** A parsed token ready for the Figma Variables API */
export interface ParsedToken {
  /** Token name without --tid- prefix */
  name: string;
  /** Figma resolved type */
  type: 'COLOR' | 'FLOAT' | 'STRING';
  /** Parsed values keyed by mode name */
  values: Record<string, FigmaRGBA | number | string>;
}

/** A parsed collection ready for Figma Variable collection creation */
export interface ParsedCollection {
  /** Collection name (e.g., "Colors", "Spacing") */
  name: string;
  /** Mode names (e.g., ["Light", "Dark"] or ["Default"]) */
  modes: string[];
  /** Parsed tokens with Figma-compatible values */
  tokens: ParsedToken[];
}

/** Raw manifest shape from figma-variables.json */
export interface RawManifest {
  /** ISO timestamp of generation */
  generatedAt: string;
  /** Total token count */
  tokenCount: number;
  /** Number of collections */
  collectionCount: number;
  /** Collections with raw string values */
  collections: Array<{
    name: string;
    modes: string[];
    variables: Array<{
      name: string;
      type: 'COLOR' | 'FLOAT' | 'STRING';
      values: Record<string, string>;
    }>;
  }>;
}

/* ── Color Parsing ── */

/**
 * Parse a hex color string into a Figma RGBA object.
 * Supports #RGB, #RRGGBB, and #RRGGBBAA formats.
 * Returns null for non-hex values (e.g., "transparent", rgb()).
 */
export function parseHexToRGBA(hex: string): FigmaRGBA | null {
  const trimmed = hex.trim();

  /* Handle 'transparent' as fully-transparent black */
  if (trimmed === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  /* Only process hex strings */
  if (!trimmed.startsWith('#')) {
    return null;
  }

  const raw = trimmed.slice(1);
  let r: number, g: number, b: number, a: number;

  if (raw.length === 3) {
    /* #RGB → expand to #RRGGBB */
    r = parseInt(raw[0] + raw[0], 16) / 255;
    g = parseInt(raw[1] + raw[1], 16) / 255;
    b = parseInt(raw[2] + raw[2], 16) / 255;
    a = 1;
  } else if (raw.length === 6) {
    /* #RRGGBB */
    r = parseInt(raw.slice(0, 2), 16) / 255;
    g = parseInt(raw.slice(2, 4), 16) / 255;
    b = parseInt(raw.slice(4, 6), 16) / 255;
    a = 1;
  } else if (raw.length === 8) {
    /* #RRGGBBAA */
    r = parseInt(raw.slice(0, 2), 16) / 255;
    g = parseInt(raw.slice(2, 4), 16) / 255;
    b = parseInt(raw.slice(4, 6), 16) / 255;
    a = parseInt(raw.slice(6, 8), 16) / 255;
  } else {
    return null;
  }

  return { r, g, b, a };
}

/* ── Numeric Parsing ── */

/**
 * Extract the numeric value from a CSS unit string.
 * "8px" → 8, "0.5" → 0.5, "400" → 400, "0.04em" → 0.04
 * Returns NaN for non-numeric strings.
 */
export function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  /* Strip known CSS units — we only need the raw number for Figma */
  const stripped = trimmed.replace(/(px|rem|em|ms|s|%|deg)$/, '');
  return parseFloat(stripped);
}

/* ── Token Value Resolution ── */

/**
 * Resolve a single token value string into its Figma-compatible form.
 *
 * COLOR tokens → FigmaRGBA object
 * FLOAT tokens → number (stripped of units)
 * STRING tokens → raw string (shadows, gradients, font stacks)
 */
export function resolveTokenValue(
  value: string,
  type: 'COLOR' | 'FLOAT' | 'STRING',
): FigmaRGBA | number | string {
  switch (type) {
    case 'COLOR': {
      const rgba = parseHexToRGBA(value);
      /* Fall back to string for values that aren't simple hex (e.g. rgb() syntax) */
      if (rgba) return rgba;
      /* Return a transparent fallback so Figma doesn't crash on unparseable colors */
      return { r: 0, g: 0, b: 0, a: 0 };
    }
    case 'FLOAT': {
      const num = parseNumericValue(value);
      return isNaN(num) ? 0 : num;
    }
    case 'STRING':
      return value;
  }
}

/* ── Manifest Parsing ── */

/**
 * Parse the raw figma-variables.json manifest into Figma-ready collections.
 * Each collection's token values are resolved from CSS strings into
 * Figma-compatible types (RGBA objects, numbers, strings).
 */
export function parseManifest(manifest: RawManifest): ParsedCollection[] {
  return manifest.collections.map((collection) => ({
    name: collection.name,
    modes: collection.modes,
    tokens: collection.variables.map((variable) => {
      const parsedValues: Record<string, FigmaRGBA | number | string> = {};

      for (const [mode, rawValue] of Object.entries(variable.values)) {
        parsedValues[mode] = resolveTokenValue(rawValue, variable.type);
      }

      return {
        name: variable.name,
        type: variable.type,
        values: parsedValues,
      };
    }),
  }));
}

/**
 * Parse a JSON string of the manifest.
 * Used in code.ts where the manifest is injected as a string constant at build time.
 */
export function parseManifestFromString(jsonString: string): ParsedCollection[] {
  const manifest: RawManifest = JSON.parse(jsonString);
  return parseManifest(manifest);
}
