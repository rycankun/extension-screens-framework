/**
 * Storybook Preview Configuration — TrustID Extension Screen Library
 *
 * Sets up global decorators, parameters, and theme context for all stories.
 * Imports the design token CSS so all components render with the correct
 * TrustID visual system. The a11y addon is configured for WCAG 2.1 AA.
 *
 * Theme switching works by setting `data-theme` on `document.documentElement`,
 * which triggers the dark token overrides in tokens.css. A toolbar toggle
 * lets developers switch between light and dark mode in the Storybook UI.
 *
 * @see src/tokens/global.css for token imports and CSS reset
 * @see src/tokens/tokens.css for the --tid-* token definitions (light + dark)
 * @see .storybook/main.ts for story globs and addons
 */
import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import '../src/tokens/global.css';

/* ── Theme Decorator ──
   Reads the `theme` global from the Storybook toolbar and applies it
   as a `data-theme` attribute on the document root. This activates
   the dark token overrides defined in tokens.css [data-theme='dark']. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    /* Set a background color on the body so the Storybook canvas
       matches the expected page background for the active theme */
    document.body.style.backgroundColor =
      theme === 'dark' ? '#0C0E14' : '#F5F7FA';
  }, [theme]);

  return React.createElement(Story);
};

const preview: Preview = {
  /* ── Global Decorators ── */
  decorators: [withTheme],

  /* ── Global Types (Toolbar Controls) ── */
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  /* ── Initial Globals ── */
  initialGlobals: {
    theme: 'light',
  },

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
      /* WCAG 2.1 AA is the minimum standard for all components */
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
};

export default preview;
