/**
 * ConsentUS — US Strict-State Opt-Out Consent Screen
 *
 * Screen component (screens/consent). Renders the opt-out consent
 * prompt for US strict-privacy states (CA, CO, CT, GA, MD, NH, OR, TN).
 * US opt-out model: toggles default ON, user opts out by turning them off.
 *
 * CT special case: under-18 advertising toggle is locked OFF with
 * an explanatory notice (CTDPA minor advertising ban).
 *
 * @see docs/PRD.md § 4.1 — ConsentUS specification
 * @see docs/reference/SCREEN-AUDIT.md — consent-t2 interactive states
 * @see src/constants/variants.ts — COPY_TEXT for all screen text
 * @see src/constants/jurisdictions.ts — JURISDICTION_CONFIGS for legal text
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { ConsentToggle } from '../../molecules/ConsentToggle/ConsentToggle';
import { LegalNotice } from '../../molecules/LegalNotice/LegalNotice';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { JURISDICTIONS, JURISDICTION_CONFIGS } from '../../../constants/jurisdictions';
import { COPY_TEXT } from '../../../constants/variants';
import {
  CONSENT_CATEGORIES,
  SIGNAL_BADGES,
  CT_MINOR_BAN_NOTICE,
  CT_MINOR_BAN_BADGE,
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
  /** Whether CT minor advertising ban is active (locks marketing toggle OFF) */
  ctMinorBan?: boolean;
  /** Initial state of analytics toggle (US default: ON — opt-out model) */
  analyticsOn?: boolean;
  /** Initial state of marketing toggle (US default: ON — opt-out model) */
  marketingOn?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Accept & Continue is clicked */
  onAccept?: () => void;
  /** Callback when Reject All is clicked */
  onRejectAll?: () => void;
}

/* ── Component ── */

export function ConsentUS({
  theme = 'light',
  gpcDetected = false,
  dntDetected = false,
  ctMinorBan = false,
  analyticsOn = true,
  marketingOn = true,
  onClose,
  onAccept,
  onRejectAll,
}: ConsentUSProps) {
  const [analytics, setAnalytics] = useState(analyticsOn);
  const [marketing, setMarketing] = useState(ctMinorBan ? false : marketingOn);

  const jurisdictionConfig = JURISDICTION_CONFIGS[JURISDICTIONS.US_STRICT];

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.CONSENT_US]}
        screenId={SCREENS.CONSENT_US}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.CONSENT_US]}
          onClose={onClose}
        />

        {/* ── Signal Detection Badges ── */}
        {(gpcDetected || dntDetected) && (
          <div className={styles.signals}>
            {gpcDetected && (
              <Badge label={SIGNAL_BADGES.GPC} variant="info" size="sm" />
            )}
            {dntDetected && (
              <Badge label={SIGNAL_BADGES.DNT} variant="info" size="sm" />
            )}
          </div>
        )}

        {/* ── Headline + Body ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {COPY_TEXT.consentHeadline}
          </h2>
          <p className={styles.trustLine}>
            {COPY_TEXT.usTrustLine}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Consent Toggles ──
            US opt-out: toggles default ON. User opts out by turning off. */}
        <div className={styles.toggles}>
          <ConsentToggle
            label={CONSENT_CATEGORIES.essential.label}
            sublabel={CONSENT_CATEGORIES.essential.sublabel}
            checked={true}
            onChange={() => {}}
            locked={true}
            showInfo={true}
            infoText={CONSENT_CATEGORIES.essential.info}
          />
          <ConsentToggle
            label={CONSENT_CATEGORIES.analytics.label}
            sublabel={CONSENT_CATEGORIES.analytics.sublabel}
            checked={analytics}
            onChange={setAnalytics}
            showInfo={true}
            infoText={CONSENT_CATEGORIES.analytics.info}
          />
          <ConsentToggle
            label={CONSENT_CATEGORIES.marketing.label}
            sublabel={ctMinorBan
              ? CT_MINOR_BAN_NOTICE
              : CONSENT_CATEGORIES.marketing.sublabel}
            checked={marketing}
            onChange={ctMinorBan ? () => {} : setMarketing}
            locked={ctMinorBan}
            showInfo={true}
            infoText={ctMinorBan
              ? CT_MINOR_BAN_NOTICE
              : CONSENT_CATEGORIES.marketing.info}
          />
        </div>

        {/* ── CT Minor Ban Notice ── */}
        {ctMinorBan && (
          <div className={styles.banNotice}>
            <Badge label={CT_MINOR_BAN_BADGE} variant="warning" size="sm" />
          </div>
        )}

        <Divider spacing="sm" />

        {/* ── Legal Notice ── */}
        <LegalNotice
          text={jurisdictionConfig.legalNotice}
          icon="shield"
        />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.usAcceptBtn}
            variant="primary"
            fullWidth
            onClick={onAccept}
          />
          <Button
            label={COPY_TEXT.consentRejectBtn}
            variant="secondary"
            fullWidth
            onClick={onRejectAll}
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

export default ConsentUS;
