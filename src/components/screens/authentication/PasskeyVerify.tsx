/**
 * PasskeyVerify — Passkey Authentication Screen
 *
 * Screen component (screens/authentication). Prompts the user to
 * authenticate with their existing passkey (fingerprint, face, or
 * device PIN). Shows a person-outline SVG preview area with waiting
 * status text, a GREEN "Simulate Passkey Success" button, a secondary
 * "Use code instead" button, and a PoweredBadge footer.
 *
 * Predecessor match: passkey-verify.html
 *   - DialogHeader: logo + close button (NO back arrow)
 *   - Text block: bold headline + regular body (left-aligned)
 *   - Passkey preview: 48x48 SVG person icon + waiting subtext (centered)
 *   - Primary button: GREEN (btn-primary btn-success) not default brand blue
 *   - Secondary button: "Use code instead" (btn-secondary, not a text link)
 *   - PoweredBadge footer
 *
 * @see docs/PRD.md § 4.2 — PasskeyVerify specification
 * @see src/constants/variants.ts — COPY_TEXT for passkey verify text
 * @see src/constants/auth.ts — AUTH constants for labels/ARIA
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  PASSKEY_VERIFY_BTN,
  PASSKEY_VERIFY_BTN_ARIA,
  PASSKEY_USE_CODE,
  PASSKEY_USE_CODE_ARIA,
  PASSKEY_VERIFY_WAITING,
} from '../../../constants/auth';
import styles from './PasskeyVerify.module.css';

/* ── Props ── */

export interface PasskeyVerifyProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Simulate Passkey Success is clicked */
  onVerify?: () => void;
  /** Callback when Use code instead is clicked */
  onUseCode?: () => void;
}

/* ── Component ── */

export function PasskeyVerify({
  theme = 'light',
  onClose,
  onVerify,
  onUseCode,
}: PasskeyVerifyProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.PASSKEY_VERIFY]}
        screenId={SCREENS.PASSKEY_VERIFY}
      >
        {/* ── Header: logo + close (NO back arrow) ── */}
        <DialogHeader onClose={onClose} />

        {/* ── Text Block: bold headline + regular body as inline spans ──
            Matches predecessor's inline-span pattern (NOT block p elements). */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{COPY_TEXT.passkeyVerifyHeadline}</span>{' '}
          <span className={styles.regular}>{COPY_TEXT.passkeyVerifyBody}</span>
        </div>

        {/* ── Passkey Preview Area ──
            Centered 48x48 person-outline SVG + waiting status text.
            Predecessor: .passkey-preview with aria-label and aria-live subtext. */}
        <div className={styles.passkeyPreview} aria-label="Waiting for biometric authentication">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className={styles.passkeyIcon}
          >
            <rect x="4" y="4" width="40" height="40" rx="12" stroke="currentColor" strokeWidth="2" />
            <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M14 36c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className={styles.waitingText} aria-live="polite">
            {PASSKEY_VERIFY_WAITING}
          </div>
        </div>

        {/* ── Action Buttons ──
            1. "Simulate Passkey Success" — GREEN button (success override on primary)
            2. "Use code instead" — secondary button (not a text link) */}
        <div className={styles.actions}>
          <Button
            label={PASSKEY_VERIFY_BTN}
            variant="primary"
            fullWidth
            onClick={onVerify}
            ariaLabel={PASSKEY_VERIFY_BTN_ARIA}
            className={styles.successBtn}
          />
          <Button
            label={PASSKEY_USE_CODE}
            variant="secondary"
            fullWidth
            onClick={onUseCode}
            ariaLabel={PASSKEY_USE_CODE_ARIA}
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

export default PasskeyVerify;
