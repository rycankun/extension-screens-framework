/**
 * Timing Constants — TrustID Extension Screen Library
 *
 * All timing values used by components for CSS transitions, delays,
 * and auto-dismiss behavior. These are defined here as the canonical
 * source and referenced in CSS Modules via --tid-duration-* tokens
 * where applicable.
 *
 * Note: Figma exports are static — these values are only active
 * in the live Storybook preview, not in imported Figma frames.
 *
 * @see docs/PRD.md § Timing Constants for the full specification
 */

export const TIMING = {
  /** Duration of the age-gate cover fade-out CSS transition (ms) */
  FADE_DURATION: 600,

  /** Delay before restoring focus after overlay close (ms) */
  FOCUS_RESTORE_DELAY: 250,

  /** Delay before floating icon appears after banner dismiss (ms) */
  ICON_APPEAR_DELAY: 400,

  /** How long the success screen stays visible before auto-dismiss (ms) */
  SUCCESS_DISPLAY_MS: 1500,

  /** Delay after credential share action before transitioning (ms) */
  CREDENTIAL_SHARE_DELAY: 800,

  /** Delay after DOB verification before transitioning (ms) */
  DOB_VERIFIED_DELAY: 800,

  /** OTP resend countdown duration (seconds) */
  OTP_RESEND_SECONDS: 30,

  /** Delay before auto-focusing the next input after screen transition (ms) */
  AUTO_FOCUS_DELAY: 120,
} as const;
