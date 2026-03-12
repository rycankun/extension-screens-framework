/**
 * Preference Constants — TrustID Extension Screen Library
 *
 * Labels, tab names, button text, and descriptive copy shared across
 * the five preference screens (CookiePrefs, CookieEmail, DnsConfirm,
 * SharingSettings, DsrIntake).
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
  email: 'Email',
  dob: 'Date of Birth',
  age: 'Age Verification',
} as const;

/* ── DNS Confirm ── */

/** Headline for Do Not Sell confirmation screen */
export const DNS_HEADLINE = 'Do Not Sell My Personal Information';

/** Body text for DNS confirmation */
export const DNS_BODY =
  'You are opting out of the sale or sharing of your personal information on this site. This choice will be saved to your Trust ID account.';

/** Confirm button label */
export const DNS_CONFIRM_BTN = 'Confirm Opt-Out';

/** Cancel link label */
export const DNS_CANCEL_LABEL = 'Cancel';

/* ── Sharing Settings ── */

/** Headline for SharingSettings screen */
export const SHARING_HEADLINE = 'Manage Shared Credentials';

/** Body text for SharingSettings */
export const SHARING_BODY =
  'Control what information is shared with this site. Toggle credentials off to revoke access.';

/** Save button label */
export const SHARING_SAVE_BTN = 'Save Settings';

/** Credential type labels */
export const CREDENTIAL_LABELS = {
  email: 'Email Address',
  dob: 'Date of Birth',
  age: 'Age Verification',
} as const;

/* ── DSR Intake ── */

/** DSR headline text by jurisdiction */
export const DSR_HEADLINES = {
  eu: 'Exercise Your Data Rights',
  ca: 'Exercise Your Privacy Rights',
  generic: 'Exercise Your Privacy Rights',
} as const;

/** DSR body text by jurisdiction */
export const DSR_BODY = {
  eu: 'Submit a request under GDPR to access, correct, delete, or port your personal data. We will respond within 30 days.',
  ca: 'Submit a verifiable consumer request under CCPA/CPRA. We will respond within 45 days.',
  generic: 'Submit a privacy request to exercise your rights. We will respond within 45 days.',
} as const;

/** DSR request type options */
export const DSR_REQUEST_TYPES = {
  access: 'Access My Data',
  delete: 'Delete My Data',
  correct: 'Correct My Data',
  portability: 'Data Portability',
  optout: 'Opt-Out of Sale / Sharing',
} as const;

/** EU-specific DSR option (replaces optout) */
export const DSR_EU_OBJECT = 'Object to Processing';

/** Submit button label */
export const DSR_SUBMIT_BTN = 'Submit Request';
