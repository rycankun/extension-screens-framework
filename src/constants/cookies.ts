/**
 * Cookie Detail Constants — TrustID Extension Screen Library
 *
 * Individual cookie entries for each consent category, shown in the
 * expandable <details> sections of the CookiePrefs Cookies tab.
 * Each category has a list of cookies with name, description, party,
 * and retention duration.
 *
 * Predecessor ref: cookie-prefs.html lines 90-181
 *
 * @see src/components/screens/preferences/CookiePrefs.tsx — consumer
 * @see src/constants/consent.ts — CONSENT_CATEGORIES for toggle labels
 * @see DIRECTIVES.md § 8.1 — no hardcoded strings in components
 */

/* ── Cookie Entry Type ── */

/** Individual cookie entry in an expandable details section */
export interface CookieEntry {
  /** Cookie name (e.g., "__sv_session") */
  name: string;
  /** Description — purpose + party + retention */
  description: string;
}

/* ── Cookie Details Per Category ── */

/** Expandable cookie list for Essential cookies category */
export const ESSENTIAL_COOKIES: CookieEntry[] = [
  { name: '__sv_session', description: 'Session identifier · 1st party · Session' },
  { name: '__sv_csrf', description: 'CSRF protection token · 1st party · Session' },
  { name: '__sv_lb', description: 'Load balancer affinity · 1st party · Session' },
];

/** Expandable cookie list for Performance & Analytics category */
export const ANALYTICS_COOKIES: CookieEntry[] = [
  { name: '_ga', description: 'Google Analytics visitor ID · 3rd party (Google) · 24 months' },
  { name: '_ga_*', description: 'GA4 session state · 3rd party (Google) · 24 months' },
  { name: '__sv_perf', description: 'Page-load timing · 1st party · 30 days' },
];

/** Expandable cookie list for Personalization category */
export const PERSONALIZATION_COOKIES: CookieEntry[] = [
  { name: '__sv_lang', description: 'Language preference · 1st party · 12 months' },
  { name: '__sv_region', description: 'Region/locale · 1st party · 12 months' },
  { name: '__sv_theme', description: 'Display theme (light/dark) · 1st party · 12 months' },
];

/** Expandable cookie list for Advertising category */
export const ADVERTISING_COOKIES: CookieEntry[] = [
  { name: '_fbp', description: 'Facebook pixel · 3rd party (Meta) · 90 days' },
  { name: 'IDE', description: 'Google DoubleClick ad targeting · 3rd party (Google) · 13 months' },
  { name: '__sv_ads', description: 'Campaign attribution · 1st party · 30 days' },
];

/* ── Toggle Sublabels Per Category (from predecessor) ── */

/** Sublabel text for Essential cookies — matches predecessor desc-essential */
export const ESSENTIAL_SUBLABEL =
  'Required to operate the site (login, security, load balancing). Always on. Session duration.';

/** Sublabel text for Performance & Analytics — matches predecessor desc-perf-analytics */
export const ANALYTICS_SUBLABEL =
  'Measures page views, site speed, and errors to improve reliability. Retained up to 24 months.';

/** Sublabel text for Personalization — matches predecessor desc-person */
export const PERSONALIZATION_SUBLABEL =
  'Remembers your language, region, and display preferences. Retained up to 12 months.';

/** Sublabel text for Advertising — matches predecessor desc-ads */
export const ADVERTISING_SUBLABEL =
  'Delivers relevant ads and measures campaign effectiveness across sites. Retained up to 13 months.';

/* ── "View cookies" Summary Label ── */

/** Summary text for expandable cookie details */
export const VIEW_COOKIES_SUMMARY = 'View cookies';

/* ── Micro Text ── */

/** "You can update these anytime" micro text below Save button */
export const COOKIE_UPDATE_HINT = 'You can update these anytime by clicking the Trust ID icon.';
