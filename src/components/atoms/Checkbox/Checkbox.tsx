/**
 * Checkbox — Atom Component
 *
 * Checkbox with associated label text. Uses a hidden native `<input>`
 * for accessibility and form integration, with a custom-styled visual
 * indicator. When checked, shows a white checkmark on brand-blue bg.
 *
 * @see docs/PRD.md § 3.1 — Checkbox specification
 * @see docs/reference/ — Predecessor checkbox styles
 */
import React, { useId } from 'react';
import styles from './Checkbox.module.css';

/* ── Props ── */

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Callback when checked state changes */
  onChange: (checked: boolean) => void;
  /** Label text displayed next to the checkbox */
  label: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** HTML name attribute for form integration */
  name?: string;
}

/* ── Component ── */

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  name,
}: CheckboxProps) {
  const id = useId();

  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        name={name}
      />
      <span className={styles.control} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
