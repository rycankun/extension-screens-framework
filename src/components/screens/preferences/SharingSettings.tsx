/**
 * SharingSettings — Credential Sharing Management Screen
 *
 * Screen component (screens/preferences). Allows users to manage which
 * credentials are shared with the current site. Each credential type
 * (Email, DOB, Age) has a toggle with dynamic on/off sublabels.
 *
 * @see docs/PRD.md § 4.3 — SharingSettings specification
 * @see src/constants/preferences.ts — SHARING_*, CREDENTIAL_LABELS
 * @see src/constants/variants.ts — SHARED_COPY for toggle sublabels
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { ToggleRow } from '../../molecules/ToggleRow/ToggleRow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { SHARED_COPY } from '../../../constants/variants';
import {
  SHARING_HEADLINE,
  SHARING_BODY,
  SHARING_SAVE_BTN,
  CREDENTIAL_LABELS,
} from '../../../constants/preferences';
import styles from './SharingSettings.module.css';

/* ── Props ── */

export interface SharingSettingsProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Initial email sharing state */
  emailShared?: boolean;
  /** Initial DOB sharing state */
  dobShared?: boolean;
  /** Initial age sharing state */
  ageShared?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Save Settings is clicked */
  onSave?: () => void;
}

/* ── Component ── */

export function SharingSettings({
  theme = 'light',
  emailShared = false,
  dobShared = false,
  ageShared = false,
  onClose,
  onSave,
}: SharingSettingsProps) {
  const [email, setEmail] = useState(emailShared);
  const [dob, setDob] = useState(dobShared);
  const [age, setAge] = useState(ageShared);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.SHARING_SETTINGS]}
        screenId={SCREENS.SHARING_SETTINGS}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.SHARING_SETTINGS]}
          onClose={onClose}
        />

        {/* ── Headline + Body ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {SHARING_HEADLINE}
          </h2>
          <p className={styles.body}>
            {SHARING_BODY}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Credential Toggles ── */}
        <div className={styles.toggles}>
          <ToggleRow
            label={CREDENTIAL_LABELS.email}
            sublabel={email ? SHARED_COPY.email.on : SHARED_COPY.email.off}
            checked={email}
            onChange={setEmail}
          />
          <ToggleRow
            label={CREDENTIAL_LABELS.dob}
            sublabel={dob ? SHARED_COPY.dob.on : SHARED_COPY.dob.off}
            checked={dob}
            onChange={setDob}
          />
          <ToggleRow
            label={CREDENTIAL_LABELS.age}
            sublabel={age ? SHARED_COPY.age.on : SHARED_COPY.age.off}
            checked={age}
            onChange={setAge}
          />
        </div>

        <Divider spacing="sm" />

        {/* ── Save Button ── */}
        <div className={styles.actions}>
          <Button
            label={SHARING_SAVE_BTN}
            variant="primary"
            fullWidth
            onClick={onSave}
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

export default SharingSettings;
