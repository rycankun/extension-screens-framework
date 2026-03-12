/**
 * ToastContainer — Organism Component
 *
 * Small floating notification container for toast messages (welcome back,
 * preferences saved, manage tooltip). Positioned bottom-left in the
 * live extension; rendered static for Figma import.
 *
 * Uses role="status" + aria-live="polite" so screen readers announce
 * toast content without interrupting the current task.
 *
 * @see docs/PRD.md § 3.3 — ToastContainer specification
 * @see DIRECTIVES.md § 1.5 — Figma-compatible CSS rules
 * @see src/constants/screens.ts — SCREEN_TITLES for aria-label values
 */
import React from 'react';
import styles from './ToastContainer.module.css';

/* ── Props ── */

export interface ToastContainerProps {
  /** Toast content rendered inside the container */
  children: React.ReactNode;
  /** Accessible label for the toast notification */
  ariaLabel: string;
  /** Optional data-screen attribute for tracking/testing */
  screenId?: string;
}

/* ── Component ── */

export function ToastContainer({
  children,
  ariaLabel,
  screenId,
}: ToastContainerProps) {
  return (
    <div
      className={styles.toast}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
      data-screen={screenId}
    >
      {children}
    </div>
  );
}

export default ToastContainer;
