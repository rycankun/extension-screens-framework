/**
 * CookiePrefs — Cookie & Shared Data Preferences Screen
 *
 * Screen component (screens/preferences). The most complex screen in
 * the library — features a two-tab interface (Cookies / Shared Data)
 * with toggle controls per category. Each tab has its own set of
 * toggles with different label/sublabel text.
 *
 * Cookies tab: Essential (locked ON), Analytics, Marketing toggles.
 * Shared Data tab: Email, DOB, Age toggles with on/off sublabels
 * from SHARED_COPY constant.
 *
 * @see docs/PRD.md § 4.3 — CookiePrefs specification
 * @see src/constants/variants.ts — COPY_TEXT + SHARED_COPY for text
 * @see src/constants/consent.ts — CONSENT_CATEGORIES for toggle labels
 * @see src/constants/preferences.ts — COOKIE_TABS, SHARED_DATA_LABELS
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { ConsentToggle } from '../../molecules/ConsentToggle/ConsentToggle';
import { ToggleRow } from '../../molecules/ToggleRow/ToggleRow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider/Divider';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT, SHARED_COPY } from '../../../constants/variants';
import { CONSENT_CATEGORIES } from '../../../constants/consent';
import { COOKIE_TABS, SHARED_DATA_LABELS } from '../../../constants/preferences';
import styles from './CookiePrefs.module.css';

/* ── Props ── */

export interface CookiePrefsProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Which tab is active on render */
  activeTab?: 'cookies' | 'sharedData';
  /** Whether the Shared Data tab is available */
  showSharedData?: boolean;
  /** Initial analytics toggle state */
  analyticsOn?: boolean;
  /** Initial marketing toggle state */
  marketingOn?: boolean;
  /** Initial email sharing state */
  emailShared?: boolean;
  /** Initial DOB sharing state */
  dobShared?: boolean;
  /** Initial age sharing state */
  ageShared?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Save Preferences is clicked */
  onSave?: () => void;
}

/* ── Component ── */

export function CookiePrefs({
  theme = 'light',
  activeTab: initialTab = 'cookies',
  showSharedData = true,
  analyticsOn = false,
  marketingOn = false,
  emailShared = false,
  dobShared = false,
  ageShared = false,
  onClose,
  onSave,
}: CookiePrefsProps) {
  const [tab, setTab] = useState<'cookies' | 'sharedData'>(initialTab);
  const [analytics, setAnalytics] = useState(analyticsOn);
  const [marketing, setMarketing] = useState(marketingOn);
  const [email, setEmail] = useState(emailShared);
  const [dob, setDob] = useState(dobShared);
  const [age, setAge] = useState(ageShared);

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.COOKIE_PREFS]}
        screenId={SCREENS.COOKIE_PREFS}
      >
        {/* ── Header ── */}
        <DialogHeader
          title={SCREEN_TITLES[SCREENS.COOKIE_PREFS]}
          onClose={onClose}
        />

        {/* ── Tab Bar ── */}
        <div className={styles.tabBar} role="tablist">
          <button
            className={`${styles.tab} ${tab === 'cookies' ? styles.tabActive : ''}`}
            role="tab"
            aria-selected={tab === 'cookies'}
            onClick={() => setTab('cookies')}
            type="button"
          >
            {COOKIE_TABS.COOKIES}
          </button>
          {showSharedData && (
            <button
              className={`${styles.tab} ${tab === 'sharedData' ? styles.tabActive : ''}`}
              role="tab"
              aria-selected={tab === 'sharedData'}
              onClick={() => setTab('sharedData')}
              type="button"
            >
              {COOKIE_TABS.SHARED_DATA}
            </button>
          )}
        </div>

        <Divider spacing="sm" />

        {/* ── Cookies Tab ── */}
        {tab === 'cookies' && (
          <div role="tabpanel" aria-label={COOKIE_TABS.COOKIES}>
            {/* ── Trust Line ── */}
            <p className={styles.trustLine}>
              {COPY_TEXT.cookieTrustLine}
            </p>

            {/* ── Toggle Rows ── */}
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
              <ConsentToggle
                label={CONSENT_CATEGORIES.marketing.label}
                sublabel={CONSENT_CATEGORIES.marketing.sublabel}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
          </div>
        )}

        {/* ── Shared Data Tab ── */}
        {tab === 'sharedData' && (
          <div role="tabpanel" aria-label={COOKIE_TABS.SHARED_DATA}>
            {/* ── Headline + Description ── */}
            <div className={styles.content}>
              <h2 className={styles.headline}>
                {COPY_TEXT.sharedDataHeadline}
              </h2>
              <p className={styles.trustLine}>
                {COPY_TEXT.sharedDataTrustLine}
              </p>
              <p className={styles.body}>
                {COPY_TEXT.sharedDataDesc}
              </p>
            </div>

            {/* ── Toggle Rows ── */}
            <div className={styles.toggles}>
              <ToggleRow
                label={SHARED_DATA_LABELS.email}
                sublabel={email ? SHARED_COPY.email.on : SHARED_COPY.email.off}
                checked={email}
                onChange={setEmail}
              />
              <ToggleRow
                label={SHARED_DATA_LABELS.dob}
                sublabel={dob ? SHARED_COPY.dob.on : SHARED_COPY.dob.off}
                checked={dob}
                onChange={setDob}
              />
              <ToggleRow
                label={SHARED_DATA_LABELS.age}
                sublabel={age ? SHARED_COPY.age.on : SHARED_COPY.age.off}
                checked={age}
                onChange={setAge}
              />
            </div>
          </div>
        )}

        <Divider spacing="sm" />

        {/* ── Save Button ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.cookieSaveBtn}
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

export default CookiePrefs;
