/**
 * PasskeyVerify Stories — Screen Component
 *
 * All variant stories for the passkey verification screen.
 * Each named export = one Figma frame import target.
 *
 * Key visual features:
 *   - Person-outline SVG preview area (centered)
 *   - GREEN "Simulate Passkey Success" button (not default brand blue)
 *   - Secondary "Use code instead" button (not a text link)
 *
 * @see src/components/screens/authentication/PasskeyVerify.tsx for implementation
 * @see docs/PRD.md § 4.2 — PasskeyVerify specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PasskeyVerify } from './PasskeyVerify';

const meta: Meta<typeof PasskeyVerify> = {
  title: 'Screens/Authentication/PasskeyVerify',
  component: PasskeyVerify,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof PasskeyVerify>;

/** Passkey verify — light theme (primary Figma import target) */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Passkey verify — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
