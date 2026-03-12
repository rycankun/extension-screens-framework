/**
 * EmailCapture — Email Entry Screen
 *
 * Screen component (screens/authentication). Collects the user's email
 * address to begin the TrustID verification flow. Includes a headline,
 * body copy, email input, trust line, send button, re-auth warning,
 * and a skip link.
 *
 * @see docs/PRD.md § 4.2 — EmailCapture specification
 * @see src/constants/variants.ts — COPY_TEXT for all screen text
 * @see src/constants/auth.ts — AUTH constants for shared labels
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { LegalNotice } from '../../molecules/LegalNotice/LegalNotice';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  EMAIL_PLACEHOLDER,
  EMAIL_SKIP_LABEL,
  REAUTH_ICON,
} from '../../../constants/auth';
import styles from './EmailCapture.module.css';

/* ── Props ── */

export interface EmailCaptureProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Pre-filled email address value */
  email?: string;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Send Verification Code is clicked */
  onSend?: () => void;
  /** Callback when Skip is clicked */
  onSkip?: () => void;
}

/* ── Component ── */

export function EmailCapture({
  theme = 'light',
  email = '',
  onClose,
  onSend,
  onSkip,
}: EmailCaptureProps) {
  const [emailValue, setEmailValue] = useState(email);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.EMAIL_CAPTURE]}
        screenId={SCREENS.EMAIL_CAPTURE}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.EMAIL_CAPTURE]}
          onClose={onClose}
        />

        {/* ── Headline + Body ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {COPY_TEXT.emailHeadline}
          </h2>
          <p className={styles.body}>
            {COPY_TEXT.emailBody}
          </p>
          <p className={styles.trustLine}>
            {COPY_TEXT.emailTrustLine}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Email Input ── */}
        <div className={styles.inputArea}>
          <Input
            type="email"
            placeholder={EMAIL_PLACEHOLDER}
            value={emailValue}
            onChange={setEmailValue}
            ariaLabel={EMAIL_PLACEHOLDER}
          />
        </div>

        {/* ── Re-auth Warning ── */}
        <LegalNotice
          text={COPY_TEXT.emailReauthWarning}
          icon={REAUTH_ICON}
        />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.emailSendBtn}
            variant="primary"
            fullWidth
            onClick={onSend}
          />
        </div>

        {/* ── Skip Link ── */}
        <div className={styles.skipRow}>
          <button
            className={styles.skipLink}
            onClick={onSkip}
            type="button"
          >
            {EMAIL_SKIP_LABEL}
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

export default EmailCapture;
