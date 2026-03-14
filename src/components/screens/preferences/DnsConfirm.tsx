/**
 * DnsConfirm — Do Not Sell / Share Confirmation Screen (Success State)
 *
 * Screen component (screens/preferences). Shows a SUCCESS confirmation
 * after the user's opt-out request has been received. Matches the
 * predecessor dns-confirm.html layout exactly:
 *   1. Custom header: BackArrow + host-site logo + close button
 *   2. Centered confirmation block:
 *      - Green check-circle icon (24×24, stroke)
 *      - Bold title: "Request Received"
 *      - Body: opt-out confirmation text
 *      - Note box: applies to this site only
 *   3. Primary button: "Return to Site"
 *   4. Micro text: "You can update these anytime..."
 *   5. PoweredBadge footer
 *
 * This is NOT an opt-out prompt — it is the confirmation state shown
 * after the opt-out has already been processed.
 *
 * @see docs/PRD.md § 4.3 — DnsConfirm specification
 * @see src/constants/preferences.ts — DNS_* constants
 * @see docs/reference/ — Predecessor dns-confirm.html
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  DNS_HEADLINE,
  DNS_BODY,
  DNS_NOTE,
  DNS_RETURN_BTN,
  DNS_RETURN_ARIA,
  DNS_UPDATE_TEXT,
} from '../../../constants/preferences';
import styles from './DnsConfirm.module.css';

/* ── Props ── */

export interface DnsConfirmProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Callback when the back arrow is clicked */
  onBack?: () => void;
  /** Callback when "Return to Site" button is clicked */
  onReturn?: () => void;
}

/* ── Component ── */

export function DnsConfirm({
  theme = 'light',
  onClose,
  onBack,
  onReturn,
}: DnsConfirmProps) {
  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.DNS_CONFIRM]}
        screenId={SCREENS.DNS_CONFIRM}
        theme={theme}
      >
        {/* ── Header with Back Arrow ──
            Delegates to DialogHeader molecule (single source of truth for
            header layout + close button). showBackArrow adds the BackArrow
            molecule before the logo, matching predecessor .logo-left layout. */}
        <DialogHeader showBackArrow onBack={onBack} onClose={onClose} />

        {/* ── DNS Confirm Content ──
            Centered success confirmation block: green check icon,
            bold title, body text, and note box. */}
        <div className={styles.dnsContent}>
          {/* ── Green Check Icon ──
              24×24 stroke-based check-circle from predecessor.
              Wrapped in a 48×48 circle with success-tint background.
              Uses currentColor so the token (.checkIcon color) applies. */}
          <div className={styles.checkIconWrap}>
            <Icon name="checkCircle" size="lg" className={styles.checkIcon} />
          </div>

          {/* ── Title ── */}
          <h2 className={styles.title}>{DNS_HEADLINE}</h2>

          {/* ── Description ── */}
          <p className={styles.description}>{DNS_BODY}</p>

          {/* ── Note Box ──
              Subtle background box explaining scope (this site only). */}
          <p className={styles.note}>{DNS_NOTE}</p>
        </div>

        {/* ── Return to Site Button ── */}
        <div className={styles.actions}>
          <Button
            label={DNS_RETURN_BTN}
            ariaLabel={DNS_RETURN_ARIA}
            variant="primary"
            fullWidth
            onClick={onReturn}
          />
        </div>

        {/* ── Update Micro Text ──
            "You can update these anytime by clicking the Trust ID icon." */}
        <p className={styles.micro}>{DNS_UPDATE_TEXT}</p>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default DnsConfirm;
