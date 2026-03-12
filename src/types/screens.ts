/**
 * Screen Types — TrustID Extension Screen Library
 *
 * TypeScript interfaces for screen component props, variant axes,
 * and screen metadata. All screen components implement ScreenVariantProps
 * to ensure consistent variant control across the library.
 *
 * @see src/constants/screens.ts for screen IDs and ARIA titles
 * @see docs/PRD.md § Variant System for axis definitions
 */

import type { Jurisdiction } from '../constants/jurisdictions';
import type { Scenario, SlcMode } from '../constants/variants';

/* ── Theme ── */

/** Theme axis — controls CSS token overrides via data-theme attribute */
export type Theme = 'light' | 'dark';

/* ── Variant Props ── */

/**
 * Base variant props accepted by every screen component.
 * Individual screens extend this with screen-specific state flags.
 */
export interface ScreenVariantProps {
  /** Visual theme — light (default) or dark */
  theme?: Theme;
  /** Jurisdiction tier — controls legal text, toggle defaults, consent model */
  jurisdiction?: Jurisdiction;
  /** User scenario — controls which screens appear in flows */
  scenario?: Scenario;
  /** Whether the age gate flow is active */
  honorAgeGate?: boolean;
  /** SLC eSIM verification mode */
  slcMode?: SlcMode;
}

/* ── Screen Metadata ── */

/** Metadata for a single screen, used by the Figma plugin and Storybook */
export interface ScreenMeta {
  /** Unique screen identifier (matches SCREENS constant values) */
  id: string;
  /** Human-readable title for ARIA labels and Storybook sidebar */
  title: string;
  /** Screen category for organization */
  category: string;
}
