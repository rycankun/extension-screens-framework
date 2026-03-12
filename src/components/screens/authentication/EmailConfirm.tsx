/**
 * EmailConfirm — Email Verification Confirmation Screen
 *
 * Screen component (screens/authentication). Shown after the user's
 * email has been successfully verified. Displays a success icon,
 * a confirmation headline, body text, and a Continue button.
 *
 * @see docs/PRD.md § 4.2 — EmailConfirm specification
 * @see src/constants/auth.ts — AUTH constants for confirmation text
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
  EMAIL_CONFIRM_HEADLINE,
  EMAIL_CONFIRM_BODY,
  EMAIL_CONFIRM_BTN,
} from '../../../constants/auth';
import styles from './EmailConfirm.module.css';

/* ── Props ── */

export interface EmailConfirmProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Continue is clicked */
  onContinue?: () => void;
}

/* ── Component ── */

export function EmailConfirm({
  theme = 'light',
  onClose,
  onContinue,
}: EmailConfirmProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.EMAIL_CONFIRM]}
        screenId={SCREENS.EMAIL_CONFIRM}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.EMAIL_CONFIRM]}
          onClose={onClose}
        />

        {/* ── Success Icon + Content ── */}
        <div className={styles.content}>
          <div className={styles.iconWrap}>
            <Icon name="check" size="xl" color="var(--tid-success)" ariaLabel="Success" />
          </div>
          <h2 className={styles.headline}>
            {EMAIL_CONFIRM_HEADLINE}
          </h2>
          <p className={styles.body}>
            {EMAIL_CONFIRM_BODY}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={EMAIL_CONFIRM_BTN}
            variant="primary"
            fullWidth
            onClick={onContinue}
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
