/**
 * Consent Constants — TrustID Extension Screen Library
 *
 * All text strings, labels, and legal copy for the three consent screens
 * (EU, US Strict, US Standard). Extracted here so no screen component
 * hardcodes these strings.
 *
 * Predecessor ref: consent-t1.html, consent-t2.html, consent-t3.html
 *
 * @see src/components/screens/consent/ — all three consent screens
 * @see DIRECTIVES.md § 8.1 — no hardcoded strings in components
 */

/* ── Consent Toggle Categories ──
   Used by cookie-prefs screen (NOT consent screens).
   Consent screens show text blocks + buttons, not toggles. */

/** Labels and sublabels for the consent toggle categories */
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
    label: 'Performance & Analytics',
    /** Toggle sublabel explaining analytics cookies */
    sublabel: 'Help us understand how visitors interact with the site.',
    /** Info tooltip text for analytics cookies */
    info: 'These cookies allow us to count visits and traffic sources to measure and improve performance.',
  },
  personalization: {
    /** Toggle label for personalization cookies */
    label: 'Personalization',
    /** Toggle sublabel explaining personalization cookies */
    sublabel: 'Allow us to remember your preferences.',
    /** Info tooltip text for personalization cookies */
    info: 'These cookies enable the website to provide enhanced functionality and personalization.',
  },
  marketing: {
    /** Toggle label for marketing/advertising cookies */
    label: 'Advertising',
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

/* ── Consent Screen Body Text ──
   The main text block shown on each consent screen. Contains
   a bold headline followed by regular body text with inline
   policy links. Split into segments for React rendering. */

/** EU consent body text (regular paragraph after bold headline) */
export const EU_CONSENT_BODY =
  'Essential cookies operate under our legitimate interest to run the site. All other cookies — used to remember your preferences, build interest profiles, and serve ads — require your consent. Choose below — or review our';

/** US strict consent body text */
export const US_CONSENT_BODY =
  'We use them to run the site, personalize your experience, and serve ads. Some data may be sold or shared with partners. Opt out or manage choices below — or review our';

/** US standard consent body text */
export const US_STD_CONSENT_BODY =
  'We use them to run the site, personalize your experience, and serve targeted ads. You can opt out of targeted advertising or manage your preferences below. Review our';

/* ── Policy Link Labels ── */

export const POLICY_LINKS = {
  /** Privacy Policy link text */
  privacy: 'Privacy Policy',
  /** Cookie Policy link text */
  cookie: 'Cookie Policy',
  /** Terms of Service link text */
  terms: 'Terms',
} as const;

/** Default policy link URLs (StreamVault demo) */
export const POLICY_URLS = {
  privacy: '../streamvault-privacy.html',
  cookie: '../streamvault-cookie-policy.html',
  terms: '../streamvault-terms.html',
} as const;

/* ── GPC Indicator Text ── */

/** GPC signal indicator main text */
export const GPC_TEXT =
  'Global Privacy Control detected — your opt-out preference is active.';

/** GPC signal indicator detail text */
export const GPC_DETAIL =
  'Sale/sharing of personal data: disabled · Targeted advertising: opted out · Sensitive personal information: limited use';

/* ── DNT Indicator Text ── */

/** DNT signal indicator text */
export const DNT_TEXT =
  'Do Not Track signal detected — your tracking preferences are respected.';

/* ── Social Proof Text ── */

/** Social proof trust signal text (split for bold rendering) */
export const SOCIAL_PROOF_TEXT = {
  prefix: 'End-to-end encrypted · ',
  boldItems: ['No data stored', 'No tracking'],
} as const;

/* ── Universal Opt-Out Disclosure ── */

/** Universal opt-out mechanism disclosure text (required by CPA §6-1-1313) */
export const UNIVERSAL_OPTOUT_TEXT =
  'We honor Global Privacy Control and other universal opt-out signals.';

/* ── Privacy Choices Links (US Strict — consent-t2) ── */

/** Privacy choices link labels and URLs for US strict states */
export const US_PRIVACY_CHOICES = {
  /** CCPA §1798.135(a) — Do Not Sell or Share */
  dns: {
    label: 'Do Not Sell or Share My Personal Information',
    url: '../streamvault-privacy.html#your-rights',
    ariaLabel: 'Opt out of the sale or sharing of your personal information',
  },
  /** CPA §6-1-1313 / OCPA — Targeted advertising opt-out */
  targetedAds: {
    label: 'Opt Out of Targeted Advertising',
    url: '../streamvault-privacy.html#targeted-advertising',
    ariaLabel: 'Opt out of targeted advertising',
  },
  /** CPRA §1798.121 — Limit sensitive PI */
  sensitivePI: {
    label: 'Limit Use of My Sensitive Personal Information',
    url: '../streamvault-privacy.html#sensitive-data',
    ariaLabel: 'Limit the use of your sensitive personal information',
  },
  /** CCPA §1798.110 — Right to Know / Request Data */
  requestData: {
    label: 'Request My Data',
    ariaLabel: 'Request access to your personal data',
  },
  /** CCPA §1798.125 — Financial Incentive Disclosure */
  financialIncentive: {
    label: 'Notice of Financial Incentive',
    url: '../streamvault-privacy.html#financial-incentives',
    ariaLabel: 'View notice of financial incentive programs',
  },
} as const;

/* ── Privacy Choices Links (US Standard — consent-t3) ── */

/** Privacy choices link labels and URLs for US standard states */
export const US_STD_PRIVACY_CHOICES = {
  /** VCDPA §59.1-580 — Privacy Choices */
  privacyChoices: {
    label: 'Your Privacy Choices',
    url: '../streamvault-privacy.html#your-rights',
    ariaLabel: 'Learn about your privacy rights and opt out of targeted advertising',
  },
  /** DNS opt-out — covers DPDPA, MCDPA, etc. */
  dns: {
    label: 'Do Not Sell My Personal Information',
    url: '../streamvault-privacy.html#your-rights',
    ariaLabel: 'Opt out of the sale of your personal information',
  },
  /** Sensitive PI — covers MCDPA, SB 332, TDPSA */
  sensitivePI: {
    label: 'Limit Use of My Sensitive Personal Information',
    url: '../streamvault-privacy.html#sensitive-data',
    ariaLabel: 'Limit the use of your sensitive personal information',
  },
} as const;

/* ── Sensitive Data Notice (US Standard) ── */

/** Sensitive data notice text for US standard states */
export const SENSITIVE_DATA_NOTICE =
  'Sensitive personal information (e.g., precise geolocation, health data, biometrics) is never processed without your explicit consent. You control these categories via your privacy preferences.';
