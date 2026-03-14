/**
 * EmailConfirm — Verify with a Code Instead Screen
 *
 * Screen component (screens/authentication). Fallback from passkey
 * verification where the user can request a 6-digit verification code
 * sent to their email. Includes a back arrow, logo + close header,
 * bold headline, body text, editable email input, a Send Code primary
 * button, and a "Back to passkey" ghost button.
 *
 * This is NOT a "verified" success screen. It is the code-fallback
 * entry point reached from the passkey verify screen.
 *
 * Predecessor ref: email-confirm.html
 *
 * @see docs/PRD.md § 4.2 — EmailConfirm specification
 * @see src/constants/auth.ts — AUTH constants for confirmation text
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  EMAIL_CONFIRM_HEADLINE,
  EMAIL_CONFIRM_BODY,
  EMAIL_CONFIRM_BTN,
  EMAIL_CONFIRM_BTN_ARIA,
  EMAIL_CONFIRM_BACK,
  EMAIL_CONFIRM_BACK_ARIA,
  EMAIL_PLACEHOLDER,
} from '../../../constants/auth';
import styles from './EmailConfirm.module.css';

/* ── Props ── */

export interface EmailConfirmProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Pre-filled email address (editable by the user) */
  email?: string;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when the back arrow is clicked */
  onBack?: () => void;
  /** Callback when Send Code is clicked */
  onSendCode?: () => void;
  /** Callback when Back to passkey is clicked */
  onBackToPasskey?: () => void;
}

/* ── Component ── */

export function EmailConfirm({
  theme = 'light',
  email = 'alex@email.com',
  onClose,
  onBack,
  onSendCode,
  onBackToPasskey,
}: EmailConfirmProps) {
  const [emailValue, setEmailValue] = useState(email);

  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.EMAIL_CONFIRM]}
        screenId={SCREENS.EMAIL_CONFIRM}
        theme={theme}
      >
        {/* ── Header with Back Arrow ──
            Delegates to DialogHeader molecule (single source of truth for
            header layout + close button). showBackArrow adds the BackArrow
            molecule before the logo, matching predecessor .logo-left layout. */}
        <DialogHeader showBackArrow onBack={onBack} onClose={onClose} />

        {/* ── Text Block ──
            Bold headline + regular body as inline spans, matching
            predecessor's inline-span pattern (NOT block h2/p). */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{EMAIL_CONFIRM_HEADLINE}</span>{' '}
          <span className={styles.regular}>{EMAIL_CONFIRM_BODY}</span>
        </div>

        {/* ── Email Input ──
            Editable email field pre-filled with user's account email. */}
        <div className={styles.inputArea}>
          <label className={styles.srOnly} htmlFor="email-confirm-input">
            {EMAIL_PLACEHOLDER}
          </label>
          <Input
            type="email"
            placeholder={EMAIL_PLACEHOLDER}
            value={emailValue}
            onChange={setEmailValue}
            ariaLabel={EMAIL_PLACEHOLDER}
            name="email-confirm-input"
          />
        </div>

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          {/* Primary: Send Code */}
          <Button
            label={EMAIL_CONFIRM_BTN}
            variant="primary"
            fullWidth
            onClick={onSendCode}
            ariaLabel={EMAIL_CONFIRM_BTN_ARIA}
          />

          {/* Ghost: Back to passkey */}
          <Button
            label={EMAIL_CONFIRM_BACK}
            variant="ghost"
            fullWidth
            onClick={onBackToPasskey}
            ariaLabel={EMAIL_CONFIRM_BACK_ARIA}
          />
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default EmailConfirm;
