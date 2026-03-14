/**
 * OtpEntry — 6-Digit Verification Code Screen
 *
 * Screen component (screens/authentication). Matches the predecessor
 * otp-entry.html layout exactly:
 *   1. Custom header: BackArrow + host-site logo + close button
 *   2. Text block: bold headline + regular subtext + link-styled email
 *   3. StepIndicator (Step 2 of 3)
 *   4. OTP 6-digit input row
 *   5. Auto-submit micro text ("Code verifies automatically")
 *   6. Resend timer micro text (countdown or active resend link)
 *   7. "Wrong email?" ghost inline button
 *   8. Passkey fallback section
 *   9. PoweredBadge footer
 *
 * No Verify button — the predecessor uses auto-submit on code completion.
 * No Divider — the predecessor does not use one on this screen.
 *
 * @see docs/PRD.md § 4.2 — OtpEntry specification
 * @see src/components/molecules/OtpInput/OtpInput.tsx — OTP input molecule
 * @see src/constants/variants.ts — COPY_TEXT for screen text
 * @see src/constants/auth.ts — OTP_* constants for labels
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { StepIndicator } from '../../molecules/StepIndicator/StepIndicator';
import { OtpInput } from '../../molecules/OtpInput/OtpInput';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  OTP_SUBTEXT,
  OTP_RESEND_TIMER_PREFIX,
  OTP_RESEND_ACTIVE,
  OTP_WRONG_EMAIL,
  OTP_WRONG_EMAIL_ARIA,
  OTP_DEFAULT_VALUE,
  PASSKEY_FALLBACK_PREFIX,
  PASSKEY_FALLBACK_LINK,
  PASSKEY_FALLBACK_ARIA_LOGIN,
} from '../../../constants/auth';
import styles from './OtpEntry.module.css';

/* ── Props ── */

export interface OtpEntryProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Email address the verification code was sent to */
  email?: string;
  /** Pre-filled OTP value for Figma static display */
  otpValue?: string;
  /** Countdown seconds remaining for resend (0 = resend available) */
  resendCountdown?: number;
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Callback when the back arrow is clicked (returns to email capture) */
  onBack?: () => void;
  /** Callback when Resend is clicked (countdown expired) */
  onResend?: () => void;
  /** Callback when "Wrong email?" is clicked */
  onWrongEmail?: () => void;
  /** Callback when "Sign in with passkey" is clicked */
  onPasskeySignIn?: () => void;
}

/* ── Component ── */

export function OtpEntry({
  theme = 'light',
  email = 'user@example.com',
  otpValue = OTP_DEFAULT_VALUE,
  resendCountdown = 27,
  onClose,
  onBack,
  onResend,
  onWrongEmail,
  onPasskeySignIn,
}: OtpEntryProps) {
  const [otp, setOtp] = useState(otpValue);

  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.OTP_ENTRY]}
        screenId={SCREENS.OTP_ENTRY}
        theme={theme}
      >
        {/* ── Header with Back Arrow ──
            Delegates to DialogHeader molecule (single source of truth for
            header layout + close button). showBackArrow adds the BackArrow
            molecule before the logo, matching predecessor .logo-left layout. */}
        <DialogHeader showBackArrow onBack={onBack} onClose={onClose} />

        {/* ── Text Block ──
            Bold headline + regular subtext + link-styled email.
            Predecessor: bold "We've sent a verification code." then regular text
            with the email styled as a link (not clickable). */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{COPY_TEXT.otpHeadline}</span>{' '}
          <span className={styles.regular}>{OTP_SUBTEXT}</span>{' '}
          <span className={styles.emailLink}>{email}</span>
        </div>

        {/* ── Step Indicator ──
            Step 2 of 3: Email Capture (complete) → OTP Entry (active) → Passkey Setup (inactive). */}
        <StepIndicator currentStep={2} totalSteps={3} />

        {/* ── OTP Input ──
            Six single-digit input fields with auto-advance and paste support. */}
        <div className={styles.otpArea}>
          <OtpInput
            value={otp}
            onChange={setOtp}
          />
        </div>

        {/* ── Auto-Submit Indicator ──
            "Code verifies automatically" — tells user no Verify button is needed.
            aria-live="polite" for screen readers when status changes. */}
        <div className={styles.micro} aria-live="polite">
          {COPY_TEXT.otpAutoSubmit}
        </div>

        {/* ── Resend Timer ──
            Shows countdown ("Haven't received it? Resend in 27s") or active
            resend link when countdown reaches 0. */}
        <div className={styles.micro} aria-live="polite">
          {resendCountdown > 0 ? (
            <span className={styles.timerText}>
              {OTP_RESEND_TIMER_PREFIX} {resendCountdown}s
            </span>
          ) : (
            <button
              className={styles.ghostInline}
              type="button"
              onClick={onResend}
            >
              {OTP_RESEND_ACTIVE}
            </button>
          )}
        </div>

        {/* ── Wrong Email? ──
            Ghost inline link to go back and change email address. */}
        <div className={styles.micro}>
          <button
            className={styles.ghostInline}
            type="button"
            onClick={onWrongEmail}
            aria-label={OTP_WRONG_EMAIL_ARIA}
          >
            {OTP_WRONG_EMAIL}
          </button>
        </div>

        {/* ── Passkey Fallback ──
            "Already have a Trust ID? Sign in with passkey" — provides an
            alternative auth path for returning users. */}
        <div className={styles.passkeyFallback}>
          <span>{PASSKEY_FALLBACK_PREFIX}</span>{' '}
          <button
            type="button"
            className={styles.link}
            aria-label={PASSKEY_FALLBACK_ARIA_LOGIN}
            onClick={onPasskeySignIn}
          >
            {PASSKEY_FALLBACK_LINK}
          </button>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default OtpEntry;
