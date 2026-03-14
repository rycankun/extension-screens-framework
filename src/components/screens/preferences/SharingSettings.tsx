/**
 * SharingSettings — Credential Sharing Details Screen
 *
 * Screen component (screens/preferences). Displays a read-only definition
 * list of the user's active credential sharing details for the current site:
 * credential type, status, expiry date, and data scope. Includes a "Revoke
 * Sharing" secondary button and micro text warning.
 *
 * Predecessor ref: sharing-settings.html (101 lines) — definition list layout.
 * This is NOT a toggle screen; it shows credential metadata in a <dl>.
 *
 * @see docs/PRD.md section 4.3 — SharingSettings specification
 * @see src/constants/preferences.ts — SHARING_* constants
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  SHARING_HEADLINE_BOLD,
  SHARING_HEADLINE_REGULAR,
  SHARING_CREDENTIAL_LABEL,
  SHARING_CREDENTIAL_VALUE,
  SHARING_STATUS_LABEL,
  SHARING_STATUS_ACTIVE,
  SHARING_UNTIL_LABEL,
  SHARING_UNTIL_VALUE,
  SHARING_DATA_LABEL,
  SHARING_DATA_VALUE,
  SHARING_REVOKE_BTN,
  SHARING_REVOKE_WARNING,
} from '../../../constants/preferences';
import styles from './SharingSettings.module.css';

/* ── Props ── */

export interface SharingSettingsProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog close button is clicked */
  onClose?: () => void;
  /** Callback when the Revoke Sharing button is clicked */
  onRevoke?: () => void;
}

/* ── Component ── */

export function SharingSettings({
  theme = 'light',
  onClose,
  onRevoke,
}: SharingSettingsProps) {
  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.SHARING_SETTINGS]}
        screenId={SCREENS.SHARING_SETTINGS}
        theme={theme}
      >
        {/* ── Header — Logo + Close (no back arrow) ── */}
        <DialogHeader onClose={onClose} />

        {/* ── Text Block — Inline spans, not h2/p ── */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{SHARING_HEADLINE_BOLD}</span>{' '}
          <span className={styles.regular}>{SHARING_HEADLINE_REGULAR}</span>
        </div>

        {/* ── Definition List — Credential details ── */}
        <dl className={styles.dlStack} aria-label="Credential sharing details">
          <div className={styles.credRow}>
            <dt className={styles.credLabel}>{SHARING_CREDENTIAL_LABEL}</dt>
            <dd className={styles.credValue}>{SHARING_CREDENTIAL_VALUE}</dd>
          </div>
          <div className={styles.credRow}>
            <dt className={styles.credLabel}>{SHARING_STATUS_LABEL}</dt>
            <dd className={`${styles.credValue} ${styles.statusActive}`}>
              {SHARING_STATUS_ACTIVE}
            </dd>
          </div>
          <div className={styles.credRow}>
            <dt className={styles.credLabel}>{SHARING_UNTIL_LABEL}</dt>
            <dd className={styles.credValue}>{SHARING_UNTIL_VALUE}</dd>
          </div>
          <div className={styles.credRow}>
            <dt className={styles.credLabel}>{SHARING_DATA_LABEL}</dt>
            <dd className={styles.credValue}>{SHARING_DATA_VALUE}</dd>
          </div>
        </dl>

        {/* ── Revoke Button ──
            Predecessor uses .btn-secondary.btn-revoke (red text + red border).
            className override applies error color to the secondary variant. */}
        <Button
          label={SHARING_REVOKE_BTN}
          variant="secondary"
          fullWidth
          onClick={onRevoke}
          ariaLabel="Revoke credential sharing with this site"
          className={styles.revokeBtn}
        />

        {/* ── Revoke Warning Micro Text ── */}
        <div className={styles.micro}>{SHARING_REVOKE_WARNING}</div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default SharingSettings;
