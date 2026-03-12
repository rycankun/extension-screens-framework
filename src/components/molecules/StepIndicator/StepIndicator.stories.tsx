/**
 * StepIndicator Stories — Molecule Component
 *
 * Showcases the step progress indicator at various stages.
 *
 * @see src/components/molecules/StepIndicator/StepIndicator.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator } from './StepIndicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentStep: { control: { type: 'number', min: 1, max: 5 } },
    totalSteps: { control: { type: 'number', min: 2, max: 5 } },
  },
};
export default meta;

type Story = StoryObj<typeof StepIndicator>;

/** Step 1 of 3 — email capture */
export const Step1Of3: Story = {
  args: { currentStep: 1, totalSteps: 3 },
};

/** Step 2 of 3 — OTP verification */
export const Step2Of3: Story = {
  args: { currentStep: 2, totalSteps: 3 },
};

/** Step 3 of 3 — passkey setup (final step) */
export const Step3Of3: Story = {
  args: { currentStep: 3, totalSteps: 3 },
};
