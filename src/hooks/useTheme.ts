/**
 * useTheme Hook — TrustID Extension Screen Library
 *
 * Manages the data-theme attribute on a container element.
 * Used by screen components to apply light/dark theme token overrides.
 *
 * Note: In this component library, theme is typically passed as a prop
 * and applied via a wrapper div. This hook provides a programmatic
 * alternative for scenarios where prop-drilling is impractical.
 *
 * @see src/tokens/tokens.css for dark theme token overrides ([data-theme='dark'])
 * @see src/types/screens.ts for the Theme type
 */
import { useEffect, useRef, useCallback } from 'react';
import type { Theme } from '../types/screens';

/**
 * Applies a data-theme attribute to a container element.
 *
 * @param theme - The theme to apply ('light' or 'dark')
 * @returns A ref to attach to the container element
 */
export function useTheme<T extends HTMLElement = HTMLDivElement>(
  theme: Theme = 'light',
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-theme', theme);
    }
  }, [theme]);

  /** Programmatically toggle the theme */
  const toggle = useCallback(() => {
    if (ref.current) {
      const current = ref.current.getAttribute('data-theme') as Theme;
      const next: Theme = current === 'light' ? 'dark' : 'light';
      ref.current.setAttribute('data-theme', next);
    }
  }, []);

  return { ref, toggle };
}
