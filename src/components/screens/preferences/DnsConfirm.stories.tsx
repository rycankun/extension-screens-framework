/**
 * DnsConfirm Stories — Screen Component
 *
 * All variant stories for the Do Not Sell confirmation screen.
 * Each named export = one Figma frame import target.
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

/** Do Not Sell confirmation — light theme */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Do Not Sell confirmation — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
