/**
 * Authentication Constants — TrustID Extension Screen Library
 *
 * Labels, placeholders, button text, and micro-copy shared across the six
 * authentication screens (EmailCapture, OtpEntry, OtpError,
 * EmailConfirm, PasskeySetup, PasskeyVerify).
 *
 * Predecessor ref: email-capture.html, otp-entry.html, otp-error.html,
 * email-confirm.html, passkey-setup.html, passkey-verify.html
 *
 * @see src/components/screens/authentication/ — all six auth screens
 * @see DIRECTIVES.md § 8.1 — no hardcoded strings in components
 */

/* ── Email Capture ── */

/** Input placeholder for email capture screen */
export const EMAIL_PLACEHOLDER = 'Your email address';

/** Trust signal micro text below email input */
export const TRUST_SIGNAL_TEXT = "We'll never share your email or send spam.";

/** Checkbox label for email sharing consent */
export const EMAIL_SHARE_LABEL = 'Share my email with this site and create an account';

/** Checkbox aria-label for email sharing consent */
export const EMAIL_SHARE_ARIA = 'Share my email and create an account on this site';

/** Ghost link text for skipping Trust ID */
export const EMAIL_GHOST_LABEL = "No thanks, I'll do it manually";

/** Ghost link aria-label */
export const EMAIL_GHOST_ARIA = 'Skip Trust ID and verify manually';

/* ── Passkey Fallback (shared across multiple screens) ── */

/** Passkey sign-in fallback prefix text */
export const PASSKEY_FALLBACK_PREFIX = 'Already have a Trust ID?';

/** Passkey sign-in fallback link text */
export const PASSKEY_FALLBACK_LINK = 'Sign in with passkey';

/** Passkey sign-in fallback aria-label (email capture) */
export const PASSKEY_FALLBACK_ARIA = 'Sign in with existing Trust ID passkey';

/** Passkey sign-in fallback aria-label (OTP screens) */
export const PASSKEY_FALLBACK_ARIA_LOGIN = 'Log in with existing Trust ID passkey';

/* ── OTP Entry ── */

/** Subtext template — shown below OTP headline with the user's email */
export const OTP_SUBTEXT = 'Check your inbox for a 6-digit code from Trust ID sent to';

/** Auto-submit hint (sr-only) */
export const OTP_HINT = 'Enter the 6-digit code sent to your email';

/** Resend timer text prefix (when countdown active) */
export const OTP_RESEND_TIMER_PREFIX = "Haven't received it? Resend in";

/** Resend link text (when countdown expired) */
export const OTP_RESEND_ACTIVE = "Haven't received it? Resend";

/** "Wrong email?" shortcut link text */
export const OTP_WRONG_EMAIL = 'Wrong email?';

/** "Wrong email?" shortcut aria-label */
export const OTP_WRONG_EMAIL_ARIA = 'Go back to change email address';

/** Default OTP value for static Figma display */
export const OTP_DEFAULT_VALUE = '';

/* ── OTP Error ── */

/** Error headline for OTP error screen */
export const OTP_ERROR_HEADLINE = "That code didn't work.";

/** Error body text (before email link) */
export const OTP_ERROR_BODY = "Let's try again. We sent a code to";

/** Error alert text (below OTP inputs, role="alert") */
export const OTP_ERROR_ALERT = "That code didn't match — check and try again.";

/** Error attempts remaining suffix */
export const OTP_ERROR_ATTEMPTS_SUFFIX = 'attempts left.';

/** Default attempts remaining for static Figma display */
export const OTP_ERROR_DEFAULT_ATTEMPTS = 2;

/** OTP error hint (sr-only) */
export const OTP_ERROR_HINT = 'Re-enter the 6-digit verification code';

/** Resend link text on error screen (active, no timer) */
export const OTP_ERROR_RESEND = "Haven't received it? Resend";

/** Resend link aria-label */
export const OTP_ERROR_RESEND_ARIA = 'Resend verification code';

/* ── Email Confirm (Code Instead) ── */

/** Headline for email confirm screen (code fallback from passkey) */
export const EMAIL_CONFIRM_HEADLINE = 'Verify with a code instead.';

/** Body text explaining code-based verification */
export const EMAIL_CONFIRM_BODY =
  "We'll send a 6-digit code to the email associated with your Trust ID account.";

/** Send Code button label */
export const EMAIL_CONFIRM_BTN = 'Send Code';

/** Send Code button aria-label */
export const EMAIL_CONFIRM_BTN_ARIA = 'Send verification code to this email';

/** Back to passkey ghost button label */
export const EMAIL_CONFIRM_BACK = 'Back to passkey';

/** Back to passkey ghost button aria-label */
export const EMAIL_CONFIRM_BACK_ARIA = 'Go back to passkey verification';

/* ── Passkey Setup ── */

/** Skip link text on passkey setup screen */
export const PASSKEY_SKIP_LABEL = 'Skip for Now';

/** Skip link aria-label */
export const PASSKEY_SKIP_ARIA = 'Skip passkey setup for now';

/** Set Up Passkey button aria-label */
export const PASSKEY_SETUP_ARIA = 'Set up passkey for biometric verification';

/* ── Passkey Verify ── */

/** Primary button label for passkey verify screen (simulated success for Figma) */
export const PASSKEY_VERIFY_BTN = 'Simulate Passkey Success';

/** Primary button aria-label */
export const PASSKEY_VERIFY_BTN_ARIA = 'Simulate passkey authentication success';

/** Secondary button — code fallback */
export const PASSKEY_USE_CODE = 'Use code instead';

/** Secondary button aria-label */
export const PASSKEY_USE_CODE_ARIA = 'Use verification code instead of passkey';

/** Waiting status text shown in passkey preview */
export const PASSKEY_VERIFY_WAITING = 'Waiting for biometric confirmation...';
