/**
 * Storybook Preview Configuration — TrustID Extension Screen Library
 *
 * Sets up global decorators, parameters, and theme context for all stories.
 * Imports the design token CSS so all components render with the correct
 * TrustID visual system. The a11y addon is configured for WCAG 2.1 AA.
 *
 * @see src/tokens/global.css for token imports and CSS reset
 * @see src/tokens/tokens.css for the --tid-* token definitions
 */
import type { Preview } from '@storybook/react';
import '../src/tokens/global.css';

const preview: Preview = {
  parameters: {
    /* ── Layout ── */
    layout: 'centered',

    /* ── Controls ── */
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /* ── Accessibility ── */
    a11y: {
      // WCAG 2.1 AA is the minimum standard for all components
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
};

export default preview;
