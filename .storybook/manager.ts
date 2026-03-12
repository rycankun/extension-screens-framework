/**
 * Storybook Manager Configuration — TrustID Extension Screen Library
 *
 * Customizes the Storybook UI chrome (sidebar, toolbar, panels).
 * Sets the brand title and configures the sidebar story sort order
 * to match the component hierarchy: Foundation → Atoms → Molecules →
 * Organisms → Screens → Flows.
 */
import { addons } from '@storybook/manager-api';

addons.setConfig({
  sidebar: {
    showRoots: true,
  },
});
