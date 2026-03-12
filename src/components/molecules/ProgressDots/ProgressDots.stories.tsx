/**
 * ProgressDots Stories — Molecule Component
 *
 * Showcases step progress indicators at various positions.
 *
 * @see src/components/molecules/ProgressDots/ProgressDots.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressDots } from './ProgressDots';

const meta: Meta<typeof ProgressDots> = {
  title: 'Molecules/ProgressDots',
  component: ProgressDots,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ProgressDots>;

/** First step of 5 */
export const Step1of5: Story = {
  args: {
    total: 5,
    current: 1,
  },
};

/** Third step of 5 (middle) */
export const Step3of5: Story = {
  args: {
    total: 5,
    current: 3,
  },
};

/** Last step of 5 */
export const Step5of5: Story = {
  args: {
    total: 5,
    current: 5,
  },
};

/** Three-step flow at step 2 */
export const Step2of3: Story = {
  args: {
    total: 3,
    current: 2,
  },
};

/** All progress states */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tid-sp-8)', alignItems: 'center' }}>
      <ProgressDots total={5} current={1} />
      <ProgressDots total={5} current={2} />
      <ProgressDots total={5} current={3} />
      <ProgressDots total={5} current={4} />
      <ProgressDots total={5} current={5} />
    </div>
  ),
};
