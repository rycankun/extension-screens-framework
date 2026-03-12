/**
 * ConsentEU — EU/GDPR Opt-In Consent Screen
 *
 * Screen component (screens/consent). Renders the GDPR-compliant consent
 * prompt with toggle controls for cookie categories. EU model requires
 * active opt-in — analytics and marketing default to OFF.
 *
 * Essential cookies are locked ON and cannot be toggled off.
 * GPC (Global Privacy Control) and DNT (Do Not Track) detection badges
 * appear conditionally via props.
 *
 * @see docs/PRD.md § 4.1 — ConsentEU specification
 * @see src/constants/variants.ts — COPY_TEXT for all screen text
 * @see src/constants/jurisdictions.ts — JURISDICTION_CONFIGS for legal text
 * @see src/constants/screens.ts — SCREEN_TITLES for ARIA labels
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
import { CONSENT_CATEGORIES, SIGNAL_BADGES } from '../../../constants/consent';
import styles from './ConsentEU.module.css';

/* ── Props ── */

export interface ConsentEUProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Whether Global Privacy Control signal is detected */
  gpcDetected?: boolean;
  /** Whether Do Not Track signal is detected */
  dntDetected?: boolean;
  /** Initial state of analytics toggle (EU default: OFF) */
  analyticsOn?: boolean;
  /** Initial state of marketing toggle (EU default: OFF) */
  marketingOn?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Accept All is clicked */
  onAcceptAll?: () => void;
  /** Callback when Reject All is clicked */
  onRejectAll?: () => void;
}

/* ── Component ── */

export function ConsentEU({
  theme = 'light',
  gpcDetected = false,
  dntDetected = false,
  analyticsOn = false,
  marketingOn = false,
  onClose,
  onAcceptAll,
  onRejectAll,
}: ConsentEUProps) {
  const [analytics, setAnalytics] = useState(analyticsOn);
  const [marketing, setMarketing] = useState(marketingOn);

  const jurisdictionConfig = JURISDICTION_CONFIGS[JURISDICTIONS.EU];

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.CONSENT_EU]}
        screenId={SCREENS.CONSENT_EU}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.CONSENT_EU]}
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
            {COPY_TEXT.consentTrustLine}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Consent Toggles ── */}
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
            sublabel={CONSENT_CATEGORIES.marketing.sublabel}
            checked={marketing}
            onChange={setMarketing}
            showInfo={true}
            infoText={CONSENT_CATEGORIES.marketing.info}
          />
        </div>

        <Divider spacing="sm" />

        {/* ── Legal Notice ── */}
        <LegalNotice
          text={jurisdictionConfig.legalNotice}
          icon="shield"
        />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.consentAcceptBtn}
            variant="primary"
            fullWidth
            onClick={onAcceptAll}
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

export default ConsentEU;
