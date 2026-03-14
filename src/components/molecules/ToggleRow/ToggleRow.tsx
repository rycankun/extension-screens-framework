/**
 * ToggleRow — Molecule Component
 *
 * Simplified toggle row without info icon. Composes the Toggle atom
 * with a label and sublabel. Used in sharing settings and data share
 * screens where contextual info icons are not needed.
 *
 * @see docs/PRD.md § 3.2 — ToggleRow specification
 * @see src/components/molecules/ConsentToggle/ — Full variant with info icon
 * @see src/components/atoms/Toggle/Toggle.tsx — Toggle atom dependency
 */
import React, { useCallback } from 'react';
import { Toggle } from '../../atoms/Toggle/Toggle';
import styles from './ToggleRow.module.css';

/* ── Props ── */

export interface ToggleRowProps {
  /** Primary label text */
  label: string;
  /** Secondary description text below the label */
  sublabel?: string;
  /** Whether the toggle is in the ON position */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Whether the toggle is locked */
  locked?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
}

/* ── Component ── */

export function ToggleRow({
  label,
  sublabel,
  checked,
  onChange,
  locked = false,
  disabled = false,
}: ToggleRowProps) {
  const isDisabled = disabled || locked;

  /* WCAG 1.3.1: clicking the label text activates the toggle.
     The row onClick fires onChange; the Toggle's own onClick calls
     e.stopPropagation() to prevent double-toggling. */
  const handleRowClick = useCallback(() => {
    if (!isDisabled) {
      onChange(!checked);
    }
  }, [checked, onChange, isDisabled]);

  return (
    <div className={styles.row} onClick={handleRowClick}>
      <Toggle
        checked={checked}
        onChange={onChange}
        ariaLabel={label}
        locked={locked}
        disabled={disabled}
      />
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
    </div>
  );
}

export default ToggleRow;
