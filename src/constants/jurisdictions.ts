/**
 * Jurisdiction Constants — TrustID Extension Screen Library
 *
 * Defines the three jurisdiction tiers (EU, US Strict, US Standard),
 * their associated state lists, and legal text templates. Screen
 * components import from here to render jurisdiction-appropriate content.
 *
 * @see docs/PRD.md § Variant System for jurisdiction axis definition
 * @see CLAUDE.md § Variant System for US state classifications
 */

/* ── Jurisdiction Identifiers ── */

/** Jurisdiction tier values used as variant props */
export const JURISDICTIONS = {
  EU: 'eu',
  US_STRICT: 'us-strict',
  US_STANDARD: 'us-standard',
} as const;

export type Jurisdiction =
  (typeof JURISDICTIONS)[keyof typeof JURISDICTIONS];

/* ── US State Classifications ── */

/** States with strict privacy laws (CCPA-level opt-out requirements) */
export const US_STRICT_STATES = [
  'CA', 'CO', 'CT', 'DE', 'GA', 'MD', 'MN', 'MT',
  'NH', 'NJ', 'OR', 'TN', 'TX',
] as const;

/** All other US states with standard opt-out model */
export const US_STANDARD_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'DC', 'FL', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MA',
  'MI', 'MS', 'MO', 'NE', 'NV', 'NM', 'NY', 'NC',
  'ND', 'OH', 'OK', 'PA', 'RI', 'SC', 'SD', 'UT',
  'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

/* ── Jurisdiction Configuration ── */

export interface JurisdictionConfig {
  /** Display name for the jurisdiction tier */
  label: string;
  /** Consent model: opt-in (EU) or opt-out (US) */
  consentModel: 'opt-in' | 'opt-out';
  /** Legal text shown at the bottom of consent screens */
  legalNotice: string;
}

/** Configuration for each jurisdiction tier */
export const JURISDICTION_CONFIGS: Record<Jurisdiction, JurisdictionConfig> = {
  [JURISDICTIONS.EU]: {
    label: 'European Union (GDPR)',
    consentModel: 'opt-in',
    legalNotice:
      'We use cookies and similar technologies to provide our services. ' +
      'You can manage your preferences at any time. By clicking "Accept All," ' +
      'you consent to our use of cookies as described in our Cookie Policy.',
  },
  [JURISDICTIONS.US_STRICT]: {
    label: 'US — Strict Privacy States',
    consentModel: 'opt-out',
    legalNotice:
      'Under applicable state privacy law, you have the right to opt out ' +
      'of the sale or sharing of your personal information. Toggle categories ' +
      'off to exercise your rights.',
  },
  [JURISDICTIONS.US_STANDARD]: {
    label: 'US — Standard States',
    consentModel: 'opt-out',
    legalNotice:
      'We use cookies to improve your experience. You may opt out of ' +
      'non-essential cookies using the controls above.',
  },
};
