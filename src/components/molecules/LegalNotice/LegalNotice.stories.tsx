/**
 * LegalNotice Stories — Molecule Component
 *
 * Showcases jurisdiction-specific legal notices with icon + text.
 *
 * @see src/components/molecules/LegalNotice/LegalNotice.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LegalNotice } from './LegalNotice';
import { JURISDICTION_CONFIGS, JURISDICTIONS } from '../../../constants';

const meta: Meta<typeof LegalNotice> = {
  title: 'Molecules/LegalNotice',
  component: LegalNotice,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '340px' /* decorator constraint, no matching token */ }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LegalNotice>;

/** EU GDPR legal notice */
export const EU: Story = {
  args: {
    text: JURISDICTION_CONFIGS[JURISDICTIONS.EU].legalNotice,
    icon: 'info',
  },
};

/** US Strict states legal notice */
export const USStrict: Story = {
  args: {
    text: JURISDICTION_CONFIGS[JURISDICTIONS.US_STRICT].legalNotice,
    icon: 'shield',
  },
};

/** US Standard states legal notice */
export const USStandard: Story = {
  args: {
    text: JURISDICTION_CONFIGS[JURISDICTIONS.US_STANDARD].legalNotice,
    icon: 'info',
  },
};

/** Warning variant */
export const Warning: Story = {
  args: {
    text: 'Your credential expires in 7 days. Please renew to maintain access.',
    icon: 'warning',
  },
};
