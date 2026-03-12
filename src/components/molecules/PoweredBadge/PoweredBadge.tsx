/**
 * PoweredBadge — Molecule Component
 *
 * Attribution footer displaying "Powered by Trust ID · Privacy" with
 * the TrustID Business icon. Both "Trust ID" and "Privacy" are external
 * links. Uses an <img> tag for the icon for Figma-compatible rendering.
 *
 * Predecessor ref: .footer, .footer-logo, .footer-text, .footer-link,
 * .footer-link-muted in components.css:1054-1072
 *
 * @see docs/PRD.md § 3.2 — PoweredBadge specification
 */
import React from 'react';
import styles from './PoweredBadge.module.css';

/* ── Props ── */

export interface PoweredBadgeProps {
  /** Optional CSS class for positioning */
  className?: string;
  /** URL for the TrustID Business link (default: business.trustid.life) */
  trustIdUrl?: string;
  /** URL for the Privacy link (default: privacy-policy.html) */
  privacyUrl?: string;
}

/* ── Default Values ── */
const DEFAULT_TRUST_ID_URL = 'https://business.trustid.life';
const DEFAULT_PRIVACY_URL = 'privacy-policy.html';
const ICON_SRC = '/assets/TrustIDBusiness-BrandLockup-icon.svg';

/* ── Component ── */

export function PoweredBadge({
  className,
  trustIdUrl = DEFAULT_TRUST_ID_URL,
  privacyUrl = DEFAULT_PRIVACY_URL,
}: PoweredBadgeProps) {
  return (
    <div className={`${styles.footer} ${className || ''}`}>
      {/* ── TrustID Business Icon ──
          Image-based icon for Figma-compatible rendering. Decorative
          (aria-hidden) since the text links provide context. */}
      <img
        className={styles.footerLogo}
        src={ICON_SRC}
        alt=""
        aria-hidden="true"
      />

      {/* ── Attribution Text with Links ──
          "Powered by Trust ID · Privacy" — both are external links.
          "Trust ID" links to the TrustID business site.
          "Privacy" links to the privacy policy. */}
      <div className={styles.footerText}>
        Powered by{' '}
        <a
          className={styles.footerLink}
          href={trustIdUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Learn more about Trust ID (opens in new tab)"
        >
          Trust ID
        </a>
        {' · '}
        <a
          className={styles.footerLinkMuted}
          href={privacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Privacy policy (opens in new tab)"
        >
          Privacy
        </a>
      </div>
    </div>
  );
}

export default PoweredBadge;
