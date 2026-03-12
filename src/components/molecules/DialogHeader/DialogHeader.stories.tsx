/**
 * DialogHeader Stories — Molecule Component
 *
 * Showcases the standard banner header with logo, title, and close button.
 *
 * @see src/components/molecules/DialogHeader/DialogHeader.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DialogHeader } from './DialogHeader';
import { SCREEN_TITLES, SCREENS } from '../../../constants';

const meta: Meta<typeof DialogHeader> = {
  title: 'Molecules/DialogHeader',
  component: DialogHeader,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '380px' /* decorator constraint, no matching token */,
          background: 'var(--tid-surface)',
          borderRadius: 'var(--tid-radius-sm)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DialogHeader>;

/** Default header with consent screen title */
export const Default: Story = {
  args: {
    title: SCREEN_TITLES[SCREENS.CONSENT_EU],
    onClose: () => {},
  },
};

/** Header for email capture screen */
export const EmailCapture: Story = {
  args: {
    title: SCREEN_TITLES[SCREENS.EMAIL_CAPTURE],
    onClose: () => {},
  },
};

/** Header for cookie preferences screen */
export const CookiePrefs: Story = {
  args: {
    title: SCREEN_TITLES[SCREENS.COOKIE_PREFS],
    onClose: () => {},
  },
};

/** Header without close button (e.g., success screen) */
export const NoCloseButton: Story = {
  args: {
    title: SCREEN_TITLES[SCREENS.SUCCESS],
    showClose: false,
  },
};
