/**
 * EmailConfirm Stories — Screen Component
 *
 * All variant stories for the email verification confirmation screen.
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
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof EmailConfirm>;

/** Email confirmed — light theme */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Email confirmed — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
