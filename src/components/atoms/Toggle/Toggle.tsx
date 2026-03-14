/**
 * Toggle — Atom Component
 *
 * ON/OFF switch with animated knob slide. Uses `role="switch"` for
 * WCAG-compliant toggle semantics. The track changes from neutral gray
 * (OFF) to success green (ON). Locked state prevents interaction
 * (e.g., CT minor advertising ban).
 *
 * Two sizes: md (36×20 track, 16px knob) and sm (28×16 track, 12px knob).
 * CSS transition for knob slide is active in Storybook but static in
 * Figma frames since Figma captures a single snapshot.
 *
 * @see docs/PRD.md § 3.1 — Toggle specification
 * @see docs/reference/ — Predecessor toggle styles
 */
import React, { useCallback } from 'react';
import styles from './Toggle.module.css';

/* ── Props ── */

export interface ToggleProps {
  /** Whether the toggle is in the ON position */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Accessible label for screen readers (required for a11y) */
  ariaLabel: string;
  /** Whether the toggle is locked (non-interactive, e.g., legal requirement) */
  locked?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Toggle size — md is standard, sm for compact layouts */
  size?: 'sm' | 'md';
}

/* ── Component ── */

export function Toggle({
  checked,
  onChange,
  ariaLabel,
  locked = false,
  disabled = false,
  size = 'md',
}: ToggleProps) {
  const isDisabled = disabled || locked;

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onChange(!checked);
    }
  }, [checked, onChange, isDisabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isDisabled) return;
      /* Space and Enter toggle the switch per WCAG */
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onChange(!checked);
      }
    },
    [checked, onChange, isDisabled],
  );

  const classNames = [
    styles.toggle,
    styles[size],
    checked ? styles.checked : '',
    locked ? styles.locked : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      /* WCAG: locked toggles are discoverable but not operable —
         tabIndex -1 prevents Tab focus while keeping AT visibility */
      tabIndex={locked && !disabled ? -1 : undefined}
      type="button"
    >
      <span className={styles.knob} />
    </button>
  );
}

export default Toggle;
