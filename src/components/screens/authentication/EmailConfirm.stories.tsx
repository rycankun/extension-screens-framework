/**
 * EmailConfirm Stories — Screen Component
 *
 * All variant stories for the "Verify with a code instead" screen.
 * This is the passkey fallback screen where the user requests a
 * verification code sent to their email — NOT an "email verified"
 * success screen.
 *
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/authentication/EmailConfirm.tsx for implementation
 * @see docs/PRD.md § 4.2 — EmailConfirm specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmailConfirm } from './EmailConfirm';

const meta: Meta<typeof EmailConfirm> = {
  title: 'Screens/Authentication/EmailConfirm',
  component: EmailConfirm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Verify with a code instead — passkey fallback screen. ' +
          'The user can request a 6-digit verification code to their email ' +
          'as an alternative to passkey authentication.',
      },
    },
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    email: { control: 'text' },
    onClose: { action: 'close' },
    onBack: { action: 'back' },
    onSendCode: { action: 'sendCode' },
    onBackToPasskey: { action: 'backToPasskey' },
  },
};
export default meta;

type Story = StoryObj<typeof EmailConfirm>;

/** Code fallback — light theme (default email pre-filled) */
export const Light: Story = {
  args: {
    theme: 'light',
    email: 'alex@email.com',
  },
};

/** Code fallback — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
    email: 'alex@email.com',
  },
};
