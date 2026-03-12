/**
 * Radio — Atom Component
 *
 * Radio button with associated label text. Uses a hidden native `<input>`
 * for accessibility and form integration, with a custom-styled visual
 * indicator. When selected, shows a white dot on brand-blue bg.
 *
 * Radio buttons with the same `name` prop form a group — selecting one
 * deselects the others (native browser behavior).
 *
 * @see docs/PRD.md § 3.1 — Radio specification
 * @see docs/reference/ — Predecessor radio styles
 */
import React, { useId } from 'react';
import styles from './Radio.module.css';

/* ── Props ── */

export interface RadioProps {
  /** Whether the radio button is selected */
  checked: boolean;
  /** Callback when selection changes */
  onChange: (checked: boolean) => void;
  /** Label text displayed next to the radio button */
  label: string;
  /** HTML name attribute — groups related radios together */
  name: string;
  /** HTML value attribute for form submission */
  value: string;
  /** Whether the radio button is disabled */
  disabled?: boolean;
}

/* ── Component ── */

export function Radio({
  checked,
  onChange,
  label,
  name,
  value,
  disabled = false,
}: RadioProps) {
  const id = useId();

  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}
      htmlFor={id}
    >
      <input
        id={id}
        type="radio"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        name={name}
        value={value}
      />
      <span className={styles.control} aria-hidden="true">
        <span className={styles.dot} />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Radio;
