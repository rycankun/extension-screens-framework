/**
 * Variant Text Constants — TrustID Extension Screen Library
 *
 * All screen copy text that changes across variant axes lives here.
 * Screen components read from this map via data-variant-key lookups.
 * This is the canonical source for every user-facing string in the
 * extension's prompt screens — never hardcode text in components.
 *
 * Total keys: 55 COPY_TEXT entries + 6 SHARED_COPY sublabels = 61 variant strings
 *
 * @see docs/PRD.md § Variant System for axis definitions
 * @see docs/reference/variants-reference.js for the original key set
 */

/* ── Copy Text (Screen Content) ── */

/**
 * Complete copy text map keyed by data-variant-key attribute values.
 * Every prompt screen's headlines, body text, trust lines, and button
 * labels are defined here. Components reference these via their
 * data-variant-key prop.
 *
 * @see docs/reference/variants-reference.js — values match exactly
 */
export const COPY_TEXT = {

  /* ── Consent EU (GDPR / Strict) ── */

  /** Main headline for EU/GDPR consent banner */
  consentHeadline: 'This site uses cookies and similar technologies.',
  /** Trust line displayed below consent toggles */
  consentTrustLine: 'Your preferences. Your control.',
  /** Accept all button text (EU opt-in model) */
  consentAcceptBtn: 'Accept All',
  /** Reject all button text (shared across EU and US) */
  consentRejectBtn: 'Reject All',
  /** Manage preferences link text */
  consentManageBtn: 'Manage Preferences',
  /** "Why Trust ID?" explainer text for first-time users */
  whyTrustId:
    'Trust ID gives you one account to manage cookies, logins, and privacy across every partner site.',

  /* ── Consent US (Opt-Out States) ──
   *
   * INTENTIONAL DIVERGENCE: EU uses "Accept All" / "Reject All" while US
   * uses "Accept & Continue" / "Reject All".
   *
   * Legal basis:
   *   EU — GDPR Art. 4(11) requires "unambiguous" consent language. "Accept All"
   *        clearly communicates the scope of what the user is agreeing to.
   *   US — CCPA/CPRA is an opt-out model. The default is data collection proceeds;
   *        "Accept & Continue" reflects that the user is acknowledging and proceeding
   *        rather than affirmatively opting into all categories. This softer framing
   *        aligns with the opt-out (not opt-in) legal framework.
   *
   * Both tiers share "Reject All" because refusal semantics are equivalent.
   */

  /** Accept button text for US strict states (consent-t2) */
  usAcceptBtn: 'Accept & Continue',
  /** Accept button text for US standard states (consent-t3, separate key) */
  usStdAcceptBtn: 'Accept & Continue',
  /** Trust line for US consent screens */
  usTrustLine: 'Your preferences. Your control.',

  /* ── Email Capture (Age Verification) ── */

  /** Headline for email capture screen (age verification entry point) */
  emailHeadline: 'This site requires age verification.',
  /** Body text explaining Trust ID age verification */
  emailBody:
    'Trust ID confirms your age instantly — this site never sees your ID or personal details.',
  /** Trust line for email capture */
  emailTrustLine: 'Verify once. Valid everywhere.',
  /** Send verification code button text */
  emailSendBtn: 'Send Verification Code',
  /** Re-auth warning shown below email input */
  emailReauthWarning:
    'Without Trust ID, you may need to re-verify as often as every 60 minutes.',

  /* ── OTP Entry ── */

  /** Headline for OTP verification screen */
  otpHeadline: "We've sent a verification code.",
  /** Auto-submit indicator text below OTP input */
  otpAutoSubmit: 'Code verifies automatically',

  /* ── Cookie Preferences ── */

  /** Trust line for Cookies tab in cookie preferences */
  cookieTrustLine: 'Your preferences. Your control.',
  /** Trust line for Shared Data tab */
  sharedDataTrustLine: 'Your data. Your decision.',
  /** Headline for Shared Data tab */
  sharedDataHeadline: 'Your shared personal data.',
  /** Description text for Shared Data tab */
  sharedDataDesc:
    ' Manage what you share with this site. Revoke access or set time limits.',
  /** Save preferences button text */
  cookieSaveBtn: 'Save Preferences',

  /* ── Cookie Email Capture ── */

  /** Headline for cookie email capture screen */
  cookieEmailHeadline: 'Save your preferences to your Trust ID account.',
  /** Body text explaining cookie preference persistence */
  cookieEmailBody:
    "Your cookie preferences for this site are saved securely in your Trust ID wallet — set them once and they're stored for good.",
  /** Trust line for cookie email capture */
  cookieEmailTrustLine: 'Set once. Yours forever.',
  /** Send verification code button text */
  cookieEmailSendBtn: 'Send Verification Code',

  /* ── Passkey Setup ── */

  /** Headline for passkey setup screen */
  passkeyHeadline: 'Skip the code next time.',
  /** Body text explaining passkey benefit */
  passkeyBody: 'Set up a passkey and your saved verification does the rest.',
  /** Detailed passkey explainer text */
  passkeyDetail:
    "A passkey lets you verify with your fingerprint, face, or screen lock — no codes or passwords needed. It's stored securely on your device and never shared with sites.",
  /** Set up passkey button text */
  passkeyBtn: 'Set Up Passkey',

  /* ── Passkey Verify ── */

  /** Headline for passkey verification screen */
  passkeyVerifyHeadline: 'Confirm with your device.',
  /** Body text for passkey verification */
  passkeyVerifyBody: 'Use Face ID, fingerprint, or your device PIN.',

  /* ── Credential Request ── */

  /** Headline for credential request screen */
  credReqHeadline: 'StreamVault is requesting your age verification.',
  /** Body text explaining credential sharing privacy */
  credReqBody:
    'Only a yes/no confirmation is shared — your ID, date of birth, and personal details are never sent to this site.',
  /** Share verification button text */
  credReqBtn: 'Share Verification',

  /* ── Verify Needed ── */

  /** Headline for verify needed screen */
  verifyHeadline: 'Age verification is required to access this content.',
  /** Body text explaining Trust ID privacy in verification */
  verifyBody:
    'Trust ID only shares a yes/no confirmation — your personal information, ID, and date of birth stay private and are never sent to this site.',
  /** Detailed verification explainer text */
  verifyDetail:
    "You'll need to complete a one-time age verification. Once verified, your verification is stored securely in your Trust ID wallet and can be shared instantly with any site that requests it.",
  /** Verify my age button text */
  verifyBtn: 'Verify My Age',

  /* ── Credential Warning ── */

  /** Headline for credential warning screen */
  credWarnHeadline: 'Age verification is required to access this site.',
  /** Body text for credential warning privacy explanation */
  credWarnBody:
    'Trust ID only shares a yes/no confirmation — your personal information, ID, and date of birth stay private and are never sent to this site.',
  /** Detailed credential warning explainer */
  credWarnDetail:
    "Without verifying, you won't be able to access age-restricted content on this site. You can resume verification anytime via the Trust ID icon.",
  /** Continue verification button text */
  credWarnBtn: 'Continue Verification',
  /** Re-auth warning on credential warning screen */
  credWarnReauth:
    'Without Trust ID, you may need to re-verify as often as every 60 minutes.',

  /* ── DOB Share (Honor Age Gate) ── */

  /** Headline for DOB share screen */
  dobShareHeadline: 'StreamVault needs to verify your age.',
  /** Body text explaining DOB share privacy */
  dobShareBody:
    'Trust ID will confirm you meet the age requirement for this content — without sharing your exact date of birth.',
  /** Privacy disclaimer for DOB sharing */
  dobSharePrivacy:
    'Only a yes/no age confirmation is shared with this site — your exact date of birth is never sent.',
  /** Confirm my age button text */
  dobShareBtn: 'Confirm My Age',

  /* ── Data Share ── */

  /** Headline for data share screen */
  dataShareHeadline: 'StreamVault would like to create an account for you.',
  /** Body text explaining data share convenience */
  dataShareBody:
    'Trust ID can share your email to set up your StreamVault account instantly — no new passwords or sign-up forms.',
  /** Privacy disclaimer for data sharing */
  dataSharePrivacy:
    'These details are stored in your Trust ID wallet and shared only with your permission.',
  /** Create my account button text */
  dataShareBtn: 'Create My Account',

  /* ── Account Setup ── */

  /** Headline for account setup screen */
  accountHeadline: 'Complete your Trust ID profile.',
  /** Body text for account setup */
  accountBody:
    'Your email has been verified. Add your name to finish setting up your account with StreamVault.',
  /** Privacy disclaimer for account setup */
  accountPrivacy:
    'Your name and email will be stored securely in your Trust ID wallet and shared with sites only with your permission.',
  /** Create my account button text */
  accountBtn: 'Create My Account',
} as const;

/** Type union of all copy text keys */
export type CopyTextKey = keyof typeof COPY_TEXT;

/* ── Shared Data Toggle Sublabels ── */

/**
 * Toggle sublabels for the Cookie Preferences Shared Data tab.
 * Each data type has an "on" (currently shared) and "off" (not shared)
 * description. These are separate from COPY_TEXT because they're keyed
 * by data type rather than by data-variant-key.
 */
export const SHARED_COPY = {
  email: {
    on: 'Shared with StreamVault for account access.',
    off: 'Your email is not shared with this site.',
  },
  dob: {
    on: 'Shared with StreamVault for age verification.',
    off: 'Your date of birth is not shared with this site.',
  },
  age: {
    on: 'Shared with StreamVault for age verification.',
    off: 'Not shared with this site.',
  },
} as const;

/* ── Scenario Identifiers ── */

/** User scenario values for flow routing */
export const SCENARIOS = {
  FIRST: 'first',
  FIRST_VISIT: 'firstVisit',
  RETURNING: 'returning',
  RETURNING_VERIFIED: 'returningVerified',
} as const;

export type Scenario = (typeof SCENARIOS)[keyof typeof SCENARIOS];

/* ── SLC Mode ── */

/** SLC eSIM verification mode */
export const SLC_MODES = {
  OFF: 'off',
  NO_KYC: 'noKyc',
  WITH_KYC: 'withKyc',
} as const;

export type SlcMode = (typeof SLC_MODES)[keyof typeof SLC_MODES];
