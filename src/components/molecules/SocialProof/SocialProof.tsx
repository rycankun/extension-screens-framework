/**
 * SocialProof — Molecule Component
 *
 * Trust signal line with a badge-check icon and reassurance text.
 * Shows "End-to-end encrypted · No data stored · No tracking" or
 * similar trust messaging below consent prompts.
 *
 * Predecessor ref: .social-proof, .social-proof-bold
 * in components.css:1108-1122
 *
 * @see docs/PRD.md § 3.2 — SocialProof specification
 */
import React from 'react';
import styles from './SocialProof.module.css';

/* ── Props ── */

export interface SocialProofProps {
  /** Trust text to display (can include bold segments via children) */
  children: React.ReactNode;
  /** Optional CSS class for positioning */
  className?: string;
}

/* ── Badge Check Icon ──
   Inline SVG for Figma-compatible self-contained rendering.
   14px × 14px, brand blue color. */
function BadgeCheckIcon() {
  return (
    <svg
      className={styles.icon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Component ── */

export function SocialProof({ children, className }: SocialProofProps) {
  return (
    <div className={`${styles.socialProof} ${className || ''}`}>
      <BadgeCheckIcon />
      <span>{children}</span>
    </div>
  );
}

/* ── Bold Subcomponent ──
   Use <SocialProof.Bold> for emphasized text segments. */
function SocialProofBold({ children }: { children: React.ReactNode }) {
  return <span className={styles.bold}>{children}</span>;
}

SocialProof.Bold = SocialProofBold;

export default SocialProof;
