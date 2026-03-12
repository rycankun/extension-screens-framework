/**
 * DnsConfirm — Do Not Sell Confirmation Screen
 *
 * Screen component (screens/preferences). Confirms the user's opt-out
 * of the sale or sharing of personal information (CCPA/CPRA compliance).
 * Simple layout: headline, body, confirm button, cancel link.
 *
 * @see docs/PRD.md § 4.3 — DnsConfirm specification
 * @see src/constants/preferences.ts — DNS_* constants
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  DNS_HEADLINE,
  DNS_BODY,
  DNS_CONFIRM_BTN,
  DNS_CANCEL_LABEL,
} from '../../../constants/preferences';
import styles from './DnsConfirm.module.css';

/* ── Props ── */

export interface DnsConfirmProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Confirm Opt-Out is clicked */
  onConfirm?: () => void;
  /** Callback when Cancel is clicked */
  onCancel?: () => void;
}

/* ── Component ── */

export function DnsConfirm({
  theme = 'light',
  onClose,
  onConfirm,
  onCancel,
}: DnsConfirmProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.DNS_CONFIRM]}
        screenId={SCREENS.DNS_CONFIRM}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.DNS_CONFIRM]}
          onClose={onClose}
        />

        {/* ── Headline + Body ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {DNS_HEADLINE}
          </h2>
          <p className={styles.body}>
            {DNS_BODY}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={DNS_CONFIRM_BTN}
            variant="primary"
            fullWidth
            onClick={onConfirm}
          />
        </div>

        {/* ── Cancel Link ── */}
        <div className={styles.cancelRow}>
          <button
            className={styles.cancelLink}
            onClick={onCancel}
            type="button"
          >
            {DNS_CANCEL_LABEL}
          </button>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
    </div>
  );
}

export default DnsConfirm;
