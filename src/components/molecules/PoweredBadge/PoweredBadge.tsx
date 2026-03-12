/**
 * PoweredBadge — Molecule Component
 *
 * Attribution badge displaying "Powered by TrustID" with the TrustID
 * shield icon. Appears in the footer area of banner screens.
 * Uses an inline SVG path for self-contained Figma import.
 *
 * @see docs/PRD.md § 3.2 — PoweredBadge specification
 */
import React from 'react';
import styles from './PoweredBadge.module.css';

/* ── Props ── */

export interface PoweredBadgeProps {
  /** Optional CSS class for positioning */
  className?: string;
}

/* ── Component ── */

export function PoweredBadge({ className }: PoweredBadgeProps) {
  return (
    <div className={`${styles.badge} ${className || ''}`}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          fill="var(--tid-brand)"
        />
        <path
          d="M10 15.5l-3.5-3.5 1.41-1.41L10 12.67l5.59-5.59L17 8.5l-7 7z"
          fill="var(--tid-toggle-knob)"
        />
      </svg>
      <span className={styles.text}>
        Powered by <strong className={styles.brand}>TrustID</strong>
      </span>
    </div>
  );
}

export default PoweredBadge;
