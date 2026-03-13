/**
 * ConsentUS — US Strict-State Opt-Out Consent Screen
 *
 * Screen component (screens/consent). Renders the opt-out consent prompt
 * for US strict-privacy states (CA, CO, CT, DE, GA, MD, MN, MT, NH, NJ,
 * OR, TN, TX). Unlike the EU screen, this does NOT display toggle rows —
 * it shows a text body with policy links, GPC/DNT signal indicators,
 * social proof, a three-button action stack, universal opt-out disclosure,
 * and five privacy choices links.
 *
 * Structure (matches predecessor consent-t2.html):
 *   1. DialogHeader (logo + close)
 *   2. Bold headline + body paragraph with Privacy Policy / Cookie Policy links
 *   3. Trust line (brand blue)
 *   4. GPC indicator (conditional — shield icon + text + detail)
 *   5. DNT indicator (conditional — circle-slash icon + text)
 *   6. Social proof (badge-check icon + trust text)
 *   7. Button stack: Reject All → Accept & Continue → Manage Preferences (ghost)
 *   8. Universal opt-out disclosure
 *   9. Privacy choices rows (5 links with legal citations)
 *  10. PoweredBadge footer
 *
 * @see docs/PRD.md § 4.1 — ConsentUS specification
 * @see docs/reference/SCREEN-AUDIT.md — consent-t2 interactive states
 * @see src/constants/consent.ts — all text constants
 * @see src/constants/variants.ts — COPY_TEXT for button labels
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { SocialProof } from '../../molecules/SocialProof/SocialProof';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  US_CONSENT_BODY,
  POLICY_LINKS,
  POLICY_URLS,
  GPC_TEXT,
  GPC_DETAIL,
  DNT_TEXT,
  SOCIAL_PROOF_TEXT,
  UNIVERSAL_OPTOUT_TEXT,
  US_PRIVACY_CHOICES,
} from '../../../constants/consent';
import styles from './ConsentUS.module.css';

/* ── Props ── */

export interface ConsentUSProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Whether Global Privacy Control signal is detected */
  gpcDetected?: boolean;
  /** Whether Do Not Track signal is detected */
  dntDetected?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Accept & Continue is clicked */
  onAccept?: () => void;
  /** Callback when Reject All is clicked */
  onRejectAll?: () => void;
  /** Callback when Manage Preferences is clicked */
  onManagePrefs?: () => void;
  /** Callback when Request My Data is clicked */
  onRequestData?: () => void;
}

/* ── Inline SVG Icons ──
   Self-contained SVGs for Figma-compatible rendering.
   No external icon font or sprite sheet dependencies. */

/** Shield icon for GPC indicator — stroke-based outline per predecessor */
function ShieldIcon() {
  return (
    <svg
      className={styles.gpcIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/** Badge-check icon for universal opt-out disclosure — predecessor pattern */
function BadgeCheckIcon() {
  return (
    <svg
      className={styles.optoutIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.77 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Circle-slash icon for DNT indicator — 14px, muted color */
function CircleSlashIcon() {
  return (
    <svg
      className={styles.dntIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}

/* ── Component ── */

export function ConsentUS({
  theme = 'light',
  gpcDetected = false,
  dntDetected = false,
  onClose,
  onAccept,
  onRejectAll,
  onManagePrefs,
  onRequestData,
}: ConsentUSProps) {
  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.CONSENT_US]}
        screenId={SCREENS.CONSENT_US}
      >
        {/* ── 1. Header ── */}
        <DialogHeader onClose={onClose} />

        {/* ── 2. Headline + Body with Policy Links ── */}
        <div className={styles.content}>
          <span className={styles.headline}>
            {COPY_TEXT.consentHeadline}
          </span>
          <span className={styles.body}>
            {US_CONSENT_BODY}{' '}
            <Link href={POLICY_URLS.privacy} external size="sm">
              {POLICY_LINKS.privacy}
            </Link>{' '}
            and{' '}
            <Link href={POLICY_URLS.cookie} external size="sm">
              {POLICY_LINKS.cookie}
            </Link>
            .
          </span>
        </div>

        {/* ── 3. Trust Line (brand blue) ── */}
        <p className={styles.trustLine}>
          {COPY_TEXT.usTrustLine}
        </p>

        {/* ── 4. GPC Indicator (conditional) ── */}
        {gpcDetected && (
          <div className={styles.gpcIndicator} role="status" aria-live="polite">
            <ShieldIcon />
            <div className={styles.gpcContent}>
              <span className={styles.gpcText}>{GPC_TEXT}</span>
              <span className={styles.gpcDetail}>{GPC_DETAIL}</span>
            </div>
          </div>
        )}

        {/* ── 5. DNT Indicator (conditional) ── */}
        {dntDetected && (
          <div className={styles.dntIndicator} role="status" aria-live="polite">
            <CircleSlashIcon />
            <span className={styles.dntText}>{DNT_TEXT}</span>
          </div>
        )}

        {/* ── 6. Social Proof ── */}
        <SocialProof>
          {SOCIAL_PROOF_TEXT.prefix}
          <SocialProof.Bold>{SOCIAL_PROOF_TEXT.boldItems[0]}</SocialProof.Bold>
          {' · '}
          <SocialProof.Bold>{SOCIAL_PROOF_TEXT.boldItems[1]}</SocialProof.Bold>
        </SocialProof>

        {/* ── 7. Button Stack: Reject → Accept & Continue → Manage Preferences ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.consentRejectBtn}
            variant="primary"
            fullWidth
            onClick={onRejectAll}
          />
          <Button
            label={COPY_TEXT.usAcceptBtn}
            variant="primary"
            fullWidth
            onClick={onAccept}
          />
          <Button
            label={COPY_TEXT.consentManageBtn}
            variant="ghost"
            fullWidth
            onClick={onManagePrefs}
          />
        </div>

        {/* ── 8. Universal Opt-Out Disclosure ── */}
        <div className={styles.optoutDisclosure}>
          <BadgeCheckIcon />
          <span>{UNIVERSAL_OPTOUT_TEXT}</span>
        </div>

        {/* ── 9. Privacy Choices Links (5 rows) ── */}
        <nav
          className={styles.privacyChoices}
          aria-label="Privacy choices"
        >
          {/* CCPA §1798.135(a) — Do Not Sell or Share */}
          <div className={styles.privacyChoicesRow}>
            <Link
              href={US_PRIVACY_CHOICES.dns.url}
              ariaLabel={US_PRIVACY_CHOICES.dns.ariaLabel}
              className={styles.privacyChoicesLink}
              external
              size="sm"
            >
              {US_PRIVACY_CHOICES.dns.label}
            </Link>
          </div>

          {/* CPA §6-1-1313 — Targeted Advertising Opt-Out */}
          <div className={styles.privacyChoicesRow}>
            <Link
              href={US_PRIVACY_CHOICES.targetedAds.url}
              ariaLabel={US_PRIVACY_CHOICES.targetedAds.ariaLabel}
              className={styles.privacyChoicesLink}
              external
              size="sm"
            >
              {US_PRIVACY_CHOICES.targetedAds.label}
            </Link>
          </div>

          {/* CPRA §1798.121 — Limit Sensitive PI */}
          <div className={styles.privacyChoicesRow}>
            <Link
              href={US_PRIVACY_CHOICES.sensitivePI.url}
              ariaLabel={US_PRIVACY_CHOICES.sensitivePI.ariaLabel}
              className={styles.privacyChoicesLink}
              external
              size="sm"
            >
              {US_PRIVACY_CHOICES.sensitivePI.label}
            </Link>
          </div>

          {/* CCPA §1798.110 — Request My Data (role="button", callback-driven) */}
          <div className={styles.privacyChoicesRow}>
            <button
              type="button"
              className={styles.privacyChoicesButton}
              onClick={onRequestData}
              aria-label={US_PRIVACY_CHOICES.requestData.ariaLabel}
            >
              {US_PRIVACY_CHOICES.requestData.label}
            </button>
          </div>

          {/* CCPA §1798.125 — Notice of Financial Incentive */}
          <div className={styles.privacyChoicesRow}>
            <Link
              href={US_PRIVACY_CHOICES.financialIncentive.url}
              ariaLabel={US_PRIVACY_CHOICES.financialIncentive.ariaLabel}
              className={styles.privacyChoicesLink}
              external
              size="sm"
            >
              {US_PRIVACY_CHOICES.financialIncentive.label}
            </Link>
          </div>
        </nav>

        {/* ── 10. Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
    </div>
  );
}

export default ConsentUS;
