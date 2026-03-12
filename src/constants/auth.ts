/**
 * Authentication Constants — TrustID Extension Screen Library
 *
 * Labels, placeholders, and button text shared across the six
 * authentication screens (EmailCapture, OtpEntry, OtpError,
 * EmailConfirm, PasskeySetup, PasskeyVerify).
 *
 * @see src/components/screens/authentication/ — all six auth screens
 * @see DIRECTIVES.md § 8.1 — no hardcoded strings in components
 */

/* ── Email Capture ── */

/** Input placeholder for email capture screen */
export const EMAIL_PLACEHOLDER = 'Enter your email address';

/** Skip link text on email capture screen */
export const EMAIL_SKIP_LABEL = 'Skip for now';

/** Re-auth warning icon type */
export const REAUTH_ICON = 'info' as const;

/* ── OTP Entry ── */

/** Subtext template — shown below OTP headline with the user's email */
export const OTP_SUBTEXT_PREFIX = 'Enter the code sent to';

/** Verify button label */
export const OTP_VERIFY_LABEL = 'Verify';

/** Resend code link text */
export const OTP_RESEND_LABEL = 'Resend Code';

/** Default OTP value for static Figma display */
export const OTP_DEFAULT_VALUE = '';

/* ── OTP Error ── */

/** Error headline for OTP error screen */
export const OTP_ERROR_HEADLINE = 'Verification failed';

/** Error body text */
export const OTP_ERROR_BODY =
  'The code you entered is incorrect or has expired. Please try again or request a new code.';

/** Try Again button label */
export const OTP_TRY_AGAIN_LABEL = 'Try Again';

/* ── Email Confirm ── */

/** Success headline for email confirmation screen */
export const EMAIL_CONFIRM_HEADLINE = 'Email Verified';

/** Success body text */
export const EMAIL_CONFIRM_BODY =
  'Your email has been verified successfully. You can now continue.';

/** Continue button label */
export const EMAIL_CONFIRM_BTN = 'Continue';

/* ── Passkey Setup ── */

/** Skip link text on passkey setup screen */
export const PASSKEY_SKIP_LABEL = 'Skip for now';

/* ── Passkey Verify ── */

/** Verify button label for passkey verify screen */
export const PASSKEY_VERIFY_BTN = 'Verify with Passkey';

/** Use Password fallback link */
export const PASSKEY_USE_PASSWORD = 'Use Password Instead';
