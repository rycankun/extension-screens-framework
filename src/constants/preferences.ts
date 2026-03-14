/**
 * Preference Constants — TrustID Extension Screen Library
 *
 * Labels, tab names, button text, and descriptive copy shared across
 * the five preference screens (CookiePrefs, CookieEmail, DnsConfirm,
 * SharingSettings, DsrIntake).
 *
 * Predecessor ref: cookie-prefs.html, cookie-email.html, dns-confirm.html,
 * sharing-settings.html, dsr-intake.html
 *
 * @see src/components/screens/preferences/ — all five preference screens
 * @see DIRECTIVES.md § 8.1 — no hardcoded strings in components
 */

/* ── CookiePrefs Tabs ── */

/** Tab labels for the CookiePrefs two-tab layout */
export const COOKIE_TABS = {
  COOKIES: 'Cookies',
  SHARED_DATA: 'Shared Data',
} as const;

/* ── Shared Data Toggle Labels ── */

/** Labels for the Shared Data tab toggles in CookiePrefs */
export const SHARED_DATA_LABELS = {
  email: 'Email Address',
  dob: 'Date of Birth',
  age: 'Age Verification',
} as const;

/* ── Cookie Prefs — Fine Print ── */

/** "View cookies" expandable link text */
export const VIEW_COOKIES_LABEL = 'View cookies';

/** NH profiling opt-out label */
export const NH_PROFILING_LABEL = 'Profiling Opt-Out';

/** NH profiling opt-out sublabel */
export const NH_PROFILING_SUBLABEL =
  'Opt out of automated decision-making and profiling (NH SB 255).';

/** Withdraw All Consent button label (GDPR Art. 7(3)) */
export const WITHDRAW_CONSENT_LABEL = 'Withdraw All Consent';

/** Fine-print DNS link text */
export const FINE_PRINT_DNS = 'Do Not Sell or Share My Personal Information';

/** Fine-print privacy choices link text */
export const FINE_PRINT_PRIVACY_CHOICES = 'Your Privacy Choices';

/** Fine-print right-to-know link text */
export const FINE_PRINT_RIGHT_TO_KNOW = 'Request My Data';

/** Fine-print consent receipt link text */
export const FINE_PRINT_CONSENT_RECEIPT = 'View Consent Receipt';

/** Fine-print save scope hint */
export const FINE_PRINT_SAVE_SCOPE =
  'Preferences apply to this site only unless saved to your Trust ID account.';

/** Fine-print retention notice */
export const FINE_PRINT_RETENTION =
  'Cookie preferences are retained for 12 months or until you withdraw consent.';

/* ── CookieEmail ── */

/** "Save without an account" ghost button label */
export const COOKIE_EMAIL_SAVE_WITHOUT = 'Save without an account';

/** Expiry warning micro text for save-without-account option */
export const COOKIE_EMAIL_EXPIRY_WARNING =
  'Without an account, your preferences will expire in 6 months.';

/* ── DNS Confirm (Success State) ── */

/** Headline for DNS confirmation SUCCESS screen */
export const DNS_HEADLINE = 'Request Received';

/** Body text for DNS success confirmation */
export const DNS_BODY =
  'Your opt-out request has been received. The sale and sharing of your personal information on this site has been disabled.';

/** Note text (applies to this site only) */
export const DNS_NOTE =
  'This applies to StreamVault data only. Your cookie preferences are managed separately.';

/** Return to Site button label */
export const DNS_RETURN_BTN = 'Return to Site';

/** Return to site button aria-label */
export const DNS_RETURN_ARIA = 'Return to StreamVault';

/** Micro text below button */
export const DNS_UPDATE_TEXT =
  'You can update these anytime by clicking the Trust ID icon.';

/* ── Sharing Settings (Definition List) ── */

/** Headline for SharingSettings screen (full string) */
export const SHARING_HEADLINE = 'Your sharing settings for this site.';

/** Headline bold portion (predecessor splits across bold/regular spans) */
export const SHARING_HEADLINE_BOLD = 'Your sharing settings';

/** Headline regular portion */
export const SHARING_HEADLINE_REGULAR = 'for this site.';

/** Credential label */
export const SHARING_CREDENTIAL_LABEL = 'Credential';

/** Credential value (default) */
export const SHARING_CREDENTIAL_VALUE = 'Age Verification';

/** Status label */
export const SHARING_STATUS_LABEL = 'Status';

/** Status value when active */
export const SHARING_STATUS_ACTIVE = 'Active';

/** Shared until label */
export const SHARING_UNTIL_LABEL = 'Shared until';

/** Default shared-until date */
export const SHARING_UNTIL_VALUE = 'Mar 15, 2030';

/** Data shared label */
export const SHARING_DATA_LABEL = 'Data shared';

/** Data shared value */
export const SHARING_DATA_VALUE = 'Yes/No only';

/** Revoke Sharing button label */
export const SHARING_REVOKE_BTN = 'Revoke Sharing';

/** Revoke warning micro text */
export const SHARING_REVOKE_WARNING =
  'Revoking will require you to re-verify if this site requests it again.';

/* ── DSR Intake ── */

/** DSR headline text by jurisdiction */
export const DSR_HEADLINES = {
  eu: 'Exercise Your Data Rights',
  ca: 'Exercise Your Privacy Rights',
  generic: 'Exercise Your Privacy Rights',
} as const;

/** DSR body text by jurisdiction */
export const DSR_BODY = {
  eu: 'Submit a verifiable request under applicable data protection law. Your identity will be verified before processing.',
  ca: 'Submit a verifiable consumer request under CCPA/CPRA. Your identity will be verified before processing.',
  generic: 'Submit a verifiable request to exercise your privacy rights. Your identity will be verified before processing.',
} as const;

/** DSR request type options with title + description */
export const DSR_REQUEST_TYPES = {
  access: {
    title: 'Access / Right to Know',
    description: 'Request a copy of the personal data we hold about you.',
  },
  delete: {
    title: 'Deletion / Right to Erasure',
    description: 'Request that we delete the personal data we hold about you.',
  },
  correct: {
    title: 'Correction / Rectification',
    description: 'Request correction of inaccurate personal data.',
  },
  portability: {
    title: 'Data Portability',
    description: 'Receive your data in a portable, machine-readable format.',
  },
  optout: {
    title: 'Opt-Out of Sale / Sharing',
    description: 'Opt out of the sale or sharing of your personal information.',
  },
} as const;

/** EU-specific DSR option (replaces optout) */
export const DSR_EU_OBJECT = {
  title: 'Object to Processing',
  description: 'Object to the processing of your personal data.',
} as const;

/** DSR email input placeholder */
export const DSR_EMAIL_PLACEHOLDER = 'Your email for identity verification';

/** DSR response time notice by jurisdiction */
export const DSR_RESPONSE_TIME = {
  eu: '30 days',
  ca: '45 days',
  generic: '45 days',
} as const;

/** DSR response time notice template */
export const DSR_RESPONSE_NOTICE_PREFIX = 'We will respond to your request within';

/** DSR response time notice suffix */
export const DSR_RESPONSE_NOTICE_SUFFIX = 'as required by law.';

/** Submit button label */
export const DSR_SUBMIT_BTN = 'Submit Request';

/** DSR trust signal micro text (identity verification reassurance) */
export const DSR_TRUST_SIGNAL =
  "We'll verify your identity before processing your request.";

/** DSR disclaimer micro text */
export const DSR_DISCLAIMER =
  'StreamVault processes this request as the data controller. Trust ID facilitates submission on your behalf.';
