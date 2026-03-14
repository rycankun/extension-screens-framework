/**
 * EmailCapture — Email Entry Screen
 *
 * Screen component (screens/authentication). Collects the user's email
 * address to begin the TrustID verification flow. Matches the predecessor
 * email-capture.html layout exactly:
 *
 *   1. DialogHeader (logo + close, NO back arrow)
 *   2. Text block (bold headline + regular body as inline spans)
 *   3. Trust line (brand blue, medium weight)
 *   4. StepIndicator (Step 1 of 3)
 *   5. Email input (sr-only label, placeholder)
 *   6. Trust signal micro text with star icon
 *   7. CheckboxRow for email sharing consent (checked by default)
 *   8. Primary button "Send Verification Code"
 *   9. Divider + passkey fallback link
 *  10. Dismiss group (ghost link + re-auth micro text)
 *  11. PoweredBadge footer
 *
 * @see docs/PRD.md § 4.2 — EmailCapture specification
 * @see src/constants/variants.ts — COPY_TEXT for all screen text
 * @see src/constants/auth.ts — AUTH constants for shared labels
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { StepIndicator } from '../../molecules/StepIndicator/StepIndicator';
import { CheckboxRow } from '../../molecules/CheckboxRow/CheckboxRow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Icon } from '../../atoms/Icon/Icon';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  EMAIL_PLACEHOLDER,
  TRUST_SIGNAL_TEXT,
  EMAIL_SHARE_LABEL,
  EMAIL_SHARE_ARIA,
  EMAIL_GHOST_LABEL,
  EMAIL_GHOST_ARIA,
  PASSKEY_FALLBACK_PREFIX,
  PASSKEY_FALLBACK_LINK,
  PASSKEY_FALLBACK_ARIA,
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
  /** Callback when the user clicks "No thanks, I'll do it manually" */
  onSkip?: () => void;
  /** Callback when the user clicks "Sign in with passkey" */
  onPasskeySignIn?: () => void;
}

/* ── Component ── */

export function EmailCapture({
  theme = 'light',
  email = '',
  onClose,
  onSend,
  onSkip,
  onPasskeySignIn,
}: EmailCaptureProps) {
  const [emailValue, setEmailValue] = useState(email);
  /** Checkbox state for "Share my email with this site" — checked by default per predecessor */
  const [emailShareChecked, setEmailShareChecked] = useState(true);

  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.EMAIL_CAPTURE]}
        screenId={SCREENS.EMAIL_CAPTURE}
        theme={theme}
      >
        {/* ── Header ──
            Logo + close button. No back arrow on email capture (first screen). */}
        <DialogHeader onClose={onClose} />

        {/* ── Text Block ──
            Bold headline + regular body as inline spans in a single div,
            matching the predecessor's inline-span pattern (NOT separate h2/p). */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{COPY_TEXT.emailHeadline}</span>{' '}
          <span className={styles.regular}>{COPY_TEXT.emailBody}</span>
        </div>

        {/* ── Trust Line ──
            Brand blue motivational tagline below the text block. */}
        <div className={styles.trustLine}>{COPY_TEXT.emailTrustLine}</div>

        {/* ── Step Indicator ──
            Step 1 of 3: email capture → OTP → passkey. */}
        <StepIndicator currentStep={1} totalSteps={3} />

        {/* ── Email Input ──
            Screen-reader-only label + visible placeholder. */}
        <label htmlFor="emailCaptureInput" className={styles.srOnly}>
          Email address
        </label>
        <Input
          type="email"
          placeholder={EMAIL_PLACEHOLDER}
          value={emailValue}
          onChange={setEmailValue}
          ariaLabel={EMAIL_PLACEHOLDER}
        />

        {/* ── Trust Signal Micro Text ──
            Small star icon + "We'll never share your email or send spam."
            Provides reassurance below the email input. */}
        <div className={styles.trustSignal}>
          <Icon name="star" size="xs" className={styles.trustSignalIcon} />
          {TRUST_SIGNAL_TEXT}
        </div>

        {/* ── Share Email Checkbox ──
            Checked by default — user opts in to sharing email with the host site. */}
        <CheckboxRow
          id="emailShareCheckbox"
          label={EMAIL_SHARE_LABEL}
          checked={emailShareChecked}
          onChange={setEmailShareChecked}
          ariaLabel={EMAIL_SHARE_ARIA}
        />

        {/* ── Primary Button ── */}
        <Button
          label={COPY_TEXT.emailSendBtn}
          variant="primary"
          fullWidth
          onClick={onSend}
          ariaLabel="Send verification code to your email"
        />

        {/* ── Passkey Sign-In Fallback ──
            Horizontal divider + "Already have a Trust ID? Sign in with passkey" */}
        <div className={styles.divider} role="separator" />
        <div className={styles.passkeyFallback}>
          {PASSKEY_FALLBACK_PREFIX}{' '}
          <button
            type="button"
            className={styles.link}
            aria-label={PASSKEY_FALLBACK_ARIA}
            onClick={onPasskeySignIn}
          >
            {PASSKEY_FALLBACK_LINK}
          </button>
        </div>

        {/* ── Dismiss Group ──
            Ghost link "No thanks, I'll do it manually" plus re-auth micro text
            warning. Grouped together at the bottom of the banner. */}
        <div className={styles.dismissGroup}>
          <button
            className={styles.ghostBtn}
            onClick={onSkip}
            type="button"
            aria-label={EMAIL_GHOST_ARIA}
          >
            {EMAIL_GHOST_LABEL}
          </button>
          <div className={styles.microFlush} aria-live="off">
            {COPY_TEXT.emailReauthWarning}
          </div>
        </div>

        {/* ── Footer ── */}
        <PoweredBadge />
      </BannerShell>
  );
}

export default EmailCapture;
