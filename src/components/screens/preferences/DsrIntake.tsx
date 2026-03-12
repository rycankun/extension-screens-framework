/**
 * DsrIntake — Data Subject Request Form Screen
 *
 * Screen component (screens/preferences). Jurisdiction-adaptive data
 * subject request form matching the predecessor dsr-intake.html layout exactly:
 *
 *   1. Custom header: BackArrow + host-site logo + close button
 *   2. Text block: inline spans — bold headline + regular body (jurisdiction-adaptive)
 *   3. Fieldset with radio group — each radio has TITLE + DESCRIPTION (two lines per option)
 *   4. Email input for identity verification (sr-only label)
 *   5. Trust signal micro text: star SVG + identity verification reassurance
 *   6. Response time notice: clock SVG + jurisdiction-specific response time
 *   7. Submit button: "Submit Request" (DISABLED until selection + email filled)
 *   8. Disclaimer micro text
 *   9. PoweredBadge footer
 *
 * EU shows "Object to Processing" instead of "Opt-Out of Sale / Sharing".
 * Radio labels rendered as custom markup (title + description) rather than
 * using the Radio atom, which only supports single-line labels.
 *
 * @see docs/PRD.md § 4.3 — DsrIntake specification
 * @see src/constants/preferences.ts — DSR_* constants
 */
import React, { useState } from 'react';
import { BannerShell } from '../../organisms/BannerShell/BannerShell';
import { BackArrow } from '../../molecules/BackArrow/BackArrow';
import { PoweredBadge } from '../../molecules/PoweredBadge/PoweredBadge';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';
import {
  DSR_HEADLINES,
  DSR_BODY,
  DSR_REQUEST_TYPES,
  DSR_EU_OBJECT,
  DSR_EMAIL_PLACEHOLDER,
  DSR_RESPONSE_TIME,
  DSR_RESPONSE_NOTICE_PREFIX,
  DSR_SUBMIT_BTN,
  DSR_DISCLAIMER,
  DSR_TRUST_SIGNAL,
} from '../../../constants/preferences';
import styles from './DsrIntake.module.css';

/* ── Constants ── */

/** Default host site logo for the StreamVault demo context */
const DEFAULT_LOGO_SRC = '/assets/StreamVault-BrandLockup-Primary.svg';
const DEFAULT_LOGO_ALT = 'StreamVault';

/* ── Props ── */

export interface DsrIntakeProps {
  /** Theme variant for Figma export */
  theme?: 'light' | 'dark';
  /** Jurisdiction determines headline, body text, response time, and available options */
  jurisdiction?: 'eu' | 'ca' | 'generic';
  /** Pre-selected request type key (access, delete, correct, portability, optout) */
  selectedRequest?: string;
  /** Pre-filled email address value */
  email?: string;
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Callback when the back arrow is clicked (returns to previous screen) */
  onBack?: () => void;
  /** Callback when Submit Request is clicked */
  onSubmit?: () => void;
}

/* ── Component ── */

export function DsrIntake({
  theme = 'light',
  jurisdiction = 'generic',
  selectedRequest = '',
  email = '',
  onClose,
  onBack,
  onSubmit,
}: DsrIntakeProps) {
  const [selected, setSelected] = useState(selectedRequest);
  const [emailValue, setEmailValue] = useState(email);

  /* Build the request type options based on jurisdiction.
     EU: replace "Opt-Out of Sale / Sharing" with "Object to Processing". */
  const options = Object.entries(DSR_REQUEST_TYPES).map(([key, value]) => ({
    key,
    title: jurisdiction === 'eu' && key === 'optout' ? DSR_EU_OBJECT.title : value.title,
    description: jurisdiction === 'eu' && key === 'optout' ? DSR_EU_OBJECT.description : value.description,
  }));

  /* Submit disabled until both a request type is selected AND email is filled */
  const isSubmitDisabled = !selected || !emailValue.trim();

  return (
    <div data-theme={theme}>
      <BannerShell
        ariaLabel={SCREEN_TITLES[SCREENS.DSR_INTAKE]}
        screenId={SCREENS.DSR_INTAKE}
      >
        {/* ── Header with Back Arrow ──
            Custom header: BackArrow + logo on the left, close button on the right.
            Matches predecessor .logo > .logo-left + .close-btn layout. */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <BackArrow onClick={onBack} />
            <img
              className={styles.logoImg}
              src={DEFAULT_LOGO_SRC}
              alt={DEFAULT_LOGO_ALT}
            />
          </div>
          <button
            className={styles.closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close data request form"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Text Block ──
            Bold headline + regular body as inline spans.
            Jurisdiction determines both headline and body copy. */}
        <div className={styles.textBlock}>
          <span className={styles.bold}>{DSR_HEADLINES[jurisdiction]}</span>{' '}
          <span className={styles.regular}>{DSR_BODY[jurisdiction]}</span>
        </div>

        {/* ── Request Type Radio Group ──
            Custom radio markup with two-line labels (title + description).
            The Radio atom only supports single-line labels, so we render
            custom radio controls here to match the predecessor exactly. */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.srOnly}>Select a request type</legend>
          {options.map(({ key, title, description }) => (
            <label key={key} className={styles.radioLabel} htmlFor={`dsr-${key}`}>
              <input
                type="radio"
                className={styles.radioInput}
                id={`dsr-${key}`}
                name="dsrType"
                value={key}
                checked={selected === key}
                onChange={() => setSelected(key)}
              />
              <span className={styles.radioControl} aria-hidden="true">
                <span className={styles.radioDot} />
              </span>
              <span className={styles.radioText}>
                <span className={styles.radioTitle}>{title}</span>
                <span className={styles.radioDesc}>{description}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {/* ── Email Input ──
            Identity verification email. Screen-reader-only label + placeholder. */}
        <label htmlFor="dsrEmailInput" className={styles.srOnly}>
          Email for identity verification
        </label>
        <Input
          type="email"
          placeholder={DSR_EMAIL_PLACEHOLDER}
          value={emailValue}
          onChange={setEmailValue}
          ariaLabel={DSR_EMAIL_PLACEHOLDER}
          name="dsrEmail"
        />

        {/* ── Trust Signal Micro Text ──
            Star icon + "We'll verify your identity before processing your request."
            Provides reassurance below the email input. */}
        <div className={styles.trustSignal}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={styles.trustSignalIcon}
          >
            <path
              d="M6 1L7 3.5H9.5L7.5 5.5L8.5 8L6 6.5L3.5 8L4.5 5.5L2.5 3.5H5L6 1Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
          {DSR_TRUST_SIGNAL}
        </div>

        {/* ── Response Time Notice ──
            Clock icon + jurisdiction-specific response time.
            Background pill/box with subtle surface color. */}
        <div className={styles.responseNotice}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={styles.responseNoticeIcon}
          >
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <polyline points="6,3 6,6 8,7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            {DSR_RESPONSE_NOTICE_PREFIX}{' '}
            <strong>{DSR_RESPONSE_TIME[jurisdiction]}</strong>{' '}
            as required by law.
          </span>
        </div>

        {/* ── Submit Button ──
            Disabled until both a request type is selected and email is filled. */}
        <div className={styles.actions}>
          <Button
            label={DSR_SUBMIT_BTN}
            variant="primary"
            fullWidth
            disabled={isSubmitDisabled}
            onClick={onSubmit}
            ariaLabel="Submit data subject request"
          />
        </div>

        {/* ── Disclaimer ──
            Micro text about who processes the request. */}
        <p className={styles.disclaimer}>
          {DSR_DISCLAIMER}
        </p>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <PoweredBadge />
        </div>
      </BannerShell>
    </div>
  );
}

export default DsrIntake;
