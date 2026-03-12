/**
 * BackArrow Stories — Molecule Component
 *
 * Showcases the back navigation button.
 *
 * @see src/components/molecules/BackArrow/BackArrow.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BackArrow } from './BackArrow';

const meta: Meta<typeof BackArrow> = {
  title: 'Molecules/BackArrow',
  component: BackArrow,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof BackArrow>;

/** Default back arrow button */
export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
