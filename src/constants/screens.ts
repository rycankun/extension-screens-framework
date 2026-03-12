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

/** Human-readable titles for aria-label on screen dialogs */
export const SCREEN_TITLES: Record<ScreenId, string> = {
  [SCREENS.CONSENT_EU]: 'Cookie Consent — EU',
  [SCREENS.CONSENT_US]: 'Privacy Preferences — US',
  [SCREENS.CONSENT_US_STD]: 'Privacy Preferences — US Standard',
  [SCREENS.EMAIL_CAPTURE]: 'Enter Your Email',
  [SCREENS.OTP_ENTRY]: 'Enter Verification Code',
  [SCREENS.OTP_ERROR]: 'Verification Error',
  [SCREENS.EMAIL_CONFIRM]: 'Email Verified',
  [SCREENS.PASSKEY_SETUP]: 'Set Up Passkey',
  [SCREENS.PASSKEY_VERIFY]: 'Verify with Passkey',
  [SCREENS.COOKIE_PREFS]: 'Cookie Preferences',
  [SCREENS.COOKIE_EMAIL]: 'Save Preferences Email',
  [SCREENS.DNS_CONFIRM]: 'Do Not Sell Confirmation',
  [SCREENS.SHARING_SETTINGS]: 'Sharing Settings',
  [SCREENS.DSR_INTAKE]: 'Data Subject Request',
  [SCREENS.DOB_ENTRY]: 'Enter Date of Birth',
  [SCREENS.DOB_SHARE]: 'Share Date of Birth',
  [SCREENS.DATA_SHARE]: 'Data Sharing',
  [SCREENS.CREDENTIAL_REQUEST]: 'Credential Request',
  [SCREENS.CREDENTIAL_WARNING]: 'Credential Warning',
  [SCREENS.ACCOUNT_SETUP]: 'Set Up Account',
  [SCREENS.VERIFY_NEEDED]: 'Verification Required',
  [SCREENS.SUCCESS]: 'Success',
  [SCREENS.ERROR_NETWORK]: 'Network Error',
  [SCREENS.DELETE_WARNING]: 'Delete Account Warning',
  [SCREENS.REVOKE_DOB]: 'Revoke Date of Birth Sharing',
  [SCREENS.REVOKE_AGE]: 'Revoke Age Sharing',
  [SCREENS.REVOKE_EMAIL]: 'Revoke Email Sharing',
  [SCREENS.TOAST_WELCOME]: 'Welcome Back',
  [SCREENS.TOAST_SAVED]: 'Preferences Saved',
  [SCREENS.TOAST_MANAGE]: 'Manage Preferences',
  [SCREENS.AGE_GATE_COVER]: 'Age Verification Required',
  [SCREENS.QR_VERIFY]: 'QR Code Verification',
  [SCREENS.SLC_KYC]: 'SLC Digital KYC Verification',
  [SCREENS.SLC_VERIFY]: 'SLC eSIM Verification',
  [SCREENS.SV_ADULT]: 'Age Verified',
};
