/**
 * PasskeySetup — Biometric Passkey Creation Screen
 *
 * Screen component (screens/authentication). Prompts the user to set
 * up a biometric passkey (fingerprint, face, or device PIN) for faster
 * future authentication. Left-aligned layout with headline, body,
 * detail micro text, primary Set Up button, ghost Skip button, and
 * PoweredBadge footer.
 *
 * Predecessor match: passkey-setup.html — NO icon, NO divider, NO
 * centered layout. Text is left-aligned throughout.
 *
 * @see docs/PRD.md § 4.2 — PasskeySetup specification
 * @see src/constants/variants.ts — COPY_TEXT for passkey text
 * @see src/constants/auth.ts — AUTH constants for labels/ARIA
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  PASSKEY_SKIP_LABEL,
  PASSKEY_SKIP_ARIA,
  PASSKEY_SETUP_ARIA,
} from '../../../constants/auth';
import styles from './PasskeySetup.module.css';

/* ── Props ── */

export interface PasskeySetupProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Set Up Passkey is clicked */
  onSetup?: () => void;
  /** Callback when Skip for Now is clicked */
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
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.PASSKEY_SETUP]}
        screenId={SCREENS.PASSKEY_SETUP}
        theme={theme}
      >
        {/* ── Header: logo + close (no back arrow, no icon) ── */}
        <DialogHeader onClose={onClose} />

        {/* ── Text Block: bold headline + regular body as inline spans ──
            Matches predecessor's inline-span pattern (NOT block p elements). */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{COPY_TEXT.passkeyHeadline}</span>{' '}
          <span className={styles.regular}>{COPY_TEXT.passkeyBody}</span>
        </div>

        {/* ── Detail Micro Text ──
            Predecessor class: .micro .color-body .text-left .micro-relaxed
            12px, text-body color, left-aligned, relaxed line-height */}
        <p className={styles.detail}>{COPY_TEXT.passkeyDetail}</p>

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.passkeyBtn}
            variant="primary"
            fullWidth
            onClick={onSetup}
            ariaLabel={PASSKEY_SETUP_ARIA}
          />
          <Button
            label={PASSKEY_SKIP_LABEL}
            variant="ghost"
            fullWidth
            onClick={onSkip}
            ariaLabel={PASSKEY_SKIP_ARIA}
          />
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default PasskeySetup;
