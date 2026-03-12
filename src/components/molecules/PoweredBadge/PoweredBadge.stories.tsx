/**
 * PoweredBadge Stories — Molecule Component
 *
 * Showcases the "Powered by Trust ID · Privacy" attribution footer
 * with icon image and linked text.
 *
 * @see src/components/molecules/PoweredBadge/PoweredBadge.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PoweredBadge } from './PoweredBadge';

const meta: Meta<typeof PoweredBadge> = {
  title: 'Molecules/PoweredBadge',
  component: PoweredBadge,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof PoweredBadge>;

/** Default powered badge with Trust ID and Privacy links */
export const Default: Story = {};

/** Badge in footer context with surface background */
export const InFooter: Story = {
  render: () => (
    <div
      style={{
        width: '340px' /* decorator constraint, no matching token */,
        padding: 'var(--tid-sp-4)',
        display: 'flex',
        justifyContent: 'center',
        background: 'var(--tid-surface)',
        borderRadius: 'var(--tid-radius-sm)',
      }}
    >
      <PoweredBadge />
    </div>
  ),
};
