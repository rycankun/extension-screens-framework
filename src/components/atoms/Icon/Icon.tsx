/**
 * Icon — Atom Component
 *
 * SVG icon wrapper with size and color props. Contains inline SVG path
 * data for all common icons used across the extension screens. Icons
 * are rendered as inline SVGs (not external files) for clean Figma import.
 *
 * When `ariaLabel` is provided, the icon is exposed to assistive tech.
 * When omitted, it's treated as decorative (`aria-hidden="true"`).
 *
 * The registry supports per-icon viewBox overrides for icons whose
 * original artwork was authored at a non-24x24 coordinate space (e.g.,
 * the 12x12 star and clockSm icons). This ensures pixel-identical
 * rendering when moving inline SVGs into the centralized registry.
 *
 * @see docs/PRD.md § 3.1 — Icon specification
 */
import React from 'react';
import styles from './Icon.module.css';

/* ── Icon Name Type ── */

/** Available icon names — union of all registered SVG icons */
export type IconName =
  | 'close'
  | 'check'
  | 'warning'
  | 'info'
  | 'fingerprint'
  | 'shield'
  | 'lock'
  | 'email'
  | 'chevronRight'
  | 'chevronDown'
  | 'external'
  | 'eye'
  | 'eyeOff'
  | 'badgeCheck'
  | 'circleSlash'
  | 'star'
  | 'clock'
  | 'clockSm'
  | 'checkCircle';

/* ── Props ── */

export interface IconProps {
  /** Icon name — selects the SVG path to render */
  name: IconName;
  /** Icon size — maps to --tid-size-icon-* tokens */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Icon color — CSS color value or token reference */
  color?: string;
  /** Accessible label — makes icon visible to screen readers */
  ariaLabel?: string;
  /** Optional CSS class name applied to the root <svg> element */
  className?: string;
}

/* ── Icon Registry Entry ──
   Each entry holds the SVG child elements and an optional viewBox
   override. Icons authored at viewBoxes other than 24x24 (e.g.,
   12x12 star, 12x12 clockSm) retain their original coordinate
   space for pixel-identical rendering at any display size. */

interface IconEntry {
  /** SVG child elements (paths, circles, lines, etc.) */
  paths: React.ReactNode;
  /** Custom viewBox string — defaults to "0 0 24 24" if omitted */
  viewBox?: string;
}

/* ── SVG Path Data ──
   Default viewBox is 24x24. Icons with a different native coordinate
   space specify a viewBox override to preserve stroke proportions.
   Stroke-based icons use stroke="currentColor" and fill="none". */

const ICON_REGISTRY: Record<IconName, IconEntry> = {
  close: {
    paths: (
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  check: {
    paths: (
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  warning: {
    paths: (
      <>
        <path
          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" />
      </>
    ),
  },
  info: {
    paths: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" />
      </>
    ),
  },
  fingerprint: {
    paths: (
      <>
        <path d="M12 10a2 2 0 012 2c0 1.02-.1 2.01-.3 2.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M6.41 6.41A8 8 0 0120 12c0 1.48-.13 2.93-.38 4.33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M3.1 11.34A8 8 0 0117.59 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M12 14a6.97 6.97 0 01-1.5 4.33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M16 12a12 12 0 01-.84 4.43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M8 12a4 4 0 018 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  shield: {
    paths: (
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  lock: {
    paths: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  email: {
    paths: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  chevronRight: {
    paths: (
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  chevronDown: {
    paths: (
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  external: {
    paths: (
      <>
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  eye: {
    paths: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
  },
  eyeOff: {
    paths: (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    ),
  },

  /* ── New icons extracted from screen components ── */

  /** Badge with checkmark — used in universal opt-out disclosures
   *  (ConsentEU, ConsentUS). Stroke-based, 24x24 viewBox. */
  badgeCheck: {
    paths: (
      <>
        <path
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.77 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },

  /** Circle with diagonal slash — used for DNT (Do Not Track)
   *  indicator in ConsentUS. Stroke-based, 24x24 viewBox. */
  circleSlash: {
    paths: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },

  /** Five-point star — used for trust signal micro text in
   *  EmailCapture, CookieEmail, DsrIntake. Fill-based icon with
   *  0.6 opacity, native 12x12 viewBox to preserve stroke/fill
   *  proportions at the 12px render size. */
  star: {
    paths: (
      <path
        d="M6 1L7 3.5H9.5L7.5 5.5L8.5 8L6 6.5L3.5 8L4.5 5.5L2.5 3.5H5L6 1Z"
        fill="currentColor"
        opacity="0.6"
      />
    ),
    /* Native 12x12 coordinate space — preserves fill proportions
       at the xs (12px) render size used by trust signal icons */
    viewBox: '0 0 12 12',
  },

  /** Clock face — used for expiry callout in CookieEmail.
   *  Stroke-based, standard 24x24 viewBox with strokeWidth 2. */
  clock: {
    paths: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },

  /** Clock face (small variant) — used for DSR response time
   *  notice in DsrIntake. Native 12x12 viewBox with thinner
   *  strokes (1.2) to preserve the predecessor's proportions
   *  at the xs (12px) render size. */
  clockSm: {
    paths: (
      <>
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <polyline points="6,3 6,6 8,7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
    /* Native 12x12 coordinate space — preserves thinner stroke
       proportions at the xs (12px) render size */
    viewBox: '0 0 12 12',
  },

  /** Circle with checkmark — used for DNS confirm success state.
   *  Stroke-based, 24x24 viewBox. The partial circle creates a
   *  progress-like appearance matching the predecessor pattern. */
  checkCircle: {
    paths: (
      <>
        <path
          d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          points="22 4 12 14.01 9 11.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
};

/* ── Size Mapping ──
   Maps size prop values to CSS class names */
const SIZE_CLASS: Record<NonNullable<IconProps['size']>, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

/* ── Component ── */

export function Icon({
  name,
  size = 'sm',
  color,
  ariaLabel,
  className,
}: IconProps) {
  /* Treat both undefined and empty string as decorative —
     empty ariaLabel would render role="img" with no accessible name */
  const isDecorative = !ariaLabel || ariaLabel.trim() === '';

  const entry = ICON_REGISTRY[name];
  /* Use the icon's native viewBox when specified, falling back to the
     standard 24x24 coordinate space used by the majority of icons */
  const viewBox = entry.viewBox ?? '0 0 24 24';

  /* Merge the base icon class, size class, and any consumer-provided
     className (used by screen components for layout-specific overrides
     like flex-shrink, margin-top, etc.) */
  const classes = [styles.icon, SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={classes}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={color ? { color } : undefined}
      role={isDecorative ? 'presentation' : 'img'}
      aria-label={ariaLabel}
      aria-hidden={isDecorative}
    >
      {entry.paths}
    </svg>
  );
}

export default Icon;
