/**
 * OverlayShell — Organism Component
 *
 * Full-viewport overlay shell for age gate, QR verification, and SLC
 * verification screens. Renders a dark gradient backdrop (scrim) with
 * a centered content card.
 *
 * Live demo uses animated gradients + backdrop-filter frost; Figma
 * export uses a solid gradient background + opaque surface card for
 * clean frame import.
 *
 * @see docs/PRD.md § 3.3 — OverlayShell specification
 * @see DIRECTIVES.md § 1.5 — Figma-compatible CSS rules
 * @see src/constants/screens.ts — SCREEN_TITLES for aria-label values
 */
import React from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './OverlayShell.module.css';

/* ── Props ── */

export interface OverlayShellProps {
  /** Overlay content rendered inside the centered card */
  children: React.ReactNode;
  /** Accessible label for the overlay dialog */
  ariaLabel: string;
  /** Optional data-screen attribute for tracking/testing */
  screenId?: string;
}

/* ── Component ── */

export function OverlayShell({
  children,
  ariaLabel,
  screenId,
}: OverlayShellProps) {
  /* WCAG 2.4.3: Trap focus within the overlay dialog */
  const trapRef = useFocusTrap<HTMLDivElement>();

  return (
    <div
      ref={trapRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      data-screen={screenId}
    >
      {/* ── Content Card ──
          Centered card with solid surface background for Figma.
          In the live demo, this could have frost/blur effects. */}
      <div className={styles.card}>
        {children}
      </div>
    </div>
  );
}

export default OverlayShell;
