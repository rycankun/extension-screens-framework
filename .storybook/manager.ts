/**
 * Storybook Manager Configuration — TrustID Extension Screen Library
 *
 * Customizes the Storybook UI chrome (sidebar, toolbar, panels).
 * Applies TrustID branding to the sidebar and configures the story
 * sort order to match the component hierarchy:
 *   Overview → Foundation → Atoms → Molecules → Organisms → Screens → Flows
 *
 * @see .storybook/preview.ts for story-level theming (data-theme toggle)
 */
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

/* ── TrustID Storybook Theme ──
   Brand colors from the TrustID design system applied to the
   Storybook manager UI (sidebar, toolbar, panel headers). */
const trustidTheme = create({
  base: 'light',

  /* Brand */
  brandTitle: 'TrustID Screen Library',
  brandUrl: 'https://github.com/rycankun/extension-screens-framework',

  /* Colors — match TrustID palette */
  colorPrimary: '#0E6FFF',        /* --tid-brand */
  colorSecondary: '#0E6FFF',      /* --tid-brand */

  /* UI chrome */
  appBg: '#F5F7FA',               /* --tid-page-bg */
  appContentBg: '#FFFFFF',        /* --tid-surface */
  appBorderColor: '#E5E7EB',      /* --tid-border */
  appBorderRadius: 4,             /* --tid-radius-sm */

  /* Typography */
  fontBase: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontCode: "'SF Mono', 'Fira Code', 'Consolas', monospace",

  /* Text */
  textColor: '#0B1620',           /* --tid-ink */
  textInverseColor: '#F5F7FA',    /* --tid-page-bg */
  textMutedColor: '#6B7280',      /* --tid-text-secondary */

  /* Toolbar */
  barTextColor: '#374151',        /* --tid-text-body */
  barSelectedColor: '#0E6FFF',    /* --tid-brand */
  barBg: '#FFFFFF',               /* --tid-surface */

  /* Inputs */
  inputBg: '#FFFFFF',             /* --tid-surface */
  inputBorder: '#D1D5DB',         /* --tid-border-input */
  inputTextColor: '#0B1620',      /* --tid-ink */
  inputBorderRadius: 4,           /* --tid-radius-sm */
});

addons.setConfig({
  theme: trustidTheme,
  sidebar: {
    showRoots: true,
  },
});
