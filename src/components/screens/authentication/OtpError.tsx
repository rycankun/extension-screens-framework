/**
 * OtpError — Verification Code Error Screen
 *
 * Screen component (screens/authentication). Displayed when the OTP
 * code entered is incorrect. Nearly identical layout to OtpEntry but
 * with error headline, error alert text below the OTP inputs, and
 * active resend link (no countdown). Includes BackArrow for navigation,
 * StepIndicator (step 2 of 3), and passkey fallback link.
 *
 * Predecessor ref: otp-error.html — same header/body/OTP/footer pattern
 * as otp-entry.html but with error-specific text and styling.
 *
 * @see docs/PRD.md § 4.2 — OtpError specification
 * @see docs/reference/SCREEN-AUDIT.md — OtpError interactive states
 * @see src/constants/auth.ts — OTP_ERROR_* constants for error text
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { BackArrow } from '../../molecules/BackArrow/BackArrow';
import { StepIndicator } from '../../molecules/StepIndicator/StepIndicator';
import { OtpInput } from '../../molecules/OtpInput/OtpInput';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Icon } from '../../atoms/Icon/Icon';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  OTP_ERROR_HEADLINE,
  OTP_ERROR_BODY,
  OTP_ERROR_ALERT,
  OTP_ERROR_ATTEMPTS_SUFFIX,
  OTP_ERROR_DEFAULT_ATTEMPTS,
  OTP_ERROR_HINT,
  OTP_ERROR_RESEND,
  OTP_ERROR_RESEND_ARIA,
  OTP_DEFAULT_VALUE,
  OTP_WRONG_EMAIL,
  OTP_WRONG_EMAIL_ARIA,
  PASSKEY_FALLBACK_PREFIX,
  PASSKEY_FALLBACK_LINK,
  PASSKEY_FALLBACK_ARIA_LOGIN,
} from '../../../constants/auth';
import styles from './OtpError.module.css';

/* ── Props ── */

export interface OtpErrorProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Email address the code was sent to */
  email?: string;
  /** Number of OTP attempts remaining */
  attemptsLeft?: number;
  /** Pre-filled OTP value for stories (empty = retry state) */
  otpValue?: string;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when the back arrow is clicked */
  onBack?: () => void;
  /** Callback when Resend Code is clicked */
  onResend?: () => void;
  /** Callback when "Wrong email?" is clicked */
  onWrongEmail?: () => void;
  /** Callback when "Sign in with passkey" is clicked */
  onPasskeySignIn?: () => void;
}

/* ── Component ── */

export function OtpError({
  theme = 'light',
  email = 'alex@email.com',
  attemptsLeft = OTP_ERROR_DEFAULT_ATTEMPTS,
  otpValue = OTP_DEFAULT_VALUE,
  onClose,
  onBack,
  onResend,
  onWrongEmail,
  onPasskeySignIn,
}: OtpErrorProps) {
  const [otp, setOtp] = useState(otpValue);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.OTP_ERROR]}
        screenId={SCREENS.OTP_ERROR}
      >
        {/* ── Custom Header: BackArrow + Logo (left) | Close (right) ──
            Two-section layout matching predecessor .logo > .logo-left + .close-btn.
            Same pattern as OtpEntry. */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <BackArrow onClick={onBack} />
            <img
              className={styles.logoImg}
              src="/assets/StreamVault-BrandLockup-Primary.svg"
              alt="StreamVault"
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

        {/* ── Text Block: Headline + Body + Email ──
            Predecessor uses inline <span> elements in .text-block,
            not <p>/<strong>. The .bold and .regular classes inherit
            font-family (Inter), font-size (14px), line-height (21px)
            from the .textBlock parent. */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{OTP_ERROR_HEADLINE}</span>{' '}
          <span className={styles.regular}>{OTP_ERROR_BODY}</span>{' '}
          <span className={styles.emailLink}>{email}</span>
        </div>

        {/* ── Step Indicator ──
            Step 2 of 3 (email capture → OTP → passkey). */}
        <StepIndicator currentStep={2} totalSteps={3} />

        {/* ── OTP Input Row ──
            Empty inputs for retry. Error state applied to cells. */}
        <div className={styles.otpArea}>
          {/* Screen-reader hint for the OTP input group */}
          <span className={styles.srOnly}>{OTP_ERROR_HINT}</span>
          <OtpInput
            value={otp}
            onChange={setOtp}
            error
          />
        </div>

        {/* ── Error Alert ──
            Live region announcing the error and remaining attempts.
            Predecessor pattern: role="alert" aria-live="assertive". */}
        <p
          className={styles.errorText}
          role="alert"
          aria-live="assertive"
        >
          {OTP_ERROR_ALERT} {attemptsLeft} {OTP_ERROR_ATTEMPTS_SUFFIX}
        </p>

        {/* ── Resend Link ──
            Active (no countdown) — centered ghost button style. */}
        <div className={styles.resendRow}>
          <button
            className={styles.resendLink}
            onClick={onResend}
            type="button"
            aria-label={OTP_ERROR_RESEND_ARIA}
          >
            {OTP_ERROR_RESEND}
          </button>
        </div>

        {/* ── Wrong Email? ──
            Micro ghost link to go back and change the email address. */}
        <div className={styles.wrongEmailRow}>
          <button
            className={styles.ghostInline}
            onClick={onWrongEmail}
            type="button"
            aria-label={OTP_WRONG_EMAIL_ARIA}
          >
            {OTP_WRONG_EMAIL}
          </button>
        </div>

        {/* ── Passkey Fallback ──
            "Already have a Trust ID? Sign in with passkey" */}
        <div className={styles.passkeyFallback}>
          <span className={styles.passkeyPrefix}>{PASSKEY_FALLBACK_PREFIX}</span>{' '}
          <button
            className={styles.passkeyLink}
            onClick={onPasskeySignIn}
            type="button"
            aria-label={PASSKEY_FALLBACK_ARIA_LOGIN}
          >
            {PASSKEY_FALLBACK_LINK}
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

export default OtpError;
