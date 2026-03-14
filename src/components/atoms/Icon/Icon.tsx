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
 * @see docs/PRD.md § 3.1 — Icon specification
 */
import React from 'react';
import styles from './Icon.module.css';

/* ── Icon Name Type ── */

/** Available icon names */
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
  | 'eyeOff';

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
}

/* ── SVG Path Data ──
   All icons use a 24×24 viewBox for consistency.
   Stroke-based icons use stroke="currentColor" and fill="none". */

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  close: (
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  check: (
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  warning: (
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
  info: (
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M12 10a2 2 0 012 2c0 1.02-.1 2.01-.3 2.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M6.41 6.41A8 8 0 0120 12c0 1.48-.13 2.93-.38 4.33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M3.1 11.34A8 8 0 0117.59 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12 14a6.97 6.97 0 01-1.5 4.33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M16 12a12 12 0 01-.84 4.43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M8 12a4 4 0 018 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  shield: (
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  chevronRight: (
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  chevronDown: (
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  external: (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
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
}: IconProps) {
  /* Treat both undefined and empty string as decorative —
     empty ariaLabel would render role="img" with no accessible name */
  const isDecorative = !ariaLabel || ariaLabel.trim() === '';

  return (
    <svg
      className={`${styles.icon} ${SIZE_CLASS[size]}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={color ? { color } : undefined}
      role={isDecorative ? 'presentation' : 'img'}
      aria-label={ariaLabel}
      aria-hidden={isDecorative}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

export default Icon;
