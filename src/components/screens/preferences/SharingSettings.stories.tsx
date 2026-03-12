/**
 * SharingSettings Stories — Screen Component
 *
 * All variant stories for the credential sharing settings screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/preferences/SharingSettings.tsx for implementation
 * @see docs/PRD.md § 4.3 — SharingSettings specification
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
    emailShared: { control: 'boolean' },
    dobShared: { control: 'boolean' },
    ageShared: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof SharingSettings>;

/** Sharing settings — light theme, all off */
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

/** All credentials shared */
export const AllShared: Story = {
  args: {
    theme: 'light',
    emailShared: true,
    dobShared: true,
    ageShared: true,
  },
};

/** Only email shared */
export const EmailOnly: Story = {
  args: {
    theme: 'light',
    emailShared: true,
    dobShared: false,
    ageShared: false,
  },
};
