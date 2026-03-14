/**
 * ConsentEU — EU/GDPR Opt-In Consent Screen
 *
 * Screen component (screens/consent). Renders the GDPR-compliant consent
 * prompt matching the predecessor consent-t1.html structure exactly:
 *   1. DialogHeader (logo + close)
 *   2. Text block (bold headline + body with inline policy links)
 *   3. Trust line (brand blue, medium weight)
 *   4. GPC indicator (conditional)
 *   5. Social proof (badge-check icon + trust text)
 *   6. Button stack: Reject All → Accept All → Manage Preferences (ghost)
 *   7. Consent receipt (hidden placeholder)
 *   8. Universal opt-out disclosure
 *   9. PoweredBadge footer
 *
 * IMPORTANT: EU consent has NO toggles. Toggles belong on the cookie-prefs
 * screen only. The predecessor consent-t1.html uses text blocks + buttons.
 *
 * Button order is Reject → Accept → Manage per CNIL enforcement guidance
 * (reject must be as prominent and accessible as accept).
 *
 * @see docs/PRD.md § 4.1 — ConsentEU specification
 * @see src/constants/consent.ts — EU_CONSENT_BODY, POLICY_LINKS, GPC_TEXT
 * @see src/constants/variants.ts — COPY_TEXT for headlines, button labels
 * @see src/constants/screens.ts — SCREEN_TITLES for ARIA labels
 */
import React from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { SocialProof } from '../../molecules/SocialProof/SocialProof';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Icon } from '../../atoms/Icon/Icon';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT } from '../../../constants/variants';
import {
  EU_CONSENT_BODY,
  POLICY_LINKS,
  POLICY_URLS,
  GPC_TEXT,
  GPC_DETAIL,
  SOCIAL_PROOF_TEXT,
  UNIVERSAL_OPTOUT_TEXT,
} from '../../../constants/consent';
import styles from './ConsentEU.module.css';

/* ── Props ── */

export interface ConsentEUProps {
  /** Theme variant — controls light/dark token overrides via data-theme */
  theme?: 'light' | 'dark';
  /** Whether Global Privacy Control signal is detected in the browser */
  gpcDetected?: boolean;
  /** Callback when the close (×) button is clicked */
  onClose?: () => void;
  /** Callback when Accept All is clicked (opt-in to all cookie categories) */
  onAcceptAll?: () => void;
  /** Callback when Reject All is clicked (refuse all non-essential cookies) */
  onRejectAll?: () => void;
  /** Callback when Manage Preferences is clicked (navigate to cookie-prefs) */
  onManagePrefs?: () => void;
}

/* ── Component ── */

export function ConsentEU({
  theme = 'light',
  gpcDetected = false,
  onClose,
  onAcceptAll,
  onRejectAll,
  onManagePrefs,
}: ConsentEUProps) {
  return (
    <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.CONSENT_EU]}
        screenId={SCREENS.CONSENT_EU}
        theme={theme}
      >
        {/* ── 1. Header ── */}
        <DialogHeader onClose={onClose} />

        {/* ── 2. Text Block ──
            Bold headline + regular body with inline policy links.
            Matches predecessor consent-t1.html .consent-text-block. */}
        <div className={styles.textBlock}>
          <span className={styles.textBlockBold}>
            {COPY_TEXT.consentHeadline}
          </span>
          <span className={styles.textBlockRegular}>
            {EU_CONSENT_BODY}{' '}
            <Link href={POLICY_URLS.privacy} size="sm">
              {POLICY_LINKS.privacy}
            </Link>
            ,{' '}
            <Link href={POLICY_URLS.cookie} size="sm">
              {POLICY_LINKS.cookie}
            </Link>
            , &amp;{' '}
            <Link href={POLICY_URLS.terms} size="sm">
              {POLICY_LINKS.terms}
            </Link>
            .
          </span>
        </div>

        {/* ── 3. Trust Line ── */}
        <p className={styles.trustLine}>
          {COPY_TEXT.consentTrustLine}
        </p>

        {/* ── 4. GPC Indicator (conditional) ──
            Only rendered when the browser's Global Privacy Control signal
            is active. GDPR doesn't mandate GPC, but showing it builds trust
            and aligns with ePrivacy Regulation drafts. */}
        {gpcDetected && (
          <div className={styles.gpcIndicator} role="status">
            <Icon name="shield" className={styles.gpcIcon} />
            <div>
              <p className={styles.gpcText}>{GPC_TEXT}</p>
              <p className={styles.gpcDetail}>{GPC_DETAIL}</p>
            </div>
          </div>
        )}

        {/* ── 5. Social Proof ── */}
        <SocialProof>
          {SOCIAL_PROOF_TEXT.prefix}
          {SOCIAL_PROOF_TEXT.boldItems.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && ' · '}
              <SocialProof.Bold>{item}</SocialProof.Bold>
            </React.Fragment>
          ))}
        </SocialProof>

        {/* ── 6. Button Stack ──
            Order: Reject → Accept → Manage Preferences (ghost).
            CNIL requires reject to be at least as prominent as accept.
            Placing reject first satisfies the "same level" enforcement. */}
        <div className={styles.btnStack}>
          <Button
            label={COPY_TEXT.consentRejectBtn}
            variant="primary"
            fullWidth
            onClick={onRejectAll}
          />
          <Button
            label={COPY_TEXT.consentAcceptBtn}
            variant="primary"
            fullWidth
            onClick={onAcceptAll}
          />
          <Button
            label={COPY_TEXT.consentManageBtn}
            variant="ghost"
            fullWidth
            onClick={onManagePrefs}
          />
        </div>

        {/* ── 7. Consent Receipt ──
            Hidden placeholder populated by the extension runtime after the
            user submits a choice. Kept in the DOM so layout doesn't shift. */}
        <div
          className={styles.consentReceipt}
          aria-hidden="true"
          data-consent-receipt
        />

        {/* ── 8. Universal Opt-Out Disclosure ──
            Required by CPA §6-1-1313 and similar state laws. Displayed
            regardless of GPC detection to inform all users. */}
        <div className={styles.universalOptout}>
          <Icon name="badgeCheck" className={styles.gpcIcon} />
          <span>{UNIVERSAL_OPTOUT_TEXT}</span>
        </div>

        {/* ── 9. Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
  );
}

export default ConsentEU;
