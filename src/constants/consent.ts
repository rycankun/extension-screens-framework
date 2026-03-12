/**
 * Consent Constants — TrustID Extension Screen Library
 *
 * Consent toggle category labels, sublabels, info text, and badge labels
 * shared across all three consent screens (EU, US Strict, US Standard).
 * Extracted here so no screen component hardcodes these strings.
 *
 * @see src/components/screens/consent/ — all three consent screens
 * @see DIRECTIVES.md § 8.1 — no hardcoded strings in components
 */

/* ── Consent Toggle Categories ── */

/** Labels and sublabels for the three consent toggle categories */
export const CONSENT_CATEGORIES = {
  essential: {
    /** Toggle label for essential/required cookies */
    label: 'Essential',
    /** Toggle sublabel explaining essential cookies */
    sublabel: 'Required for the site to function properly.',
    /** Info tooltip text for essential cookies */
    info: 'These cookies are necessary for the website to function and cannot be switched off.',
  },
  analytics: {
    /** Toggle label for analytics cookies */
    label: 'Analytics',
    /** Toggle sublabel explaining analytics cookies */
    sublabel: 'Help us understand how visitors interact with the site.',
    /** Info tooltip text for analytics cookies */
    info: 'These cookies allow us to count visits and traffic sources to measure and improve performance.',
  },
  marketing: {
    /** Toggle label for marketing/advertising cookies */
    label: 'Marketing',
    /** Toggle sublabel explaining marketing cookies */
    sublabel: 'Used to deliver relevant advertisements.',
    /** Info tooltip text for marketing cookies */
    info: 'These cookies may be set through our site by our advertising partners.',
  },
} as const;

/* ── Signal Detection Badge Labels ── */

/** Badge label text for privacy signal detection indicators */
export const SIGNAL_BADGES = {
  /** Global Privacy Control signal detected */
  GPC: 'GPC Signal Detected',
  /** Do Not Track signal detected */
  DNT: 'DNT Signal Detected',
} as const;

/* ── State-Specific Notices ── */

/** CT minor advertising ban notice (CTDPA) */
export const CT_MINOR_BAN_NOTICE =
  'Under Connecticut law (CTDPA), advertising and personalization targeting minors under 18 is prohibited.';

/** CT minor ban badge label */
export const CT_MINOR_BAN_BADGE = 'CT Minor Ban';
