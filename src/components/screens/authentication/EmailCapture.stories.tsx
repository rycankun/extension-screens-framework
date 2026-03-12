/**
 * EmailCapture Stories — Screen Component
 *
 * All variant stories for the email capture authentication screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/authentication/EmailCapture.tsx for implementation
 * @see docs/PRD.md § 4.2 — EmailCapture specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmailCapture } from './EmailCapture';

const meta: Meta<typeof EmailCapture> = {
  title: 'Screens/Authentication/EmailCapture',
  component: EmailCapture,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    email: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof EmailCapture>;

/** Email capture — light theme, empty input */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Email capture — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};
