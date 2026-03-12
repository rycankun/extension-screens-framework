/**
 * PasskeyVerify — Passkey Authentication Screen
 *
 * Screen component (screens/authentication). Prompts the user to
 * authenticate with their existing passkey (fingerprint, face, or
 * device PIN). Shows a fingerprint icon, headline, body copy,
 * a Verify button, and a "Use Password Instead" fallback link.
 *
 * @see docs/PRD.md § 4.2 — PasskeyVerify specification
 * @see src/constants/variants.ts — COPY_TEXT for passkey verify text
 * @see src/constants/auth.ts — AUTH constants for labels
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  PASSKEY_VERIFY_BTN,
  PASSKEY_USE_PASSWORD,
} from '../../../constants/auth';
import styles from './PasskeyVerify.module.css';

/* ── Props ── */

export interface PasskeyVerifyProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Verify with Passkey is clicked */
  onVerify?: () => void;
  /** Callback when Use Password Instead is clicked */
  onUsePassword?: () => void;
}

/* ── Component ── */

export function PasskeyVerify({
  theme = 'light',
  onClose,
  onVerify,
  onUsePassword,
}: PasskeyVerifyProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.PASSKEY_VERIFY]}
        screenId={SCREENS.PASSKEY_VERIFY}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.PASSKEY_VERIFY]}
          onClose={onClose}
        />

        {/* ── Fingerprint Icon + Content ── */}
        <div className={styles.content}>
          <div className={styles.iconWrap}>
            <Icon name="fingerprint" size="xl" color="var(--tid-brand)" ariaLabel="Fingerprint" />
          </div>
          <h2 className={styles.headline}>
            {COPY_TEXT.passkeyVerifyHeadline}
          </h2>
          <p className={styles.body}>
            {COPY_TEXT.passkeyVerifyBody}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={PASSKEY_VERIFY_BTN}
            variant="primary"
            fullWidth
            onClick={onVerify}
          />
        </div>

        {/* ── Use Password Link ── */}
        <div className={styles.fallbackRow}>
          <button
            className={styles.fallbackLink}
            onClick={onUsePassword}
            type="button"
          >
            {PASSKEY_USE_PASSWORD}
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

export default PasskeyVerify;
