/**
 * Divider — Atom Component
 *
 * Semantic `<hr>` element used to separate content sections.
 * Three spacing variants control the vertical margin.
 * Full width, 1px height, uses border-light token color.
 *
 * @see docs/PRD.md § 3.1 — Divider specification
 */
import React from 'react';
import styles from './Divider.module.css';

/* ── Props ── */

export interface DividerProps {
  /** Vertical spacing above and below the divider */
  spacing?: 'sm' | 'md' | 'lg';
  /** Optional CSS class for custom styling */
  className?: string;
}

/* ── Component ── */

export function Divider({
  spacing = 'md',
  className,
}: DividerProps) {
  return (
    <hr
      className={`${styles.divider} ${styles[spacing]} ${className || ''}`}
    />
  );
}

export default Divider;
