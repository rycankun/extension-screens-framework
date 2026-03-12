/**
 * ToggleRow Stories — Molecule Component
 *
 * Showcases simplified toggle rows for sharing settings.
 *
 * @see src/components/molecules/ToggleRow/ToggleRow.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleRow } from './ToggleRow';
import { SHARED_COPY } from '../../../constants';

const meta: Meta<typeof ToggleRow> = {
  title: 'Molecules/ToggleRow',
  component: ToggleRow,
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

type Story = StoryObj<typeof ToggleRow>;

/** Email sharing — ON state */
export const EmailOn: Story = {
  args: {
    label: 'Email',
    sublabel: SHARED_COPY.email.on,
    checked: true,
    onChange: () => {},
  },
};

/** Email sharing — OFF state */
export const EmailOff: Story = {
  args: {
    label: 'Email',
    sublabel: SHARED_COPY.email.off,
    checked: false,
    onChange: () => {},
  },
};

/** DOB sharing — locked */
export const DobLocked: Story = {
  args: {
    label: 'Date of Birth',
    sublabel: SHARED_COPY.dob.on,
    checked: true,
    locked: true,
    onChange: () => {},
  },
};

/** Interactive sharing settings group */
export const SharingGroup: Story = {
  render: function InteractiveSharingGroup() {
    const [email, setEmail] = useState(true);
    const [dob, setDob] = useState(true);
    const [age, setAge] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ToggleRow
          label="Email"
          sublabel={email ? SHARED_COPY.email.on : SHARED_COPY.email.off}
          checked={email}
          onChange={setEmail}
        />
        <ToggleRow
          label="Date of Birth"
          sublabel={dob ? SHARED_COPY.dob.on : SHARED_COPY.dob.off}
          checked={dob}
          onChange={setDob}
        />
        <ToggleRow
          label="Age Verification"
          sublabel={age ? SHARED_COPY.age.on : SHARED_COPY.age.off}
          checked={age}
          onChange={setAge}
        />
      </div>
    );
  },
};
