/**
 * Flow Constants — TrustID Extension Screen Library
 *
 * Defines the screen transition graph for all user flows.
 * Each flow is a named sequence of screen IDs representing the
 * happy path. The full graph has 170 edges (including error paths,
 * back navigation, and conditional branches).
 *
 * Placeholder — full graph will be populated when screen components
 * are built and flow documentation is authored.
 *
 * @see docs/PRD.md § Flow Definitions for flow specifications
 * @see stories/flows/ for Mermaid MDX documentation
 */
import { SCREENS } from './screens';

/* ── Flow Identifiers ── */

/** Named flow sequences for documentation and testing */
export const FLOWS = {
  /** EU first-time user: consent → auth → prefs → done */
  FIRST_TIME_EU: [
    SCREENS.CONSENT_EU,
    SCREENS.EMAIL_CAPTURE,
    SCREENS.OTP_ENTRY,
    SCREENS.PASSKEY_SETUP,
    SCREENS.COOKIE_PREFS,
    SCREENS.SUCCESS,
  ],

  /** US strict first-time user */
  FIRST_TIME_US_STRICT: [
    SCREENS.CONSENT_US,
    SCREENS.EMAIL_CAPTURE,
    SCREENS.OTP_ENTRY,
    SCREENS.PASSKEY_SETUP,
    SCREENS.COOKIE_PREFS,
    SCREENS.SUCCESS,
  ],

  /** Returning verified user — no banner, toast only */
  RETURNING_VERIFIED: [
    SCREENS.TOAST_WELCOME,
    SCREENS.TOAST_MANAGE,
  ],

  /** Age gate flow — verify age before consent */
  AGE_GATE: [
    SCREENS.AGE_GATE_COVER,
    SCREENS.DOB_ENTRY,
  ],
} as const;
