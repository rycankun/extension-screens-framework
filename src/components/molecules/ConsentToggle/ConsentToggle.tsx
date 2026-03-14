/**
 * ConsentToggle — Molecule Component
 *
 * Toggle row used in consent and cookie preference screens. Composes
 * the Toggle atom with a label, sublabel, and optional info icon.
 * Supports locked state (e.g., Essential cookies cannot be turned off).
 *
 * @see docs/PRD.md § 3.2 — ConsentToggle specification
 * @see src/components/atoms/Toggle/Toggle.tsx — Toggle atom dependency
 */
import React, { useCallback } from 'react';
import { Toggle } from '../../atoms/Toggle/Toggle';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './ConsentToggle.module.css';

/* ── Props ── */

export interface ConsentToggleProps {
  /** Primary label text (e.g., "Analytics", "Marketing") */
  label: string;
  /** Secondary description text below the label */
  sublabel?: string;
  /** Whether the toggle is in the ON position */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Whether the toggle is locked (e.g., Essential cookies) */
  locked?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Whether to show the info icon (shows tooltip on hover) */
  showInfo?: boolean;
  /** Tooltip text for the info icon */
  infoText?: string;
}

/* ── Component ── */

export function ConsentToggle({
  label,
  sublabel,
  checked,
  onChange,
  locked = false,
  disabled = false,
  showInfo = false,
  infoText,
}: ConsentToggleProps) {
  const isDisabled = disabled || locked;

  /* WCAG 1.3.1: clicking the label text activates the toggle.
     The row onClick fires onChange; the Toggle's own onClick calls
     e.stopPropagation() to prevent double-toggling. */
  const handleRowClick = useCallback(() => {
    if (!isDisabled) {
      onChange(!checked);
    }
  }, [checked, onChange, isDisabled]);

  /* Prevent info-icon clicks from bubbling up to the row and toggling */
  const handleInfoClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
    },
    [],
  );

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
      {showInfo && (
        <button
          className={styles.infoBtn}
          type="button"
          aria-label={`Information about ${label}`}
          title={infoText}
          onClick={handleInfoClick}
        >
          <Icon name="info" size="sm" />
        </button>
      )}
    </div>
  );
}

export default ConsentToggle;
