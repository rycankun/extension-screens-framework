/**
 * OtpEntry Stories — Screen Component
 *
 * All variant stories for the OTP verification entry screen.
 * Each named export = one Figma frame import target.
 *
 * Variants cover: light/dark theme, countdown active/expired,
 * and pre-filled OTP digits for static Figma display.
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
    otpValue: { control: 'text' },
    resendCountdown: { control: 'number' },
    onClose: { action: 'close' },
    onBack: { action: 'back' },
    onResend: { action: 'resend' },
    onWrongEmail: { action: 'wrongEmail' },
    onPasskeySignIn: { action: 'passkeySignIn' },
  },
};
export default meta;

type Story = StoryObj<typeof OtpEntry>;

/** OTP entry — light theme, countdown active (default 27s) */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** OTP entry — dark theme, countdown active */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

/** OTP entry — light theme, countdown expired (resend link visible) */
export const ResendActive: Story = {
  args: {
    theme: 'light',
    resendCountdown: 0,
  },
};

/** OTP entry — dark theme, countdown expired (resend link visible) */
export const ResendActiveDark: Story = {
  args: {
    theme: 'dark',
    resendCountdown: 0,
  },
};
