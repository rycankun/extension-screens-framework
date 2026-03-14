/**
 * useJurisdiction Hook — TrustID Extension Screen Library
 *
 * Provides jurisdiction configuration (legal text, consent model, toggle defaults)
 * based on the jurisdiction variant prop. Components import this hook to access
 * jurisdiction-specific data without direct constant imports.
 *
 * @see src/constants/jurisdictions.ts for jurisdiction configs
 * @see src/types/screens.ts for the Jurisdiction type
 */
import { useMemo } from 'react';
import type { Jurisdiction } from '../types/screens';
import { JURISDICTION_CONFIGS, type JurisdictionConfig } from '../constants/jurisdictions';

/**
 * Returns the jurisdiction configuration for the given jurisdiction tier.
 *
 * @param jurisdiction - The jurisdiction tier ('eu', 'us-strict', 'us-standard')
 * @returns The full jurisdiction config (consent model, legal text, toggle defaults)
 */
export function useJurisdiction(
  jurisdiction: Jurisdiction = 'us-standard',
): JurisdictionConfig {
  return useMemo(
    () => JURISDICTION_CONFIGS[jurisdiction],
    [jurisdiction],
  );
}
