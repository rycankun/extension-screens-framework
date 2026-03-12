/**
 * SharingSettings Stories — Screen Component
 *
 * All variant stories for the credential sharing details screen.
 * Each named export = one Figma frame import target.
 *
 * The SharingSettings screen shows a read-only definition list of
 * credential sharing metadata with a Revoke Sharing button.
 * No toggle controls — this is an informational display screen.
 *
 * @see src/components/screens/preferences/SharingSettings.tsx for implementation
 * @see docs/PRD.md section 4.3 — SharingSettings specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SharingSettings } from './SharingSettings';

const meta: Meta<typeof SharingSettings> = {
  title: 'Screens/Preferences/SharingSettings',
  component: SharingSettings,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof SharingSettings>;

/** Sharing settings — light theme, credential definition list */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Sharing settings — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
