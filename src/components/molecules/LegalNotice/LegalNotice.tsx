/**
 * LegalNotice — Molecule Component
 *
 * Displays jurisdiction-specific legal or regulatory disclosure text
 * with a small info icon. Used at the bottom of consent screens to
 * show GDPR, CCPA, or state-specific privacy notices.
 *
 * @see docs/PRD.md § 3.2 — LegalNotice specification
 * @see src/constants/jurisdictions.ts — Legal text source
 * @see src/components/atoms/Icon/Icon.tsx — Icon atom dependency
 */
import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './LegalNotice.module.css';

/* ── Props ── */

export interface LegalNoticeProps {
  /** Legal/regulatory notice text to display */
  text: string;
  /** Icon to display (defaults to "info") */
  icon?: 'info' | 'shield' | 'warning';
}

/* ── Component ── */

export function LegalNotice({
  text,
  icon = 'info',
}: LegalNoticeProps) {
  return (
    <div className={styles.notice}>
      <span className={styles.iconWrap}>
        {/* Decorative icon — no ariaLabel so it renders as aria-hidden */}
        <Icon name={icon} size="sm" />
      </span>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default LegalNotice;
