/**
 * Badge — Atom Component
 *
 * Status badge/pill with five color variants. Used for verification
 * status, credential expiry warnings, and category labels throughout
 * the extension screens. Rendered as uppercase text in a rounded pill.
 *
 * @see docs/PRD.md § 3.1 — Badge specification
 */
import React from 'react';
import styles from './Badge.module.css';

/* ── Props ── */

export interface BadgeProps {
  /** Badge text content */
  label: string;
  /** Color variant — determines background and text colors */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** Badge size — sm for compact layouts, md for standard */
  size?: 'sm' | 'md';
}

/* ── Component ── */

export function Badge({
  label,
  variant = 'neutral',
  size = 'md',
}: BadgeProps) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
  ].join(' ');

  return (
    <span className={classNames}>
      {label}
    </span>
  );
}

export default Badge;
