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
import { BackArrow } from '../../molecules/BackArrow/BackArrow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Icon } from '../../atoms/Icon/Icon';
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

/* ── Default Values ──
   StreamVault is the fictional demo host site. Default logo path points
   to the provided brand lockup SVG in public/assets/. */
const DEFAULT_LOGO_SRC = '/assets/StreamVault-BrandLockup-Primary.svg';
const DEFAULT_LOGO_ALT = 'StreamVault';

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
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.EMAIL_CONFIRM]}
        screenId={SCREENS.EMAIL_CONFIRM}
      >
        {/* ── Custom Header: BackArrow | Logo | Close ──
            Same three-column header pattern as predecessor email-confirm.html.
            BackArrow left, logo center, close button right. */}
        <header className={styles.header}>
          <BackArrow onClick={onBack} />
          <div className={styles.logoCenter}>
            <img
              className={styles.logoImg}
              src={DEFAULT_LOGO_SRC}
              alt={DEFAULT_LOGO_ALT}
            />
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
          >
            <Icon name="close" size="sm" />
          </button>
        </header>

        {/* ── Text Block ──
            Bold headline + regular body text, left-aligned. */}
        <div className={styles.textBlock}>
          <h2 className={styles.bold}>
            {EMAIL_CONFIRM_HEADLINE}
          </h2>
          <p className={styles.regular}>
            {EMAIL_CONFIRM_BODY}
          </p>
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
    </div>
  );
}

export default EmailConfirm;
