/**
 * Spinner — Atom Component
 *
 * CSS-based loading spinner with brand-blue indicator on a subtle track.
 * Renders as a `<div>` with `role="status"` for screen reader announcement.
 * Three sizes map to icon tokens (sm=16, md=24, lg=32).
 *
 * In Figma exports, the spinner appears as a static frame (no animation).
 *
 * @see docs/PRD.md § 3.1 — Spinner specification
 */
import React from 'react';
import styles from './Spinner.module.css';

/* ── Props ── */

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

/* ── Component ── */

export function Spinner({
  size = 'md',
  ariaLabel = 'Loading',
}: SpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]}`}
      role="status"
      aria-label={ariaLabel}
    >
      <span className={styles.srOnly}>{ariaLabel}</span>
    </div>
  );
}

export default Spinner;
