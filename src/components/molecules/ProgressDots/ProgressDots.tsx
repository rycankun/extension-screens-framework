/**
 * ProgressDots — Molecule Component
 *
 * Step indicator showing progress through a multi-screen flow.
 * Active dot uses brand color, completed dots use success color,
 * and future dots use a muted color.
 *
 * @see docs/PRD.md § 3.2 — ProgressDots specification
 */
import React from 'react';
import styles from './ProgressDots.module.css';

/* ── Props ── */

export interface ProgressDotsProps {
  /** Total number of steps */
  total: number;
  /** Current step (1-indexed) */
  current: number;
  /** Accessible label for the progress indicator */
  ariaLabel?: string;
}

/* ── Component ── */

export function ProgressDots({
  total,
  current,
  ariaLabel,
}: ProgressDotsProps) {
  return (
    <div
      className={styles.container}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={ariaLabel || `Step ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        let dotClass = styles.dot;
        if (step === current) dotClass += ` ${styles.active}`;
        else if (step < current) dotClass += ` ${styles.completed}`;

        return <span key={i} className={dotClass} />;
      })}
    </div>
  );
}

export default ProgressDots;
