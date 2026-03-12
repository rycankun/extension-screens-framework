/**
 * CookieEmail Stories — Screen Component
 *
 * All variant stories for the cookie email capture screen.
 * Each named export = one Figma frame import target.
 *
 * Stories cover:
 *   - Light / Dark theme variants
 *   - Pre-filled email state
 *
 * @see src/components/screens/preferences/CookieEmail.tsx for implementation
 * @see docs/PRD.md § 4.3 — CookieEmail specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CookieEmail } from './CookieEmail';

const meta: Meta<typeof CookieEmail> = {
  title: 'Screens/Preferences/CookieEmail',
  component: CookieEmail,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    email: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof CookieEmail>;

/** Cookie email capture — light theme (default empty state) */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** Cookie email capture — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

/** Cookie email capture — pre-filled email address */
export const WithEmail: Story = {
  args: {
    theme: 'light',
    email: 'user@example.com',
  },
};
