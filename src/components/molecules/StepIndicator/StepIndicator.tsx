/**
 * StepIndicator — Molecule Component
 *
 * Progress bar for multi-step flows (email capture → OTP → passkey).
 * Renders horizontal pill-shaped dots (active/completed/inactive states)
 * plus a "Step N of M" label. Dots are 16px × 2px pills.
 *
 * Predecessor ref: .step-indicator, .step-indicator-bar, .step-dot,
 * .step-indicator-label in components.css:447-474
 *
 * @see docs/PRD.md § 3.2 — StepIndicator specification
 */
import React from 'react';
import styles from './StepIndicator.module.css';

/* ── Props ── */

export interface StepIndicatorProps {
  /** Current step number (1-indexed) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
}

/* ── Component ── */

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const label = `Step ${currentStep} of ${totalSteps}`;

  return (
    <div
      className={styles.stepIndicator}
      aria-label={label}
      role="group"
    >
      {/* ── Progress Dots ──
          Pill-shaped bars. Active/completed dots use brand color,
          inactive dots use toggle-off (neutral gray). */}
      <div className={styles.stepIndicatorBar}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <span
              key={stepNum}
              className={`${styles.stepDot} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              aria-current={isActive ? 'step' : undefined}
            />
          );
        })}
      </div>

      {/* ── Label ── */}
      <span className={styles.stepIndicatorLabel}>{label}</span>
    </div>
  );
}

export default StepIndicator;
