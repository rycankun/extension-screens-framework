/**
 * Button — Atom Component
 *
 * Standard action button with four visual variants and three sizes.
 * Primary uses dark bg with light text (ink-on-page-bg pattern).
 * Secondary is transparent with a subtle border. Ghost is text-only.
 * Danger uses the error color for destructive actions.
 *
 * @see docs/PRD.md § 3.1 — Atom component specifications
 * @see docs/reference/ — Predecessor button styles
 */
import React from 'react';
import styles from './Button.module.css';

/* ── Props ── */

export interface ButtonProps {
  /** Button display text */
  label: string;
  /** Visual variant — determines colors, borders, and hover behavior */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size — controls height, padding, and font size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled (non-interactive, reduced opacity) */
  disabled?: boolean;
  /** Whether the button stretches to fill its container width */
  fullWidth?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** HTML type attribute for form integration */
  type?: 'button' | 'submit' | 'reset';
  /** Accessible label override (defaults to label text) */
  ariaLabel?: string;
}

/* ── Component ── */

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </button>
  );
}

export default Button;
