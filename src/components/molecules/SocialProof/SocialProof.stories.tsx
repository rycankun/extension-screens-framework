/**
 * SocialProof Stories — Molecule Component
 *
 * Showcases the trust signal badge with various text content.
 *
 * @see src/components/molecules/SocialProof/SocialProof.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SocialProof } from './SocialProof';

const meta: Meta<typeof SocialProof> = {
  title: 'Molecules/SocialProof',
  component: SocialProof,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof SocialProof>;

/** Default trust signal for consent screens */
export const Default: Story = {
  render: () => (
    <SocialProof>
      End-to-end encrypted · <SocialProof.Bold>No data stored</SocialProof.Bold> · <SocialProof.Bold>No tracking</SocialProof.Bold>
    </SocialProof>
  ),
};
