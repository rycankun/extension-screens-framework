/**
 * CookiePrefs — Cookie & Shared Data Preferences Screen
 *
 * Screen component (screens/preferences). The most complex screen in
 * the library — features a two-tab interface (Cookies / Shared Data)
 * with toggle controls per category. Matches the predecessor
 * cookie-prefs.html pixel-for-pixel.
 *
 * Cookies tab: 4 toggle rows (Essential locked, Performance & Analytics,
 * Personalization, Advertising) — each with an expandable <details>
 * section listing individual cookies. Optional NH profiling opt-out row.
 *
 * Shared Data tab: 3 toggle rows (Age Verification, Email Address,
 * Date of Birth) with on/off sublabels, expiry dates, and edit controls.
 *
 * Additional elements:
 * - Shared Data intro text block (visible when Shared Data tab active)
 * - Trust line ("Your preferences. Your control.")
 * - "You can update these anytime..." micro text below Save button
 * - Withdraw All Consent button (hidden by default, shown on re-entry)
 * - Fine-print block (DNS link, privacy choices, retention notice)
 * - PoweredBadge footer
 *
 * @see docs/PRD.md § 4.3 — CookiePrefs specification
 * @see src/constants/variants.ts — COPY_TEXT + SHARED_COPY for text
 * @see src/constants/consent.ts — CONSENT_CATEGORIES for toggle labels
 * @see src/constants/preferences.ts — COOKIE_TABS, SHARED_DATA_LABELS, fine-print text
 * @see src/constants/cookies.ts — Cookie entries and sublabels per category
 */
import React, { useState, useCallback, useId } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { DialogHeader } from '../../molecules/DialogHeader/DialogHeader';
import { ConsentToggle } from '../../molecules/ConsentToggle/ConsentToggle';
import { ToggleRow } from '../../molecules/ToggleRow/ToggleRow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import { COPY_TEXT, SHARED_COPY } from '../../../constants/variants';
import { CONSENT_CATEGORIES } from '../../../constants/consent';
import {
  COOKIE_TABS,
  SHARED_DATA_LABELS,
  NH_PROFILING_LABEL,
  NH_PROFILING_SUBLABEL,
  WITHDRAW_CONSENT_LABEL,
  FINE_PRINT_DNS,
  FINE_PRINT_PRIVACY_CHOICES,
  FINE_PRINT_RIGHT_TO_KNOW,
  FINE_PRINT_CONSENT_RECEIPT,
  FINE_PRINT_SAVE_SCOPE,
  FINE_PRINT_RETENTION,
} from '../../../constants/preferences';
import {
  ESSENTIAL_COOKIES,
  ANALYTICS_COOKIES,
  PERSONALIZATION_COOKIES,
  ADVERTISING_COOKIES,
  ESSENTIAL_SUBLABEL,
  ANALYTICS_SUBLABEL,
  PERSONALIZATION_SUBLABEL,
  ADVERTISING_SUBLABEL,
  VIEW_COOKIES_SUMMARY,
  COOKIE_UPDATE_HINT,
  type CookieEntry,
} from '../../../constants/cookies';
import styles from './CookiePrefs.module.css';

/* ── Props ── */

export interface CookiePrefsProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Which tab is active on render */
  activeTab?: 'cookies' | 'sharedData';
  /** Whether the Shared Data tab is available (hidden until TrustID verification) */
  showSharedData?: boolean;
  /** Initial analytics toggle state */
  analyticsOn?: boolean;
  /** Initial personalization toggle state */
  personalizationOn?: boolean;
  /** Initial marketing/advertising toggle state */
  marketingOn?: boolean;
  /** Whether to show NH SB 255 profiling opt-out row */
  showNhProfiling?: boolean;
  /** Initial NH profiling opt-out toggle state */
  nhProfilingOn?: boolean;
  /** Initial email sharing state */
  emailShared?: boolean;
  /** Initial DOB sharing state */
  dobShared?: boolean;
  /** Initial age sharing state */
  ageShared?: boolean;
  /** Whether to show Withdraw All Consent button (shown on re-entry) */
  showWithdrawConsent?: boolean;
  /** Whether to show the privacy choices link (opt-out states) */
  showPrivacyChoices?: boolean;
  /** Whether to show the right-to-know link (T2 states) */
  showRightToKnow?: boolean;
  /** Whether to show the consent receipt link (after consent given) */
  showConsentReceipt?: boolean;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Callback when Save Preferences is clicked */
  onSave?: () => void;
  /** Callback when Withdraw All Consent is clicked */
  onWithdrawConsent?: () => void;
}

/* ── Subcomponent: CookieDetailList ──
   Expandable <details> section listing individual cookies for a category.
   Matches predecessor's .toggle-info > details > summary + ul structure. */

function CookieDetailList({ cookies }: { cookies: CookieEntry[] }) {
  return (
    <details className={styles.cookieDetails}>
      <summary className={styles.cookieSummary}>
        {VIEW_COOKIES_SUMMARY}
      </summary>
      <ul className={styles.cookieList}>
        {cookies.map((cookie) => (
          <li key={cookie.name} className={styles.cookieItem}>
            <span className={styles.cookieName}>{cookie.name}</span>
            {' — '}
            <span className={styles.cookieDesc}>{cookie.description}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ── Component ── */

export function CookiePrefs({
  theme = 'light',
  activeTab: initialTab = 'cookies',
  showSharedData = true,
  analyticsOn = false,
  personalizationOn = false,
  marketingOn = false,
  showNhProfiling = false,
  nhProfilingOn = false,
  emailShared = false,
  dobShared = false,
  ageShared = false,
  showWithdrawConsent = false,
  showPrivacyChoices = false,
  showRightToKnow = false,
  showConsentReceipt = false,
  onClose,
  onSave,
  onWithdrawConsent,
}: CookiePrefsProps) {
  const [tab, setTab] = useState<'cookies' | 'sharedData'>(initialTab);
  const [analytics, setAnalytics] = useState(analyticsOn);
  const [personalization, setPersonalization] = useState(personalizationOn);
  const [marketing, setMarketing] = useState(marketingOn);
  const [nhProfiling, setNhProfiling] = useState(nhProfilingOn);
  const [email, setEmail] = useState(emailShared);
  const [dob, setDob] = useState(dobShared);
  const [age, setAge] = useState(ageShared);
  const tabPanelId = useId();
  const cookiesTabId = useId();
  const sharedTabId = useId();

  /* WCAG: Arrow key navigation between tabs per WAI-ARIA tablist pattern */
  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setTab((prev) => (prev === 'cookies' ? 'sharedData' : 'cookies'));
      }
    },
    [],
  );

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.COOKIE_PREFS]}
        screenId={SCREENS.COOKIE_PREFS}
      >
        {/* ── Header ──
            Logo + close button, NO back arrow (predecessor pattern). */}
        <DialogHeader onClose={onClose} />

        {/* ── Shared Data Intro Text ──
            Shown only when the Shared Data tab is active. Predecessor uses
            inline spans: bold headline + regular description. */}
        {tab === 'sharedData' && (
          <div className={styles.introBlock}>
            <span className={styles.introBold}>
              {COPY_TEXT.sharedDataHeadline}
            </span>{' '}
            <span className={styles.introRegular}>
              {COPY_TEXT.sharedDataDesc}
            </span>
          </div>
        )}

        {/* ── Trust Line ──
            Brand blue motivational tagline, always visible.
            Cookies tab: "Your preferences. Your control."
            Shared Data tab: "Your data. Your decision." */}
        <p className={styles.trustLine}>
          {tab === 'cookies'
            ? COPY_TEXT.cookieTrustLine
            : COPY_TEXT.sharedDataTrustLine}
        </p>

        {/* ── Tab Bar ──
            "Cookies" | "Shared Data" tabs. Shared Data hidden until
            TrustID verification (showSharedData prop). */}
        <div className={styles.tabBar} role="tablist" onKeyDown={handleTabKeyDown}>
          <button
            id={cookiesTabId}
            className={`${styles.tab} ${tab === 'cookies' ? styles.tabActive : ''}`}
            role="tab"
            aria-selected={tab === 'cookies'}
            aria-controls={tab === 'cookies' ? tabPanelId : undefined}
            tabIndex={tab === 'cookies' ? 0 : -1}
            onClick={() => setTab('cookies')}
            type="button"
          >
            {COOKIE_TABS.COOKIES}
          </button>
          {showSharedData && (
            <button
              id={sharedTabId}
              className={`${styles.tab} ${tab === 'sharedData' ? styles.tabActive : ''}`}
              role="tab"
              aria-selected={tab === 'sharedData'}
              aria-controls={tab === 'sharedData' ? tabPanelId : undefined}
              tabIndex={tab === 'sharedData' ? 0 : -1}
              onClick={() => setTab('sharedData')}
              type="button"
            >
              {COOKIE_TABS.SHARED_DATA}
            </button>
          )}
        </div>

        {/* ── Cookies Tab ── */}
        {tab === 'cookies' && (
          <div id={tabPanelId} role="tabpanel" aria-labelledby={cookiesTabId}>
            {/* ── Toggle Rows ──
                4 categories: Essential (locked ON), Performance & Analytics,
                Personalization, Advertising. Each has a toggle + sublabel +
                expandable cookie details list. */}
            <div className={styles.toggles}>

              {/* ── Essential (locked) ── */}
              <div className={styles.toggleBlock}>
                <ConsentToggle
                  label={CONSENT_CATEGORIES.essential.label}
                  sublabel={ESSENTIAL_SUBLABEL}
                  checked={true}
                  onChange={() => {}}
                  locked={true}
                />
                <CookieDetailList cookies={ESSENTIAL_COOKIES} />
              </div>

              {/* ── Performance & Analytics ── */}
              <div className={styles.toggleBlock}>
                <ConsentToggle
                  label={CONSENT_CATEGORIES.analytics.label}
                  sublabel={ANALYTICS_SUBLABEL}
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CookieDetailList cookies={ANALYTICS_COOKIES} />
              </div>

              {/* ── Personalization ── */}
              <div className={styles.toggleBlock}>
                <ConsentToggle
                  label={CONSENT_CATEGORIES.personalization.label}
                  sublabel={PERSONALIZATION_SUBLABEL}
                  checked={personalization}
                  onChange={setPersonalization}
                />
                <CookieDetailList cookies={PERSONALIZATION_COOKIES} />
              </div>

              {/* ── Advertising ── */}
              <div className={styles.toggleBlock}>
                <ConsentToggle
                  label={CONSENT_CATEGORIES.marketing.label}
                  sublabel={ADVERTISING_SUBLABEL}
                  checked={marketing}
                  onChange={setMarketing}
                />
                <CookieDetailList cookies={ADVERTISING_COOKIES} />
              </div>

              {/* ── NH SB 255 Profiling Opt-Out ──
                  Shown only for NH jurisdiction. Separate toggle row
                  for automated decision-making opt-out. */}
              {showNhProfiling && (
                <div className={styles.toggleBlock}>
                  <ConsentToggle
                    label={NH_PROFILING_LABEL}
                    sublabel={NH_PROFILING_SUBLABEL}
                    checked={nhProfiling}
                    onChange={setNhProfiling}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Shared Data Tab ── */}
        {tab === 'sharedData' && (
          <div id={tabPanelId} role="tabpanel" aria-labelledby={sharedTabId}>
            {/* ── Toggle Rows ──
                3 shared data items: Age Verification, Email Address,
                Date of Birth. Each has on/off sublabels from SHARED_COPY. */}
            <div className={styles.toggles}>
              <ToggleRow
                label={SHARED_DATA_LABELS.age}
                sublabel={age ? SHARED_COPY.age.on : SHARED_COPY.age.off}
                checked={age}
                onChange={setAge}
              />
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
            </div>
          </div>
        )}

        {/* ── Save Button ── */}
        <div className={styles.actions}>
          <Button
            label={COPY_TEXT.cookieSaveBtn}
            variant="primary"
            fullWidth
            onClick={onSave}
          />
        </div>

        {/* ── Micro Text ──
            "You can update these anytime by clicking the Trust ID icon." */}
        <p className={styles.microText}>
          {COOKIE_UPDATE_HINT}
        </p>

        {/* ── Withdraw All Consent ──
            Hidden by default. Shown on re-entry (GDPR Art. 7(3)). */}
        {showWithdrawConsent && (
          <div className={styles.withdrawAction}>
            <Button
              label={WITHDRAW_CONSENT_LABEL}
              variant="secondary"
              fullWidth
              onClick={onWithdrawConsent}
            />
          </div>
        )}

        {/* ── Fine Print Block ──
            Legal links and disclosure text. Visibility of individual
            items is controlled by props matching jurisdiction rules. */}
        <div className={styles.finePrint}>
          {/* DNS link — always visible */}
          <a
            className={styles.finePrintLink}
            href="#dns"
            aria-label={FINE_PRINT_DNS}
          >
            {FINE_PRINT_DNS}
          </a>

          {/* Privacy Choices link — shown for opt-out states */}
          {showPrivacyChoices && (
            <a
              className={styles.finePrintLink}
              href="#privacy-choices"
              aria-label={FINE_PRINT_PRIVACY_CHOICES}
            >
              {FINE_PRINT_PRIVACY_CHOICES}
            </a>
          )}

          {/* Right to Know link — shown for T2 states */}
          {showRightToKnow && (
            <a
              className={styles.finePrintLink}
              href="#right-to-know"
              aria-label={FINE_PRINT_RIGHT_TO_KNOW}
            >
              {FINE_PRINT_RIGHT_TO_KNOW}
            </a>
          )}

          {/* Consent Receipt link — shown after consent given */}
          {showConsentReceipt && (
            <a
              className={styles.finePrintLink}
              href="#consent-receipt"
              aria-label={FINE_PRINT_CONSENT_RECEIPT}
            >
              {FINE_PRINT_CONSENT_RECEIPT}
            </a>
          )}

          {/* Save scope hint */}
          <p className={styles.finePrintText}>
            {FINE_PRINT_SAVE_SCOPE}
          </p>

          {/* Retention notice */}
          <p className={styles.finePrintText}>
            {FINE_PRINT_RETENTION}
          </p>
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
