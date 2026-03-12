/**
 * PasskeySetup — Biometric Passkey Creation Screen
 *
 * Screen component (screens/authentication). Prompts the user to set
 * up a biometric passkey (fingerprint, face, or device PIN) for faster
 * future authentication. Includes a fingerprint icon, headline, body
 * + detail copy, a Set Up button, and a Skip link.
 *
 * @see docs/PRD.md § 4.2 — PasskeySetup specification
 * @see src/constants/variants.ts — COPY_TEXT for passkey text
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
import { PASSKEY_SKIP_LABEL } from '../../../constants/auth';
import styles from './PasskeySetup.module.css';

/* ── Props ── */

export interface PasskeySetupProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Set Up Passkey is clicked */
  onSetup?: () => void;
  /** Callback when Skip is clicked */
  onSkip?: () => void;
}

/* ── Component ── */

export function PasskeySetup({
  theme = 'light',
  onClose,
  onSetup,
  onSkip,
}: PasskeySetupProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.PASSKEY_SETUP]}
        screenId={SCREENS.PASSKEY_SETUP}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.PASSKEY_SETUP]}
          onClose={onClose}
        />

        {/* ── Fingerprint Icon + Content ── */}
        <div className={styles.content}>
          <div className={styles.iconWrap}>
            <Icon name="fingerprint" size="xl" color="var(--tid-brand)" ariaLabel="Fingerprint" />
          </div>
          <h2 className={styles.headline}>
            {COPY_TEXT.passkeyHeadline}
          </h2>
          <p className={styles.body}>
            {COPY_TEXT.passkeyBody}
          </p>
          <p className={styles.detail}>
            {COPY_TEXT.passkeyDetail}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.passkeyBtn}
            variant="primary"
            fullWidth
            onClick={onSetup}
          />
        </div>

        {/* ── Skip Link ── */}
        <div className={styles.skipRow}>
          <button
            className={styles.skipLink}
            onClick={onSkip}
            type="button"
          >
            {PASSKEY_SKIP_LABEL}
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

export default PasskeySetup;
