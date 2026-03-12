/**
 * CheckboxRow — Molecule Component
 *
 * Checkbox + label molecule for consent/share toggles. Uses a native
 * <input type="checkbox"> styled as a branded checkbox (20px square,
 * brand blue when checked with white checkmark pseudo-element).
 *
 * Predecessor ref: .checkbox-row, .checkbox, .checkbox-text
 * in components.css:1220-1271
 *
 * @see docs/PRD.md § 3.2 — CheckboxRow specification
 */
import React from 'react';
import styles from './CheckboxRow.module.css';

/* ── Props ── */

export interface CheckboxRowProps {
  /** Unique ID for the checkbox (required for label association) */
  id: string;
  /** Label text displayed next to the checkbox */
  label: string;
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Callback when the checkbox state changes */
  onChange: (checked: boolean) => void;
  /** Accessible label for the checkbox */
  ariaLabel?: string;
}

/* ── Component ── */

export function CheckboxRow({
  id,
  label,
  checked,
  onChange,
  ariaLabel,
}: CheckboxRowProps) {
  return (
    <div className={styles.checkboxRow}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel || label}
      />
      <label htmlFor={id} className={styles.checkboxText}>
        {label}
      </label>
    </div>
  );
}

export default CheckboxRow;
