/**
 * DsrIntake — Data Subject Request Form Screen
 *
 * Screen component (screens/preferences). Jurisdiction-adaptive data
 * subject request form. Headlines and body text change based on
 * jurisdiction (EU/CA/Generic US). EU shows "Object to Processing"
 * instead of "Opt-Out of Sale / Sharing". Radio buttons let the user
 * select a request type before submitting.
 *
 * @see docs/PRD.md § 4.3 — DsrIntake specification
 * @see src/constants/preferences.ts — DSR_* constants
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Radio } from '../../atoms/Radio/Radio';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  DSR_HEADLINES,
  DSR_BODY,
  DSR_REQUEST_TYPES,
  DSR_EU_OBJECT,
  DSR_SUBMIT_BTN,
} from '../../../constants/preferences';
import styles from './DsrIntake.module.css';

/* ── Props ── */

export interface DsrIntakeProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Jurisdiction determines headline, body text, and available options */
  jurisdiction?: 'eu' | 'ca' | 'generic';
  /** Pre-selected request type */
  selectedRequest?: string;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Submit Request is clicked */
  onSubmit?: () => void;
}

/* ── Helpers ── */

/** Radio group name for request type selection */
const RADIO_GROUP = 'dsr-request-type';

/* ── Component ── */

export function DsrIntake({
  theme = 'light',
  jurisdiction = 'generic',
  selectedRequest = '',
  onClose,
  onSubmit,
}: DsrIntakeProps) {
  const [selected, setSelected] = useState(selectedRequest);

  /* Build the request type options based on jurisdiction */
  const options = Object.entries(DSR_REQUEST_TYPES).map(([key, label]) => ({
    key,
    /* EU: replace "Opt-Out of Sale / Sharing" with "Object to Processing" */
    label: jurisdiction === 'eu' && key === 'optout' ? DSR_EU_OBJECT : label,
  }));

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.DSR_INTAKE]}
        screenId={SCREENS.DSR_INTAKE}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.DSR_INTAKE]}
          onClose={onClose}
        />

        {/* ── Headline + Body ── */}
        <div className={styles.content}>
          <h2 className={styles.headline}>
            {DSR_HEADLINES[jurisdiction]}
          </h2>
          <p className={styles.body}>
            {DSR_BODY[jurisdiction]}
          </p>
        </div>

        <Divider spacing="sm" />

        {/* ── Request Type Radios ── */}
        <fieldset className={styles.fieldset}>
          <div className={styles.radioGroup} role="radiogroup" aria-label={SCREEN_TITLES[SCREENS.DSR_INTAKE]}>
            {options.map(({ key, label }) => (
              <Radio
                key={key}
                name={RADIO_GROUP}
                value={key}
                label={label}
                checked={selected === key}
                onChange={() => setSelected(key)}
              />
            ))}
          </div>
        </fieldset>

        <Divider spacing="sm" />

        {/* ── Submit Button ── */}
        <div className={styles.actions}>
          <Button
            label={DSR_SUBMIT_BTN}
            variant="primary"
            fullWidth
            onClick={onSubmit}
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

export default DsrIntake;
