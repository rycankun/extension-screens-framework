/**
 * Screen Constants — TrustID Extension Screen Library
 *
 * Canonical enum and metadata for all 35 screens in the extension.
 * Every component, story, and plugin reference imports screen identifiers
 * from this file — never hardcode screen names as strings.
 *
 * @see CLAUDE.md § Screen Inventory for the complete list
 * @see docs/PRD.md § Screen Specifications for detailed specs
 */

/* ── Screen Identifiers ── */

/** All screen IDs used across the extension */
export const SCREENS = {
  /* Consent */
  CONSENT_EU: 'consent-t1',
  CONSENT_US: 'consent-t2',
  CONSENT_US_STD: 'consent-t3',

  /* Authentication */
  EMAIL_CAPTURE: 'email-capture',
  OTP_ENTRY: 'otp-entry',
  OTP_ERROR: 'otp-error',
  EMAIL_CONFIRM: 'email-confirm',
  PASSKEY_SETUP: 'passkey-setup',
  PASSKEY_VERIFY: 'passkey-verify',

  /* Preferences */
  COOKIE_PREFS: 'cookie-prefs',
  COOKIE_EMAIL: 'cookie-email',
  DNS_CONFIRM: 'dns-confirm',
  SHARING_SETTINGS: 'sharing-settings',
  DSR_INTAKE: 'dsr-intake',

  /* Credentials */
  DOB_ENTRY: 'dob-entry',
  DOB_SHARE: 'dob-share',
  DATA_SHARE: 'data-share',
  CREDENTIAL_REQUEST: 'credential-request',
  CREDENTIAL_WARNING: 'credential-warning',

  /* Onboarding */
  ACCOUNT_SETUP: 'account-setup',
  VERIFY_NEEDED: 'verify-needed',

  /* Status */
  SUCCESS: 'success',
  ERROR_NETWORK: 'error-network',
  DELETE_WARNING: 'delete-warning',
  REVOKE_DOB: 'revoke-dob-warning',
  REVOKE_AGE: 'revoke-age-warning',
  REVOKE_EMAIL: 'revoke-email-warning',

  /* Toasts */
  TOAST_WELCOME: 'toast-welcome',
  TOAST_SAVED: 'toast-saved',
  TOAST_MANAGE: 'toast-manage',

  /* Overlays */
  AGE_GATE_COVER: 'age-gate-cover',
  QR_VERIFY: 'qr-verify',
  SLC_KYC: 'slc-kyc',
  SLC_VERIFY: 'slc-verify',
  SV_ADULT: 'sv-adult',
} as const;

/** Type union of all screen ID string values */
export type ScreenId = (typeof SCREENS)[keyof typeof SCREENS];

/* ── Screen Categories ── */

/** Grouping used for Storybook sidebar and Figma page organization */
export const SCREEN_CATEGORIES = {
  CONSENT: 'consent',
  AUTHENTICATION: 'authentication',
  PREFERENCES: 'preferences',
  CREDENTIALS: 'credentials',
  ONBOARDING: 'onboarding',
  STATUS: 'status',
  TOASTS: 'toasts',
  OVERLAYS: 'overlays',
} as const;

export type ScreenCategory =
  (typeof SCREEN_CATEGORIES)[keyof typeof SCREEN_CATEGORIES];

/* ── ARIA Screen Titles ── */

/**
 * Human-readable screen titles for ARIA announcements.
 * WHY: screenId.replace(/-/g, ' ') produces unclear titles like "consent t1".
 * This map gives screen readers meaningful, user-facing names.
 * Values match the predecessor project's SCREEN_TITLES exactly.
 *
 * @see docs/reference/constants-reference.js for the original values
 */
export const SCREEN_TITLES: Record<ScreenId, string> = {
  [SCREENS.CONSENT_EU]: 'Cookie consent',
  [SCREENS.CONSENT_US]: 'Privacy preferences',
  [SCREENS.CONSENT_US_STD]: 'Privacy preferences',
  [SCREENS.EMAIL_CAPTURE]: 'Enter your email',
  [SCREENS.OTP_ENTRY]: 'Enter verification code',
  [SCREENS.OTP_ERROR]: 'Verification code error',
  [SCREENS.EMAIL_CONFIRM]: 'Confirm your email',
  [SCREENS.PASSKEY_SETUP]: 'Set up passkey',
  [SCREENS.PASSKEY_VERIFY]: 'Verify with passkey',
  [SCREENS.COOKIE_PREFS]: 'Cookie preferences',
  [SCREENS.COOKIE_EMAIL]: 'Save preferences with email',
  [SCREENS.DNS_CONFIRM]: 'Do Not Sell confirmation',
  [SCREENS.SHARING_SETTINGS]: 'Sharing settings',
  [SCREENS.DSR_INTAKE]: 'Data subject request',
  [SCREENS.DOB_ENTRY]: 'Date of birth entry',
  [SCREENS.DOB_SHARE]: 'Share your date of birth',
  [SCREENS.DATA_SHARE]: 'Data sharing preferences',
  [SCREENS.CREDENTIAL_REQUEST]: 'Credential request',
  [SCREENS.CREDENTIAL_WARNING]: 'Credential expiring',
  [SCREENS.ACCOUNT_SETUP]: 'Account setup',
  [SCREENS.VERIFY_NEEDED]: 'Verification needed',
  [SCREENS.SUCCESS]: 'Account Confirmed',
  [SCREENS.ERROR_NETWORK]: 'Network error',
  [SCREENS.DELETE_WARNING]: 'Delete account warning',
  [SCREENS.REVOKE_DOB]: 'Revoke date of birth sharing',
  [SCREENS.REVOKE_AGE]: 'Revoke age sharing',
  [SCREENS.REVOKE_EMAIL]: 'Revoke email sharing',
  [SCREENS.TOAST_WELCOME]: 'Welcome back notification',
  [SCREENS.TOAST_SAVED]: 'Preferences saved notification',
  [SCREENS.TOAST_MANAGE]: 'Manage preferences tooltip',
  [SCREENS.AGE_GATE_COVER]: 'Age verification required',
  [SCREENS.QR_VERIFY]: 'QR code verification',
  [SCREENS.SLC_KYC]: 'SLC identity verification',
  [SCREENS.SLC_VERIFY]: 'SLC eSIM verification',
  [SCREENS.SV_ADULT]: 'Age verified',
};
