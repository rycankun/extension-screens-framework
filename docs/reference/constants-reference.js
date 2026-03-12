/**
 * @fileoverview Screen constants and mappings for the Trust ID Extension Flow.
 * @module constants
 */

/* ═══════════════════════════════════════════════
   SCREEN CONSTANTS
   ═══════════════════════════════════════════════ */

/**
 * Screen identifiers used by the flow engine.
 *
 * Abbreviation legend:
 *   T1 = GDPR / EU consent tier
 *   T2 = US Strict states (CA, CO, CT, GA, MD, TN…)
 *   T3 = US Standard states (~43 remaining)
 *   DOB = Date of Birth
 *   DSR = Data Subject Request (GDPR Art. 15-22 / CCPA §1798.100-130)
 *   DNS = Do Not Sell (CCPA §1798.120)
 *   OTP = One-Time Password
 *   SV  = StreamVault (demo host site)
 *   QR  = QR code verification
 *
 * @enum {string}
 */
export const SCREENS = Object.freeze({
  // Background
  LANDING: 'landing',
  AGE_GATE_COVER: 'age-gate-cover',
  SV_ADULT: 'sv-adult',
  QR_VERIFY: 'qr-verify',
  // Prompt (banner)
  DOB_ENTRY: 'dob-entry',
  DOB_SHARE: 'dob-share',
  CONSENT_EU: 'consent-t1',
  CONSENT_US: 'consent-t2',        // Strict US states (CA, CO, CT, DE, GA, MD, MN, MT, NH, NJ, OR, TN, TX)
  CONSENT_US_STD: 'consent-t3',    // Standard US states (~43 remaining)
  COOKIE_PREFS: 'cookie-prefs',
  COOKIE_EMAIL: 'cookie-email',
  DNS_CONFIRM: 'dns-confirm',
  EMAIL_CAPTURE: 'email-capture',
  OTP_ENTRY: 'otp-entry',
  OTP_ERROR: 'otp-error',
  PASSKEY_VERIFY: 'passkey-verify',
  EMAIL_CONFIRM: 'email-confirm',
  SUCCESS: 'success',
  PASSKEY_SETUP: 'passkey-setup',
  DATA_SHARE: 'data-share',
  ACCOUNT_SETUP: 'account-setup',
  DELETE_WARNING: 'delete-warning',
  REVOKE_DOB: 'revoke-dob-warning',
  REVOKE_AGE: 'revoke-age-warning',
  REVOKE_EMAIL: 'revoke-email-warning',
  VERIFY_NEEDED: 'verify-needed',
  CREDENTIAL_REQ: 'credential-request',
  CREDENTIAL_WARN: 'credential-warning',
  SHARING_SETTINGS: 'sharing-settings',
  DSR_INTAKE: 'dsr-intake',
  ERROR_NETWORK: 'error-network',
  // SLC Digital — eSIM-based authentication
  SLC_VERIFY: 'slc-verify',
  SLC_KYC: 'slc-kyc',
  // Toast overlays
  TOAST_MANAGE: 'toast-manage',
  TOAST_SAVED: 'toast-saved',
  TOAST_WELCOME: 'toast-welcome',
});

/** @type {Readonly<Record<string, string>>} Map screen constant → DOM container ID. */
export const SCREEN_DOM_MAP = Object.freeze({
  [SCREENS.DOB_ENTRY]: 'screenDobEntry',
  [SCREENS.DOB_SHARE]: 'screenDobShare',
  [SCREENS.CONSENT_EU]: 'screenConsentT1',
  [SCREENS.CONSENT_US]: 'screenConsentT2',
  [SCREENS.CONSENT_US_STD]: 'screenConsentT3',
  [SCREENS.COOKIE_PREFS]: 'screenCookiePrefs',
  [SCREENS.COOKIE_EMAIL]: 'screenCookieEmail',
  [SCREENS.DNS_CONFIRM]: 'screenDnsConfirm',
  [SCREENS.EMAIL_CAPTURE]: 'screenEmailCapture',
  [SCREENS.OTP_ENTRY]: 'screenOtpEntry',
  [SCREENS.OTP_ERROR]: 'screenOtpError',
  [SCREENS.PASSKEY_VERIFY]: 'screenPasskeyVerify',
  [SCREENS.EMAIL_CONFIRM]: 'screenEmailConfirm',
  [SCREENS.SUCCESS]: 'screenSuccess',
  [SCREENS.PASSKEY_SETUP]: 'screenPasskeySetup',
  [SCREENS.DATA_SHARE]: 'screenDataShare',
  [SCREENS.ACCOUNT_SETUP]: 'screenAccountSetup',
  [SCREENS.DELETE_WARNING]: 'screenDeleteWarning',
  [SCREENS.REVOKE_DOB]: 'screenRevokeDob',
  [SCREENS.REVOKE_AGE]: 'screenRevokeAge',
  [SCREENS.REVOKE_EMAIL]: 'screenRevokeEmail',
  [SCREENS.VERIFY_NEEDED]: 'screenVerifyNeeded',
  [SCREENS.CREDENTIAL_REQ]: 'screenCredentialReq',
  [SCREENS.CREDENTIAL_WARN]: 'screenCredentialWarn',
  [SCREENS.SHARING_SETTINGS]: 'screenSharingSettings',
  [SCREENS.DSR_INTAKE]: 'screenDsrIntake',
  [SCREENS.ERROR_NETWORK]: 'screenErrorNetwork',
  [SCREENS.SLC_VERIFY]: 'screenSlcVerify',
  [SCREENS.SLC_KYC]: 'screenSlcKyc',
  [SCREENS.TOAST_MANAGE]: 'screenToastManage',
  [SCREENS.TOAST_SAVED]: 'screenToastSaved',
  [SCREENS.TOAST_WELCOME]: 'screenToastWelcome',
});

/** @type {Readonly<Record<string, string>>} Map screen constant → filename for indicator. */
export const SCREEN_FILENAMES = Object.freeze(
  Object.fromEntries(Object.values(SCREENS).map((val) => [val, `${val}.html`]))
);

/** @type {ReadonlySet<string>} Screens rendered as full-page backgrounds (not inside banner). */
export const BACKGROUND_SCREENS = Object.freeze(
  new Set([SCREENS.LANDING, SCREENS.AGE_GATE_COVER, SCREENS.SV_ADULT, SCREENS.QR_VERIFY, SCREENS.SLC_KYC])
);

/** @type {Readonly<Record<string, {on: string, off: string}>>} Sublabel copy per shared-data field. */
export const SHARED_COPY = Object.freeze({
  email: { on: 'Shared with StreamVault for account access.', off: 'Your email is not shared with this site.' },
  dob: { on: 'Shared with StreamVault for age verification.', off: 'Your date of birth is not shared with this site.' },
  age: { on: 'Shared with StreamVault for age verification.', off: 'Not shared with this site.' },
});

/**
 * Human-readable screen titles for ARIA announcements.
 * WHY: screenId.replace(/-/g, ' ') produces unclear titles like "consent t1".
 * This map gives screen readers meaningful, user-facing names.
 * @type {Readonly<Record<string, string>>}
 */
export const SCREEN_TITLES = Object.freeze({
  [SCREENS.DOB_ENTRY]: 'Date of birth entry',
  [SCREENS.DOB_SHARE]: 'Share your date of birth',
  [SCREENS.CONSENT_EU]: 'Cookie consent',
  [SCREENS.CONSENT_US]: 'Privacy preferences',
  [SCREENS.CONSENT_US_STD]: 'Privacy preferences',
  [SCREENS.COOKIE_PREFS]: 'Cookie preferences',
  [SCREENS.COOKIE_EMAIL]: 'Save preferences with email',
  [SCREENS.DNS_CONFIRM]: 'Do Not Sell confirmation',
  [SCREENS.EMAIL_CAPTURE]: 'Enter your email',
  [SCREENS.OTP_ENTRY]: 'Enter verification code',
  [SCREENS.OTP_ERROR]: 'Verification code error',
  [SCREENS.PASSKEY_VERIFY]: 'Verify with passkey',
  [SCREENS.EMAIL_CONFIRM]: 'Confirm your email',
  [SCREENS.SUCCESS]: 'Account Confirmed',
  [SCREENS.PASSKEY_SETUP]: 'Set up passkey',
  [SCREENS.DATA_SHARE]: 'Data sharing preferences',
  [SCREENS.ACCOUNT_SETUP]: 'Account setup',
  [SCREENS.DELETE_WARNING]: 'Delete account warning',
  [SCREENS.REVOKE_DOB]: 'Revoke date of birth sharing',
  [SCREENS.REVOKE_AGE]: 'Revoke age sharing',
  [SCREENS.REVOKE_EMAIL]: 'Revoke email sharing',
  [SCREENS.VERIFY_NEEDED]: 'Verification needed',
  [SCREENS.CREDENTIAL_REQ]: 'Credential request',
  [SCREENS.CREDENTIAL_WARN]: 'Credential expiring',
  [SCREENS.SHARING_SETTINGS]: 'Sharing settings',
  [SCREENS.DSR_INTAKE]: 'Data subject request',
  [SCREENS.ERROR_NETWORK]: 'Network error',
  [SCREENS.SLC_VERIFY]: 'SLC eSIM verification',
  [SCREENS.SLC_KYC]: 'SLC identity verification',
  [SCREENS.TOAST_MANAGE]: 'Manage preferences tooltip',
  [SCREENS.TOAST_SAVED]: 'Preferences saved notification',
  [SCREENS.TOAST_WELCOME]: 'Welcome back notification',
});

/* ═══════════════════════════════════════════════
   TIMING CONSTANTS (ms unless noted)
   ═══════════════════════════════════════════════ */

/**
 * Named timing constants — replace magic numbers throughout the codebase.
 * All values in milliseconds unless otherwise noted.
 * @enum {number}
 */
export const TIMING = Object.freeze({
  /** Duration of the age-gate cover fade-out CSS transition */
  FADE_DURATION: 600,
  /** Delay before restoring focus after closing an overlay — lets CSS transitions finish */
  FOCUS_RESTORE_DELAY: 250,
  /** Delay before showing the floating Trust ID icon after banner dismiss */
  ICON_APPEAR_DELAY: 400,
  /** Delay before auto-navigating away from the success screen */
  SUCCESS_DISPLAY_MS: 1500,
  /** Delay after credential share before fading the age gate cover */
  CREDENTIAL_SHARE_DELAY: 800,
  /** Delay after DOB verification before showing consent/next screen */
  DOB_VERIFIED_DELAY: 800,
  /** Delay after nav login route to show the floating icon */
  NAV_LOGIN_DELAY: 500,
  /** OTP resend countdown timer duration (seconds, not ms) */
  OTP_RESEND_SECONDS: 30,
  /** Auto-focus delay after screen transition — lets DOM settle */
  AUTO_FOCUS_DELAY: 120,
});
