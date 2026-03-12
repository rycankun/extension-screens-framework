/**
 * DialogHeader Stories — Molecule Component
 *
 * Showcases the standard banner header with logo image and close button.
 * The header displays a site logo (e.g., StreamVault brand lockup) instead
 * of a text title.
 *
 * @see src/components/molecules/DialogHeader/DialogHeader.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DialogHeader } from './DialogHeader';

/** StreamVault brand lockup logo path — used as the default header logo */
const STREAMVAULT_LOGO = '/assets/StreamVault-BrandLockup-Primary.svg';

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

/** Default header with StreamVault logo and close button */
export const Default: Story = {
  args: {
    logoSrc: STREAMVAULT_LOGO,
    logoAlt: 'StreamVault',
    onClose: () => {},
  },
};

/** Header with logo but without close button (e.g., success screen) */
export const NoCloseButton: Story = {
  args: {
    logoSrc: STREAMVAULT_LOGO,
    logoAlt: 'StreamVault',
    showClose: false,
  },
};

/** Header with close button only (no logo provided) */
export const NoLogo: Story = {
  args: {
    onClose: () => {},
  },
};
