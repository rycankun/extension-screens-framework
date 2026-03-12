/**
 * Screen Renderer — Figma Plugin Shared Utilities
 *
 * Converts React screen component HTML (from renderToStaticMarkup)
 * into Figma frame nodes using the html2figma approach.
 *
 * Placeholder — full rendering implementation will be built in the
 * screen import step. The screen registry below tracks which screens
 * the plugin knows about and their metadata.
 *
 * @see figma/scripts/generate-screens.ts for the HTML generation
 * @see src/constants/screens.ts for the canonical screen ID list
 */

/* ── Screen Registry ──
   Tracks which screen components are available for Figma import.
   Updated every time a new screen component is built. */

export interface ScreenEntry {
  /** Screen ID from SCREENS constant */
  id: string;
  /** Component name (PascalCase) */
  component: string;
  /** Screen category for Figma page organization */
  category: string;
  /** Number of story variants available */
  variants: number;
}

/**
 * Registry of all screen components available for Figma import.
 * Each entry maps to a built React screen component with stories.
 *
 * @see src/constants/screens.ts — SCREENS constant for ID values
 */
export const SCREEN_REGISTRY: ScreenEntry[] = [
  /* ── Consent Screens (Step 9) ── */
  {
    id: 'consent-t1',
    component: 'ConsentEU',
    category: 'consent',
    variants: 6,
  },
  {
    id: 'consent-t2',
    component: 'ConsentUS',
    category: 'consent',
    variants: 4,
  },
  {
    id: 'consent-t3',
    component: 'ConsentUSStd',
    category: 'consent',
    variants: 2,
  },

  /* ── Authentication Screens (Step 10) ── */
  {
    id: 'email-capture',
    component: 'EmailCapture',
    category: 'authentication',
    variants: 2,
  },
  {
    id: 'otp-entry',
    component: 'OtpEntry',
    category: 'authentication',
    variants: 2,
  },
  {
    id: 'otp-error',
    component: 'OtpError',
    category: 'authentication',
    variants: 2,
  },
  {
    id: 'email-confirm',
    component: 'EmailConfirm',
    category: 'authentication',
    variants: 2,
  },
  {
    id: 'passkey-setup',
    component: 'PasskeySetup',
    category: 'authentication',
    variants: 2,
  },
  {
    id: 'passkey-verify',
    component: 'PasskeyVerify',
    category: 'authentication',
    variants: 2,
  },

  /* ── Preference Screens (Step 11) ── */
  {
    id: 'cookie-prefs',
    component: 'CookiePrefs',
    category: 'preferences',
    variants: 8,
  },
  {
    id: 'cookie-email',
    component: 'CookieEmail',
    category: 'preferences',
    variants: 2,
  },
  {
    id: 'dns-confirm',
    component: 'DnsConfirm',
    category: 'preferences',
    variants: 2,
  },
  {
    id: 'sharing-settings',
    component: 'SharingSettings',
    category: 'preferences',
    variants: 4,
  },
  {
    id: 'dsr-intake',
    component: 'DsrIntake',
    category: 'preferences',
    variants: 6,
  },
];
