/**
 * Input — Atom Component
 *
 * Text input field supporting text, email, password, and number types.
 * Features error state with red border/shadow, focus ring, and
 * placeholder styling. All visual values come from --tid-* tokens.
 *
 * @see docs/PRD.md § 3.1 — Atom component specifications
 * @see docs/reference/ — Predecessor input field styles
 */
import React, { useId } from 'react';
import styles from './Input.module.css';

/* ── Props ── */

export interface InputProps {
  /** Current input value */
  value?: string;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Input type — controls keyboard and validation behavior */
  type?: 'text' | 'email' | 'password' | 'number';
  /** Error message — triggers error styling when set */
  error?: string;
  /** Whether the input is disabled (non-interactive) */
  disabled?: boolean;
  /** Change handler — receives the new value string */
  onChange?: (value: string) => void;
  /** Accessible label for the input */
  ariaLabel?: string;
  /** HTML name attribute for form integration */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
}

/* ── Component ── */

export function Input({
  value,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  onChange,
  ariaLabel,
  name,
  required = false,
}: InputProps) {
  const errorId = useId();

  const classNames = [
    styles.input,
    error ? styles.error : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <input
        className={classNames}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label={ariaLabel}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        name={name}
        required={required}
      />
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
