/**
 * BannerShell — Organism Component
 *
 * The 380px-wide extension drawer container used by all 27 banner screens.
 * Renders a gradient background layer with three decorative blobs (static
 * for Figma import) and a solid surface content area.
 *
 * Live demo uses animated blobs + backdrop-filter frost; Figma export
 * uses static blobs + solid opaque surface for clean frame import.
 *
 * @see docs/PRD.md § 3.3 — BannerShell specification
 * @see DIRECTIVES.md § 1.5 — Figma-compatible CSS rules
 * @see src/constants/screens.ts — SCREEN_TITLES for aria-label values
 */
import React from 'react';
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
  return (
    <div
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

      {/* ── Content Surface ──
          Solid surface layer for Figma compatibility (no backdrop-filter).
          In the live demo, this would have frost/blur effects. */}
      <div className={styles.surface}>
        {children}
      </div>
    </div>
  );
}

export default BannerShell;
