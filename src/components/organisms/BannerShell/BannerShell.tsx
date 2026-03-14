/**
 * BannerShell — Organism Component
 *
 * The 380px-wide extension drawer container used by all 27 banner screens.
 * Renders a gradient background layer with three decorative blobs (static
 * for Figma import) and a frosted glass content surface.
 *
 * The frosted glass effect (backdrop-filter: blur() + semi-transparent bg)
 * is a critical design element present in both Storybook AND Figma exports.
 * Content fills edge-to-edge with no margin gap (no visible gradient border
 * frame around content).
 *
 * @see docs/PRD.md § 3.3 — BannerShell specification
 * @see DIRECTIVES.md § 1.5 — Figma-compatible CSS rules
 * @see src/constants/screens.ts — SCREEN_TITLES for aria-label values
 */
import React from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './BannerShell.module.css';

/* ── Props ── */

export interface BannerShellProps {
  /** Screen content rendered inside the banner */
  children: React.ReactNode;
  /** Accessible label for the dialog (should come from SCREEN_TITLES) */
  ariaLabel: string;
  /** Callback when the banner close button is clicked */
  onClose?: () => void;
  /** Optional data-screen attribute for tracking/testing */
  screenId?: string;
}

/* ── Component ── */

export function BannerShell({
  children,
  ariaLabel,
  onClose,
  screenId,
}: BannerShellProps) {
  /* WCAG 2.4.3: Trap focus within the dialog */
  const trapRef = useFocusTrap<HTMLDivElement>();

  return (
    <div
      ref={trapRef}
      className={styles.banner}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      data-screen={screenId}
    >
      {/* ── Gradient Background Layer ──
          Static diagonal gradient with three decorative radial blobs.
          Blobs are positioned absolutely within the gradient layer. */}
      <div className={styles.gradient} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      {/* ── Frosted Glass Content Surface ──
          Semi-transparent surface with backdrop blur over the gradient.
          This frost effect is critical — present in both Storybook and Figma. */}
      <div className={styles.surface}>
        {children}
      </div>
    </div>
  );
}

export default BannerShell;
