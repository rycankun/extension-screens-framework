/**
 * Checkbox Stories — Atom Component
 *
 * Showcases checkbox states (checked, unchecked, disabled).
 *
 * @see src/components/atoms/Checkbox/Checkbox.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

/** Unchecked checkbox */
export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'I agree to the terms',
    onChange: () => {},
  },
};

/** Checked checkbox — brand-blue with white checkmark */
export const Checked: Story = {
  args: {
    checked: true,
    label: 'I agree to the terms',
    onChange: () => {},
  },
};

/** Disabled checkbox */
export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Cannot change this',
    disabled: true,
    onChange: () => {},
  },
};

/** Disabled and checked */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    label: 'Always enabled',
    disabled: true,
    onChange: () => {},
  },
};

/** Interactive checkbox with state */
export const Interactive: Story = {
  render: function InteractiveCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Remember my preferences"
      />
    );
  },
};
