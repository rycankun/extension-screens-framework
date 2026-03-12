/**
 * DialogHeader — Molecule Component
 *
 * Standard header for all 27 banner screens. Displays the TrustID
 * logo (shield icon), a title, and a close button. The logo uses an
 * inline SVG path for Figma-compatible self-contained rendering.
 *
 * @see docs/PRD.md § 3.2 — DialogHeader specification
 * @see src/components/atoms/Icon/Icon.tsx — Icon atom (close button)
 */
import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './DialogHeader.module.css';

/* ── Props ── */

export interface DialogHeaderProps {
  /** Header title text */
  title: string;
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Whether to show the close button (default true) */
  showClose?: boolean;
}

/* ── TrustID Shield Logo ──
   Inline SVG path for the TrustID shield mark. Uses an inline path
   rather than an external file so the component is fully self-contained
   for Figma import. */
function TrustIdLogo() {
  return (
    <svg
      className={styles.logo}
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
  );
}

/* ── Component ── */

export function DialogHeader({
  title,
  onClose,
  showClose = true,
}: DialogHeaderProps) {
  return (
    <header className={styles.header}>
      <TrustIdLogo />
      <h1 className={styles.title}>{title}</h1>
      {showClose && (
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dialog"
          type="button"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </header>
  );
}

export default DialogHeader;
