/**
 * Variant Text Constants — TrustID Extension Screen Library
 *
 * All screen text that changes across variant axes lives here.
 * Screen components read from this map via data-variant-key lookups.
 * 62 keys total — see docs/reference/SCREEN-VARIANT-GUIDE.md for the
 * complete key list and per-screen mapping.
 *
 * @see docs/PRD.md § Variant System for axis definitions
 * @see docs/reference/variants-reference.js for the original key set
 */

/* ── Shared Data Copy ── */

/** Toggle sublabels for the Cookie Preferences Shared Data tab */
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
