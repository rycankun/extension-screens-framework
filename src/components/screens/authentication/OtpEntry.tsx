/**
 * OtpEntry — 6-Digit Verification Code Screen
 *
 * Screen component (screens/authentication). Displays a 6-digit OTP
 * input for email verification. Includes the user's email in the
 * subtext, an auto-submit indicator, a verify button, and a resend
 * link with countdown display.
 *
 * @see docs/PRD.md § 4.2 — OtpEntry specification
 * @see src/components/molecules/OtpInput/OtpInput.tsx — OTP input molecule
 * @see src/constants/variants.ts — COPY_TEXT for screen text
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { OtpInput } from '../../molecules/OtpInput/OtpInput';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  OTP_SUBTEXT_PREFIX,
  OTP_VERIFY_LABEL,
  OTP_RESEND_LABEL,
  OTP_DEFAULT_VALUE,
} from '../../../constants/auth';
import styles from './OtpEntry.module.css';

/* ── Props ── */

export interface OtpEntryProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Email address the code was sent to */
  email?: string;
  /** Pre-filled OTP value for stories */
  otpValue?: string;
  /** Countdown seconds remaining for resend (0 = resend available) */
  resendCountdown?: number;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Verify is clicked */
  onVerify?: () => void;
  /** Callback when Resend Code is clicked */
  onResend?: () => void;
}

/* ── Component ── */

export function OtpEntry({
  theme = 'light',
  email = 'user@example.com',
  otpValue = OTP_DEFAULT_VALUE,
  resendCountdown = 0,
  onClose,
  onVerify,
  onResend,
}: OtpEntryProps) {
  const [otp, setOtp] = useState(otpValue);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.OTP_ENTRY]}
        screenId={SCREENS.OTP_ENTRY}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.OTP_ENTRY]}
          onClose={onClose}
        />

        {/* ── Headline + Subtext ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {COPY_TEXT.otpHeadline}
          </h2>
          <p className={styles.subtext}>
            {OTP_SUBTEXT_PREFIX}{' '}
            <strong className={styles.email}>{email}</strong>
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── OTP Input ── */}
        <div className={styles.otpArea}>
          <OtpInput
            value={otp}
            onChange={setOtp}
          />
          <p className={styles.autoSubmit}>
            {COPY_TEXT.otpAutoSubmit}
          </p>
        </div>

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={OTP_VERIFY_LABEL}
            variant="primary"
            fullWidth
            onClick={onVerify}
          />
        </div>

        {/* ── Resend Link ── */}
        <div className={styles.resendRow}>
          <button
            className={styles.resendLink}
            onClick={onResend}
            disabled={resendCountdown > 0}
            type="button"
          >
            {resendCountdown > 0
              ? `${OTP_RESEND_LABEL} (${resendCountdown}s)`
              : OTP_RESEND_LABEL}
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

export default OtpEntry;
