/**
 * FormGroup Stories — Molecule Component
 *
 * Showcases label + input + error composition for form fields.
 *
 * @see src/components/molecules/FormGroup/FormGroup.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';

const meta: Meta<typeof FormGroup> = {
  title: 'Molecules/FormGroup',
  component: FormGroup,
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

type Story = StoryObj<typeof FormGroup>;

/** Default email input field */
export const Email: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

/** Input with a pre-filled value */
export const WithValue: Story = {
  args: {
    label: 'Email address',
    value: 'user@example.com',
    type: 'email',
  },
};

/** Input in error state with validation message */
export const WithError: Story = {
  args: {
    label: 'Email address',
    value: 'invalid-email',
    type: 'email',
    error: 'Please enter a valid email address',
  },
};

/** Disabled input field */
export const Disabled: Story = {
  args: {
    label: 'Email address',
    value: 'locked@example.com',
    type: 'email',
    disabled: true,
  },
};

/** Password input field */
export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

/** Interactive form group with state */
export const Interactive: Story = {
  render: function InteractiveFormGroup() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (v: string) => {
      setValue(v);
      if (v && !v.includes('@')) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    };

    return (
      <FormGroup
        label="Email address"
        value={value}
        placeholder="you@example.com"
        type="email"
        error={error}
        onChange={handleChange}
      />
    );
  },
};
