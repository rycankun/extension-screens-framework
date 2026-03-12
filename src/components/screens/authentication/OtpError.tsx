/**
 * OtpError — Verification Code Error Screen
 *
 * Screen component (screens/authentication). Displayed when the OTP
 * code entered is incorrect or expired. Shows an error icon, error
 * headline, body text, a Try Again button, and a Resend link.
 *
 * @see docs/PRD.md § 4.2 — OtpError specification
 * @see docs/reference/SCREEN-AUDIT.md — OtpError interactive states
 * @see src/constants/auth.ts — AUTH constants for error text
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  OTP_ERROR_HEADLINE,
  OTP_ERROR_BODY,
  OTP_TRY_AGAIN_LABEL,
  OTP_RESEND_LABEL,
} from '../../../constants/auth';
import styles from './OtpError.module.css';

/* ── Props ── */

export interface OtpErrorProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Try Again is clicked */
  onTryAgain?: () => void;
  /** Callback when Resend Code is clicked */
  onResend?: () => void;
}

/* ── Component ── */

export function OtpError({
  theme = 'light',
  onClose,
  onTryAgain,
  onResend,
}: OtpErrorProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.OTP_ERROR]}
        screenId={SCREENS.OTP_ERROR}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.OTP_ERROR]}
          onClose={onClose}
        />

        {/* ── Error Icon + Content ── */}
        <div className={styles.content}>
          <div className={styles.iconWrap}>
            <Icon name="warning" size="xl" color="var(--tid-error)" ariaLabel="Error" />
          </div>
          <h2 className={styles.headline}>
            {OTP_ERROR_HEADLINE}
          </h2>
          <p className={styles.body}>
            {OTP_ERROR_BODY}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={OTP_TRY_AGAIN_LABEL}
            variant="primary"
            fullWidth
            onClick={onTryAgain}
          />
        </div>

        {/* ── Resend Link ── */}
        <div className={styles.resendRow}>
          <button
            className={styles.resendLink}
            onClick={onResend}
            type="button"
          >
            {OTP_RESEND_LABEL}
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
