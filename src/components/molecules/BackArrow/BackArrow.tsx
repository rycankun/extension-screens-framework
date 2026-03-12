/**
 * BackArrow — Molecule Component
 *
 * Navigation back button for sub-screens (OTP entry, cookie email, etc.).
 * Uses a native <button> with a chevron-left SVG icon. 44px touch target
 * with 16px icon, matching the close button pattern.
 *
 * Predecessor ref: .back-arrow in components.css:1146-1172
 *
 * @see docs/PRD.md § 3.2 — BackArrow specification
 */
import React from 'react';
import styles from './BackArrow.module.css';

/* ── Props ── */

export interface BackArrowProps {
  /** Callback when the back button is clicked */
  onClick?: () => void;
  /** Accessible label (default: "Go back to previous screen") */
  ariaLabel?: string;
}

/* ── Component ── */

export function BackArrow({
  onClick,
  ariaLabel = 'Go back to previous screen',
}: BackArrowProps) {
  return (
    <button
      className={styles.backArrow}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {/* ── Chevron Left SVG ──
          Inline SVG for Figma-compatible self-contained rendering.
          Uses stroke instead of fill for clean chevron line. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}

export default BackArrow;
