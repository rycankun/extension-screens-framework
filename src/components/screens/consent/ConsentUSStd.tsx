/**
 * ConsentUSStd — US Standard-State Simplified Consent Screen
 *
 * Screen component (screens/consent). Simplified opt-out consent for
 * the ~37 US states without strict privacy laws. Fewer toggles and
 * shorter legal text compared to ConsentUS.
 *
 * Uses the same opt-out model as ConsentUS — toggles default ON.
 *
 * @see docs/PRD.md § 4.1 — ConsentUSStd specification
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
import { CONSENT_CATEGORIES, SIGNAL_BADGES } from '../../../constants/consent';
import styles from './ConsentUSStd.module.css';

/* ── Props ── */

export interface ConsentUSStdProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Whether Global Privacy Control signal is detected */
  gpcDetected?: boolean;
  /** Whether Do Not Track signal is detected */
  dntDetected?: boolean;
  /** Initial state of analytics toggle (US default: ON — opt-out model) */
  analyticsOn?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Accept & Continue is clicked */
  onAccept?: () => void;
  /** Callback when Reject All is clicked */
  onRejectAll?: () => void;
}

/* ── Component ── */

export function ConsentUSStd({
  theme = 'light',
  gpcDetected = false,
  dntDetected = false,
  analyticsOn = true,
  onClose,
  onAccept,
  onRejectAll,
}: ConsentUSStdProps) {
  const [analytics, setAnalytics] = useState(analyticsOn);

  const jurisdictionConfig = JURISDICTION_CONFIGS[JURISDICTIONS.US_STANDARD];

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.CONSENT_US_STD]}
        screenId={SCREENS.CONSENT_US_STD}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.CONSENT_US_STD]}
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
            Simplified: Essential (locked) + Analytics only.
            No marketing toggle — standard states have simpler requirements. */}
        <div className={styles.toggles}>
          <ConsentToggle
            label={CONSENT_CATEGORIES.essential.label}
            sublabel={CONSENT_CATEGORIES.essential.sublabel}
            checked={true}
            onChange={() => {}}
            locked={true}
          />
          <ConsentToggle
            label={CONSENT_CATEGORIES.analytics.label}
            sublabel={CONSENT_CATEGORIES.analytics.sublabel}
            checked={analytics}
            onChange={setAnalytics}
          />
        </div>

        <Divider spacing="sm" />

        {/* ── Legal Notice ── */}
        <LegalNotice
          text={jurisdictionConfig.legalNotice}
          icon="info"
        />

        {/* ── Action Buttons ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.usStdAcceptBtn}
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

export default ConsentUSStd;
