/**
 * Input Stories — Atom Component
 *
 * Showcases input field types (text, email, password, number) and
 * states (default, focus, error, disabled). Each named export is
 * a potential Figma frame import target.
 *
 * @see src/components/atoms/Input/Input.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 340 /* decorator constraint, no matching token */ }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

/** Default text input with placeholder */
export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
    type: 'text',
    ariaLabel: 'Name',
  },
};

/** Email input type */
export const Email: Story = {
  args: {
    placeholder: 'you@example.com',
    type: 'email',
    ariaLabel: 'Email address',
  },
};

/** Password input type */
export const Password: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
    ariaLabel: 'Password',
  },
};

/** Input with a value filled in */
export const WithValue: Story = {
  args: {
    value: 'john@example.com',
    type: 'email',
    ariaLabel: 'Email address',
  },
};

/** Input in error state with error message */
export const Error: Story = {
  args: {
    value: 'invalid',
    type: 'email',
    error: 'Please enter a valid email address',
    ariaLabel: 'Email address',
  },
};

/** Disabled input */
export const Disabled: Story = {
  args: {
    value: 'Cannot edit',
    type: 'text',
    disabled: true,
    ariaLabel: 'Disabled field',
  },
};
