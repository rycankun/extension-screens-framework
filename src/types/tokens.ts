/**
 * Token Types — TrustID Extension Screen Library
 *
 * TypeScript types for the design token system. Used by the
 * generate-tokens script and Figma plugin to ensure type safety
 * when working with token values programmatically.
 *
 * @see src/tokens/tokens.css for the canonical token definitions
 * @see figma/scripts/generate-tokens.ts for the generation script
 */

/* ── Token Categories ── */

/** Categories used to organize tokens in Figma Variable collections */
export type TokenCategory =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'sizing'
  | 'shadow'
  | 'z-index'
  | 'transition'
  | 'opacity'
  | 'border';

/* ── Figma Variable Manifest ── */

/** A single token entry in the Figma Variables manifest */
export interface FigmaToken {
  /** Token name without the --tid- prefix */
  name: string;
  /** Token category for Figma collection grouping */
  category: TokenCategory;
  /** Light mode value */
  lightValue: string;
  /** Dark mode value (null if token doesn't change between modes) */
  darkValue: string | null;
}

/** The complete Figma Variables manifest structure */
export interface FigmaVariablesManifest {
  /** ISO timestamp of last generation */
  generatedAt: string;
  /** Total number of tokens */
  tokenCount: number;
  /** Token entries grouped by category */
  tokens: FigmaToken[];
}
