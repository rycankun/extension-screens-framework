/**
 * CookieEmail — Save Cookie Preferences via Email Screen
 *
 * Screen component (screens/preferences). Collects the user's email
 * to persist cookie preferences to their Trust ID account. Similar
 * to EmailCapture but contextualised for cookie management flow.
 *
 * @see docs/PRD.md § 4.3 — CookieEmail specification
 * @see src/constants/variants.ts — COPY_TEXT for cookieEmail* keys
 * @see src/constants/auth.ts — EMAIL_PLACEHOLDER shared label
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import { EMAIL_PLACEHOLDER } from '../../../constants/auth';
import styles from './CookieEmail.module.css';

/* ── Props ── */

export interface CookieEmailProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Pre-filled email address value */
  email?: string;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Send Verification Code is clicked */
  onSend?: () => void;
}

/* ── Component ── */

export function CookieEmail({
  theme = 'light',
  email = '',
  onClose,
  onSend,
}: CookieEmailProps) {
  const [emailValue, setEmailValue] = useState(email);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.COOKIE_EMAIL]}
        screenId={SCREENS.COOKIE_EMAIL}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.COOKIE_EMAIL]}
          onClose={onClose}
        />

        {/* ── Headline + Body ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {COPY_TEXT.cookieEmailHeadline}
          </h2>
          <p className={styles.body}>
            {COPY_TEXT.cookieEmailBody}
          </p>
          <p className={styles.trustLine}>
            {COPY_TEXT.cookieEmailTrustLine}
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

        {/* ── Action Button ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.cookieEmailSendBtn}
            variant="primary"
            fullWidth
            onClick={onSend}
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

export default CookieEmail;
