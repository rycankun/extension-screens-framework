/**
 * OtpEntry Stories — Screen Component
 *
 * All variant stories for the OTP verification entry screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/authentication/OtpEntry.tsx for implementation
 * @see docs/PRD.md § 4.2 — OtpEntry specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OtpEntry } from './OtpEntry';

const meta: Meta<typeof OtpEntry> = {
  title: 'Screens/Authentication/OtpEntry',
  component: OtpEntry,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    email: { control: 'text' },
    resendCountdown: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof OtpEntry>;

/** OTP entry — light theme, empty digits */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** OTP entry — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
