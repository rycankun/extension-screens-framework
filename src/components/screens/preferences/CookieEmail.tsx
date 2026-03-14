/**
 * CookieEmail — Save Cookie Preferences via Email Screen
 *
 * Screen component (screens/preferences). Collects the user's email
 * to persist cookie preferences to their Trust ID account. Matches the
 * predecessor cookie-email.html layout exactly:
 *
 *   1. Custom header: BackArrow + host-site logo + close button
 *   2. Text block: bold headline + regular body (inline spans)
 *   3. Trust line ("Set once. Yours forever." — brand blue)
 *   4. StepIndicator (Step 1 of 3)
 *   5. Email input with sr-only label
 *   6. Trust signal micro text: star icon + "We'll never share..."
 *   7. CheckboxRow: "Share my email with this site" (checked by default)
 *   8. Primary button: "Send Verification Code"
 *   9. Divider + passkey sign-in fallback link
 *  10. Dismiss group: "Save without an account" ghost button + expiry callout
 *  11. PoweredBadge footer
 *
 * Uses the same custom header pattern as OtpEntry/OtpError (BackArrow +
 * logo + close), NOT the DialogHeader molecule (which has no back arrow).
 *
 * @see docs/PRD.md § 4.3 — CookieEmail specification
 * @see src/constants/variants.ts — COPY_TEXT for cookieEmail* keys
 * @see src/constants/auth.ts — shared email/passkey constants
 * @see src/constants/preferences.ts — COOKIE_EMAIL_* constants
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { BackArrow } from '../../molecules/BackArrow/BackArrow';
import { StepIndicator } from '../../molecules/StepIndicator/StepIndicator';
import { CheckboxRow } from '../../molecules/CheckboxRow/CheckboxRow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  EMAIL_PLACEHOLDER,
  TRUST_SIGNAL_TEXT,
  EMAIL_SHARE_LABEL,
  EMAIL_SHARE_ARIA,
  PASSKEY_FALLBACK_PREFIX,
  PASSKEY_FALLBACK_LINK,
  PASSKEY_FALLBACK_ARIA,
} from '../../../constants/auth';
import {
  COOKIE_EMAIL_SAVE_WITHOUT,
  COOKIE_EMAIL_EXPIRY_WARNING,
} from '../../../constants/preferences';
import styles from './CookieEmail.module.css';

/* ── Constants ── */

/** Default host site logo for the StreamVault demo context */
const DEFAULT_LOGO_SRC = '/assets/StreamVault-BrandLockup-Primary.svg';
const DEFAULT_LOGO_ALT = 'StreamVault';

/* ── Props ── */

export interface CookieEmailProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Pre-filled email address value */
  email?: string;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when the back arrow is clicked (returns to cookie prefs) */
  onBack?: () => void;
  /** Callback when Send Verification Code is clicked */
  onSend?: () => void;
  /** Callback when "Sign in with passkey" is clicked */
  onPasskeySignIn?: () => void;
  /** Callback when "Save without an account" is clicked */
  onSaveWithout?: () => void;
}

/* ── Component ── */

export function CookieEmail({
  theme = 'light',
  email = '',
  onClose,
  onBack,
  onSend,
  onPasskeySignIn,
  onSaveWithout,
}: CookieEmailProps) {
  const [emailValue, setEmailValue] = useState(email);
  /** Checkbox state for "Share my email with this site" — checked by default per predecessor */
  const [emailShareChecked, setEmailShareChecked] = useState(true);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.COOKIE_EMAIL]}
        screenId={SCREENS.COOKIE_EMAIL}
      >
        {/* ── Header with Back Arrow ──
            Custom header: BackArrow + logo on the left, close button on the right.
            Matches predecessor .logo > .logo-left + .close-btn layout.
            Same pattern as OtpEntry/OtpError — NOT DialogHeader. */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <BackArrow onClick={onBack} />
            <img
              className={styles.logoImg}
              src={DEFAULT_LOGO_SRC}
              alt={DEFAULT_LOGO_ALT}
            />
          </div>
          <button
            className={styles.closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close verification banner"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Text Block ──
            Bold headline + regular body as inline spans in a single div,
            matching the predecessor's inline-span pattern (NOT separate h2/p). */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{COPY_TEXT.cookieEmailHeadline}</span>{' '}
          <span className={styles.regular}>{COPY_TEXT.cookieEmailBody}</span>
        </div>

        {/* ── Trust Line ──
            Brand blue motivational tagline below the text block. */}
        <div className={styles.trustLine}>{COPY_TEXT.cookieEmailTrustLine}</div>

        {/* ── Step Indicator ──
            Step 1 of 3: Cookie Email (active) → OTP → Passkey. */}
        <StepIndicator currentStep={1} totalSteps={3} />

        {/* ── Email Input ──
            Screen-reader-only label + visible placeholder. */}
        <label htmlFor="cookieEmailInput" className={styles.srOnly}>
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
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={styles.trustSignalIcon}
          >
            <path
              d="M6 1L7 3.5H9.5L7.5 5.5L8.5 8L6 6.5L3.5 8L4.5 5.5L2.5 3.5H5L6 1Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
          {TRUST_SIGNAL_TEXT}
        </div>

        {/* ── Share Email Checkbox ──
            Checked by default — user opts in to sharing email with the host site. */}
        <CheckboxRow
          id="cookieEmailShareCheckbox"
          label={EMAIL_SHARE_LABEL}
          checked={emailShareChecked}
          onChange={setEmailShareChecked}
          ariaLabel={EMAIL_SHARE_ARIA}
        />

        {/* ── Primary Button ── */}
        <Button
          label={COPY_TEXT.cookieEmailSendBtn}
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
            "Save without an account" ghost button + expiry callout
            with clock icon warning about 6-month preference expiry. */}
        <div className={styles.dismissGroup}>
          <button
            className={styles.ghostBtn}
            onClick={onSaveWithout}
            type="button"
            aria-label="Save cookie preferences without creating an account"
          >
            {COOKIE_EMAIL_SAVE_WITHOUT}
          </button>

          {/* ── Expiry Callout ──
              Clock icon + warning text about preference expiration. */}
          <div className={styles.expiryCallout}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={styles.clockIcon}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{COOKIE_EMAIL_EXPIRY_WARNING}</span>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
    </div>
  );
}

export default CookieEmail;
