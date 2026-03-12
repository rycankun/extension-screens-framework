/**
 * Radio Stories — Atom Component
 *
 * Showcases radio button states (selected, unselected, disabled)
 * and group behavior (selecting one deselects others).
 *
 * @see src/components/atoms/Radio/Radio.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

/** Unselected radio button */
export const Unselected: Story = {
  args: {
    checked: false,
    label: 'Option A',
    name: 'demo',
    value: 'a',
    onChange: () => {},
  },
};

/** Selected radio button — brand-blue with white dot */
export const Selected: Story = {
  args: {
    checked: true,
    label: 'Option A',
    name: 'demo',
    value: 'a',
    onChange: () => {},
  },
};

/** Disabled radio button */
export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Cannot select this',
    name: 'demo',
    value: 'disabled',
    disabled: true,
    onChange: () => {},
  },
};

/** Disabled and selected */
export const DisabledSelected: Story = {
  args: {
    checked: true,
    label: 'Always selected',
    name: 'demo',
    value: 'locked',
    disabled: true,
    onChange: () => {},
  },
};

/** Interactive radio group with state */
export const RadioGroup: Story = {
  render: function InteractiveRadioGroup() {
    const [selected, setSelected] = useState('access');
    const options = [
      { value: 'access', label: 'Access my data' },
      { value: 'delete', label: 'Delete my data' },
      { value: 'correct', label: 'Correct my data' },
      { value: 'portability', label: 'Data portability' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tid-sp-6)' }}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            checked={selected === opt.value}
            onChange={() => setSelected(opt.value)}
            label={opt.label}
            name="dsr-type"
            value={opt.value}
          />
        ))}
      </div>
    );
  },
};
