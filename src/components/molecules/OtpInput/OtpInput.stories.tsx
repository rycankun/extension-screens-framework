/**
 * OtpInput Stories — Molecule Component
 *
 * Showcases OTP input states: empty, partial, filled, error.
 *
 * @see src/components/molecules/OtpInput/OtpInput.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OtpInput } from './OtpInput';

const meta: Meta<typeof OtpInput> = {
  title: 'Molecules/OtpInput',
  component: OtpInput,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof OtpInput>;

/** Empty OTP input — waiting for user entry */
export const Empty: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
};

/** Partially filled OTP input */
export const PartiallyFilled: Story = {
  args: {
    value: '384',
    onChange: () => {},
  },
};

/** Fully filled OTP input */
export const Filled: Story = {
  args: {
    value: '384291',
    onChange: () => {},
  },
};

/** Error state — invalid code */
export const Error: Story = {
  args: {
    value: '384291',
    error: true,
    onChange: () => {},
  },
};

/** Disabled OTP input */
export const Disabled: Story = {
  args: {
    value: '384291',
    disabled: true,
    onChange: () => {},
  },
};

/** Interactive OTP input with auto-advance */
export const Interactive: Story = {
  render: function InteractiveOtp() {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--tid-sp-4)' }}>
        <OtpInput value={value} onChange={setValue} />
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
          }}
        >
          {value.length === 6 ? 'Code verifies automatically' : `${value.length}/6 digits entered`}
        </span>
      </div>
    );
  },
};
