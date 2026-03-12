/**
 * Toggle Stories — Atom Component
 *
 * Showcases toggle states (ON, OFF, locked, disabled) and sizes (sm, md).
 * Each named export is a potential Figma frame import target.
 *
 * @see src/components/atoms/Toggle/Toggle.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    checked: { control: 'boolean' },
    locked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

/** Toggle in OFF state — neutral gray track */
export const Off: Story = {
  args: {
    checked: false,
    ariaLabel: 'Toggle setting',
    onChange: () => {},
  },
};

/** Toggle in ON state — success green track */
export const On: Story = {
  args: {
    checked: true,
    ariaLabel: 'Toggle setting',
    onChange: () => {},
  },
};

/** Small toggle OFF */
export const SmallOff: Story = {
  args: {
    checked: false,
    ariaLabel: 'Toggle setting',
    size: 'sm',
    onChange: () => {},
  },
};

/** Small toggle ON */
export const SmallOn: Story = {
  args: {
    checked: true,
    ariaLabel: 'Toggle setting',
    size: 'sm',
    onChange: () => {},
  },
};

/** Locked toggle — cannot be changed (e.g., legal requirement) */
export const Locked: Story = {
  args: {
    checked: false,
    ariaLabel: 'Locked toggle',
    locked: true,
    onChange: () => {},
  },
};

/** Disabled toggle */
export const Disabled: Story = {
  args: {
    checked: true,
    ariaLabel: 'Disabled toggle',
    disabled: true,
    onChange: () => {},
  },
};

/** Interactive toggle demo with state */
export const Interactive: Story = {
  render: function InteractiveToggle() {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--tid-sp-6)' }}>
        <Toggle
          checked={checked}
          onChange={setChecked}
          ariaLabel="Interactive toggle"
        />
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-base)',
            color: 'var(--tid-text-body)',
          }}
        >
          {checked ? 'ON' : 'OFF'}
        </span>
      </div>
    );
  },
};
