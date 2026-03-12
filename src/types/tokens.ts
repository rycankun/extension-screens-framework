/**
 * Token Types — TrustID Extension Screen Library
 *
 * TypeScript types for the design token system and Figma Variables manifest.
 * Used by the generate-tokens script to produce figma-variables.json and
 * by the Figma plugin to consume it for Variable sync.
 *
 * The manifest mirrors the Figma Variables API structure:
 *   Collections → Modes → Variables → Values
 *
 * @see src/tokens/tokens.css for the canonical token definitions
 * @see figma/scripts/generate-tokens.ts for the generation script
 * @see docs/PRD.md § 7.1 for the Figma plugin's expected format
 */

/* ── Figma Variable Types ── */

/**
 * Figma Variable resolved types.
 * Maps to the Figma Plugin API's VariableResolvedDataType:
 *   COLOR  — hex colors, rgb/rgba, `transparent`
 *   FLOAT  — numeric values with units (px, ms, em) or unitless (opacity, z-index, weight)
 *   STRING — font stacks, shadows, gradients, cubic-bezier, complex CSS values
 */
export type FigmaVarType = 'COLOR' | 'FLOAT' | 'STRING';

/* ── Token Categories ── */

/**
 * Categories used to organize tokens into Figma Variable collections.
 * Each category becomes one collection in the Figma file.
 * Categories with color-dependent values get Light/Dark modes;
 * structural categories (spacing, sizing, etc.) use a single mode.
 */
export type TokenCategory =
  | 'color'
  | 'border'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'sizing'
  | 'shadow'
  | 'z-index'
  | 'transition'
  | 'opacity'
  | 'blur'
  | 'gradient';

/* ── Figma Variable ── */

/**
 * A single variable entry within a Figma Variable collection.
 * Contains the token's value(s) keyed by mode name (e.g., "Light", "Dark").
 */
export interface FigmaVariable {
  /** Token name without the --tid- prefix (e.g., "brand", "sp-4") */
  name: string;
  /** Figma resolved type — determines how the plugin creates the Variable */
  type: FigmaVarType;
  /**
   * Values keyed by mode name.
   * Multi-mode collections: { "Light": "#0E6FFF", "Dark": "#5BA3FF" }
   * Single-mode collections: { "Default": "8px" }
   */
  values: Record<string, string>;
}

/* ── Figma Variable Collection ── */

/**
 * A Figma Variable Collection groups related tokens with shared modes.
 * Maps directly to the Figma Plugin API's createVariableCollection().
 */
export interface FigmaCollection {
  /** Human-readable collection name (e.g., "Colors", "Spacing") */
  name: string;
  /** Mode names for this collection (e.g., ["Light", "Dark"] or ["Default"]) */
  modes: string[];
  /** All variables in this collection */
  variables: FigmaVariable[];
}

/* ── Figma Variables Manifest ── */

/**
 * The complete manifest structure written to figma-variables.json.
 * The Figma plugin reads this file to create/update Variable collections.
 */
export interface FigmaVariablesManifest {
  /** ISO timestamp of last generation run */
  generatedAt: string;
  /** Total number of unique tokens across all collections */
  tokenCount: number;
  /** Number of Figma Variable collections */
  collectionCount: number;
  /** Ordered list of collections — each becomes a Figma Variable collection */
  collections: FigmaCollection[];
}
