/**
 * @fileoverview Copy text definitions for Trust ID screens.
 * Maps data-variant-key → text content for all prompt screens.
 * @module variants
 */

import state from './state.js';

/**
 * @type {Readonly<Record<string, string>>}
 * Copy text keyed by data-variant-key attribute values.
 */
export const COPY_TEXT = Object.freeze({
    /* ── Consent EU (GDPR / Strict) ── */
    consentHeadline: 'This site uses cookies and similar technologies.',
    consentTrustLine: 'Your preferences. Your control.',
    consentAcceptBtn: 'Accept All',
    consentRejectBtn: 'Reject All',
    consentManageBtn: 'Manage Preferences',
    whyTrustId: 'Trust ID gives you one account to manage cookies, logins, and privacy across every partner site.',

    /*
     * ── Consent US (Opt-Out States) ──
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
    usAcceptBtn: 'Accept & Continue',
    usStdAcceptBtn: 'Accept & Continue',  /* consent-t3 uses a separate key for standard states */
    usTrustLine: 'Your preferences. Your control.',
    /* ── Email Capture (Age Verification) ── */
    emailHeadline: 'This site requires age verification.',
    emailBody: 'Trust ID confirms your age instantly — this site never sees your ID or personal details.',
    emailTrustLine: 'Verify once. Valid everywhere.',
    emailSendBtn: 'Send Verification Code',
    emailReauthWarning: 'Without Trust ID, you may need to re-verify as often as every 60 minutes.',
    /* ── OTP Entry ── */
    otpHeadline: "We've sent a verification code.",
    otpAutoSubmit: 'Code verifies automatically',
    /* ── Cookie Preferences ── */
    cookieTrustLine: 'Your preferences. Your control.',
    sharedDataTrustLine: 'Your data. Your decision.',
    sharedDataHeadline: 'Your shared personal data.',
    sharedDataDesc: ' Manage what you share with this site. Revoke access or set time limits.',
    cookieSaveBtn: 'Save Preferences',
    /* ── Cookie Email Capture ── */
    cookieEmailHeadline: 'Save your preferences to your Trust ID account.',
    cookieEmailBody:
      "Your cookie preferences for this site are saved securely in your Trust ID wallet — set them once and they're stored for good.",
    cookieEmailTrustLine: 'Set once. Yours forever.',
    cookieEmailSendBtn: 'Send Verification Code',
    /* ── Passkey Setup ── */
    passkeyHeadline: 'Skip the code next time.',
    passkeyBody: 'Set up a passkey and your saved verification does the rest.',
    passkeyDetail:
      "A passkey lets you verify with your fingerprint, face, or screen lock — no codes or passwords needed. It's stored securely on your device and never shared with sites.",
    passkeyBtn: 'Set Up Passkey',
    /* ── Passkey Verify ── */
    passkeyVerifyHeadline: 'Confirm with your device.',
    passkeyVerifyBody: 'Use Face ID, fingerprint, or your device PIN.',
    /* ── Credential Request ── */
    credReqHeadline: 'StreamVault is requesting your age verification.',
    credReqBody:
      'Only a yes/no confirmation is shared — your ID, date of birth, and personal details are never sent to this site.',
    credReqBtn: 'Share Verification',
    /* ── Verify Needed ── */
    verifyHeadline: 'Age verification is required to access this content.',
    verifyBody:
      'Trust ID only shares a yes/no confirmation — your personal information, ID, and date of birth stay private and are never sent to this site.',
    verifyDetail:
      "You'll need to complete a one-time age verification. Once verified, your verification is stored securely in your Trust ID wallet and can be shared instantly with any site that requests it.",
    verifyBtn: 'Verify My Age',
    /* ── Credential Warning ── */
    credWarnHeadline: 'Age verification is required to access this site.',
    credWarnBody:
      'Trust ID only shares a yes/no confirmation — your personal information, ID, and date of birth stay private and are never sent to this site.',
    credWarnDetail:
      "Without verifying, you won't be able to access age-restricted content on this site. You can resume verification anytime via the Trust ID icon.",
    credWarnBtn: 'Continue Verification',
    credWarnReauth: 'Without Trust ID, you may need to re-verify as often as every 60 minutes.',
    /* ── DOB Share (Honor Age Gate) ── */
    dobShareHeadline: 'StreamVault needs to verify your age.',
    dobShareBody:
      'Trust ID will confirm you meet the age requirement for this content — without sharing your exact date of birth.',
    dobSharePrivacy:
      'Only a yes/no age confirmation is shared with this site — your exact date of birth is never sent.',
    dobShareBtn: 'Confirm My Age',
    /* ── Data Share ── */
    dataShareHeadline: 'StreamVault would like to create an account for you.',
    dataShareBody:
      'Trust ID can share your email to set up your StreamVault account instantly — no new passwords or sign-up forms.',
    dataSharePrivacy: 'These details are stored in your Trust ID wallet and shared only with your permission.',
    dataShareBtn: 'Create My Account',
    /* ── Account Setup ── */
    accountHeadline: 'Complete your Trust ID profile.',
    accountBody: 'Your email has been verified. Add your name to finish setting up your account with StreamVault.',
    accountPrivacy:
      'Your name and email will be stored securely in your Trust ID wallet and shared with sites only with your permission.',
    accountBtn: 'Create My Account',
});

/**
 * Apply copy text to all elements with [data-variant-key].
 * Call after showScreen() or when screens are loaded.
 */
export function applyVariant() {
  document.querySelectorAll('[data-variant-key]').forEach((el) => {
    const key = el.getAttribute('data-variant-key');
    if (key && COPY_TEXT[key] !== undefined) el.textContent = COPY_TEXT[key];
  });
}

/**
 * Show or hide GPC (Global Privacy Control) indicator on consent screens.
 * Visible on EU and US consent screens when GPC signal is detected. Trust ID acts as the
 * GPC system — the web portal and app will have default consent controls.
 */
export function updateGpcIndicator() {
  document.querySelectorAll('.gpc-indicator').forEach((el) => {
    el.classList.toggle('hidden', !state.gpcDetected);
  });
}
/**
 * Show/hide DNT signal indicator on consent screens.
 * @returns {void}
 */
export function updateDntIndicator() {
  document.querySelectorAll('.dnt-indicator').forEach((el) => {
    el.classList.toggle('hidden', !state.dntDetected);
  });
}

/**
 * Show or hide the "Why Trust ID?" explainer based on user mode.
 * Visible only for first-time users who haven't seen Trust ID before.
 */
export function updateWhyTrustId() {
  const isFirstTime = state.currentMode === 'first';
  document.querySelectorAll('[data-why-trustid]').forEach((el) => {
    el.classList.toggle('hidden', !isFirstTime);
  });
}
