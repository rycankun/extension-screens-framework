/**
 * DnsConfirm Stories — Screen Component (Success State)
 *
 * All variant stories for the Do Not Sell / Share confirmation screen.
 * Each named export = one Figma frame import target.
 *
 * This screen shows a SUCCESS confirmation (not an opt-out prompt).
 * Layout: BackArrow header → green check → title → body → note →
 * "Return to Site" button → micro text → PoweredBadge.
 *
 * @see src/components/screens/preferences/DnsConfirm.tsx for implementation
 * @see docs/PRD.md § 4.3 — DnsConfirm specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DnsConfirm } from './DnsConfirm';

const meta: Meta<typeof DnsConfirm> = {
  title: 'Screens/Preferences/DnsConfirm',
  component: DnsConfirm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof DnsConfirm>;

/** DNS confirmation success — light theme */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** DNS confirmation success — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
