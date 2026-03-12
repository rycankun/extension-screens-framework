/**
 * PasskeySetup Stories — Screen Component
 *
 * All variant stories for the passkey setup screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/authentication/PasskeySetup.tsx for implementation
 * @see docs/PRD.md § 4.2 — PasskeySetup specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PasskeySetup } from './PasskeySetup';

const meta: Meta<typeof PasskeySetup> = {
  title: 'Screens/Authentication/PasskeySetup',
  component: PasskeySetup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof PasskeySetup>;

/** Passkey setup — light theme */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Passkey setup — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
