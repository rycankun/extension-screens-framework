/**
 * Storybook Main Configuration — TrustID Extension Screen Library
 *
 * Configures Storybook 8 with React + Vite framework. Stories are co-located
 * with components in src/ and foundation/flow docs live in stories/.
 * The a11y addon enables automated WCAG 2.1 AA testing per component.
 *
 * Static dirs serve public/ assets (brand logos, fonts) to the Storybook
 * dev server so they're available at the root path, matching the Vite dev
 * server behavior.
 *
 * @see .storybook/preview.ts for global decorators and theme setup
 * @see .storybook/manager.ts for sidebar branding
 */
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  /* ── Story Globs ── */
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../stories/**/*.stories.@(ts|tsx)',
    '../stories/**/*.mdx',
  ],

  /* ── Addons ── */
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],

  /* ── Framework ── */
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  /* ── Static Assets ──
     Serves public/ at the root path so brand logos and font files
     are accessible at /assets/logo.svg, /fonts/Inter.woff2, etc. */
  staticDirs: ['../public'],

  /* ── Vite Integration ── */
  viteFinal: async (config) => {
    // Path aliases are inherited from vite.config.ts automatically
    return config;
  },
};

export default config;
