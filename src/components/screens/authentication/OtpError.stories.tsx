/**
 * OtpError Stories — Screen Component
 *
 * All variant stories for the OTP verification error screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/authentication/OtpError.tsx for implementation
 * @see docs/PRD.md § 4.2 — OtpError specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OtpError } from './OtpError';

const meta: Meta<typeof OtpError> = {
  title: 'Screens/Authentication/OtpError',
  component: OtpError,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof OtpError>;

/** OTP error — light theme */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** OTP error — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
