/**
 * ConsentUSStd — US Standard-State Simplified Consent Screen
 *
 * Screen component (screens/consent). Simplified opt-out consent for
 * the ~37 US states without strict privacy laws. Unlike ConsentEU and
 * ConsentUS which use toggle rows, this screen uses text blocks +
 * buttons + privacy links — matching the predecessor consent-t3.html.
 *
 * Structure (top to bottom):
 *   1. DialogHeader (logo + close)
 *   2. Text block — bold headline + body with Privacy Policy / Cookie Policy links
 *   3. Trust line (brand blue)
 *   4. GPC indicator (conditional)
 *   5. DNT indicator (conditional)
 *   6. Social proof
 *   7. Button stack — Reject All → Accept & Continue → Manage Preferences (ghost)
 *   8. Universal opt-out disclosure
 *   9. Privacy choices rows (3 links)
 *  10. Sensitive data notice
 *  11. PoweredBadge footer
 *
 * @see docs/PRD.md § 4.1 — ConsentUSStd specification
 * @see src/constants/consent.ts — US_STD_CONSENT_BODY, US_STD_PRIVACY_CHOICES, etc.
 * @see src/constants/variants.ts — COPY_TEXT for button labels and headlines
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
  US_STD_CONSENT_BODY,
  POLICY_LINKS,
  POLICY_URLS,
  GPC_TEXT,
  GPC_DETAIL,
  DNT_TEXT,
  SOCIAL_PROOF_TEXT,
  UNIVERSAL_OPTOUT_TEXT,
  US_STD_PRIVACY_CHOICES,
  SENSITIVE_DATA_NOTICE,
} from '../../../constants/consent';
import styles from './ConsentUSStd.module.css';

/* ── Props ── */

export interface ConsentUSStdProps {
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
}

/* ── Component ── */

export function ConsentUSStd({
  theme = 'light',
  gpcDetected = false,
  dntDetected = false,
  onClose,
  onAccept,
  onRejectAll,
  onManagePrefs,
}: ConsentUSStdProps) {
  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.CONSENT_US_STD]}
        screenId={SCREENS.CONSENT_US_STD}
        theme={theme}
      >
        {/* ── 1. Header ── */}
        <DialogHeader onClose={onClose} />

        {/* ── 2. Text Block — Headline + Body with Policy Links ── */}
        <div className={styles.textBlock}>
          <span className={styles.headline}>
            {COPY_TEXT.consentHeadline}
          </span>
          <span className={styles.body}>
            {US_STD_CONSENT_BODY}{' '}
            <Link
              href={POLICY_URLS.privacy}
              external
              size="sm"
            >
              {POLICY_LINKS.privacy}
            </Link>
            {' and '}
            <Link
              href={POLICY_URLS.cookie}
              external
              size="sm"
            >
              {POLICY_LINKS.cookie}
            </Link>
            .
          </span>
        </div>

        {/* ── 3. Trust Line ── */}
        <p className={styles.trustLine}>
          {COPY_TEXT.usTrustLine}
        </p>

        {/* ── 4. GPC Indicator (conditional) ── */}
        {gpcDetected && (
          <div className={styles.gpcIndicator} role="status">
            <span className={styles.signalLabel}>{GPC_TEXT}</span>
            <span className={styles.signalDetail}>{GPC_DETAIL}</span>
          </div>
        )}

        {/* ── 5. DNT Indicator (conditional) ── */}
        {dntDetected && (
          <div className={styles.dntIndicator} role="status">
            <span className={styles.signalLabel}>{DNT_TEXT}</span>
          </div>
        )}

        {/* ── 6. Social Proof ── */}
        <SocialProof className={styles.socialProof}>
          {SOCIAL_PROOF_TEXT.prefix}
          {SOCIAL_PROOF_TEXT.boldItems.map((item, idx) => (
            <React.Fragment key={item}>
              <SocialProof.Bold>{item}</SocialProof.Bold>
              {/* Separator dot between bold items, not after the last */}
              {idx < SOCIAL_PROOF_TEXT.boldItems.length - 1 && ' · '}
            </React.Fragment>
          ))}
        </SocialProof>

        {/* ── 7. Button Stack — Reject All → Accept & Continue → Manage Preferences ──
            Order matches predecessor consent-t3.html: reject first (opt-out model),
            then accept, then ghost manage link. */}
        <div className={styles.btnStack}>
          <Button
            label={COPY_TEXT.consentRejectBtn}
            variant="primary"
            fullWidth
            onClick={onRejectAll}
          />
          <Button
            label={COPY_TEXT.usStdAcceptBtn}
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
        <p className={styles.universalOptout}>
          {UNIVERSAL_OPTOUT_TEXT}
        </p>

        {/* ── 9. Privacy Choices Rows (3 links) ── */}
        <nav
          className={styles.privacyChoicesSection}
          aria-label="Privacy choices"
        >
          <Link
            href={US_STD_PRIVACY_CHOICES.privacyChoices.url}
            ariaLabel={US_STD_PRIVACY_CHOICES.privacyChoices.ariaLabel}
            className={styles.privacyChoicesLink}
            external
            size="sm"
          >
            {US_STD_PRIVACY_CHOICES.privacyChoices.label}
          </Link>
          <Link
            href={US_STD_PRIVACY_CHOICES.dns.url}
            ariaLabel={US_STD_PRIVACY_CHOICES.dns.ariaLabel}
            className={styles.privacyChoicesLink}
            external
            size="sm"
          >
            {US_STD_PRIVACY_CHOICES.dns.label}
          </Link>
          <Link
            href={US_STD_PRIVACY_CHOICES.sensitivePI.url}
            ariaLabel={US_STD_PRIVACY_CHOICES.sensitivePI.ariaLabel}
            className={styles.privacyChoicesLink}
            external
            size="sm"
          >
            {US_STD_PRIVACY_CHOICES.sensitivePI.label}
          </Link>
        </nav>

        {/* ── 10. Sensitive Data Notice ── */}
        <p className={styles.sensitiveDataNotice} role="note">
          {SENSITIVE_DATA_NOTICE}
        </p>

        {/* ── 11. Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default ConsentUSStd;
