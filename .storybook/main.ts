/**
 * Storybook Main Configuration — TrustID Extension Screen Library
 *
 * Configures Storybook 8 with React + Vite framework. Stories are co-located
 * with components in src/ and foundation/flow docs live in stories/.
 * The a11y addon enables automated WCAG 2.1 AA testing per component.
 *
 * @see .storybook/preview.ts for global decorators and theme setup
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

  /* ── Vite Integration ── */
  viteFinal: async (config) => {
    // Path aliases are inherited from vite.config.ts automatically
    return config;
  },
};

export default config;
