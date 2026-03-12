/**
 * TabBar Stories — Molecule Component
 *
 * Showcases tab bar states: default, active tab, interactive.
 *
 * @see src/components/molecules/TabBar/TabBar.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Molecules/TabBar',
  component: TabBar,
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

type Story = StoryObj<typeof TabBar>;

/** Cookie preferences tabs — Cookies tab active */
const cookieTabs = [
  { key: 'cookies', label: 'Cookies' },
  { key: 'shared', label: 'Shared Data' },
];

/** Cookies tab active */
export const CookiesActive: Story = {
  args: {
    tabs: cookieTabs,
    activeTab: 'cookies',
    onTabChange: () => {},
  },
};

/** Shared Data tab active */
export const SharedDataActive: Story = {
  args: {
    tabs: cookieTabs,
    activeTab: 'shared',
    onTabChange: () => {},
  },
};

/** Interactive tab switching */
export const Interactive: Story = {
  render: function InteractiveTabBar() {
    const [active, setActive] = useState('cookies');
    return (
      <div>
        <TabBar tabs={cookieTabs} activeTab={active} onTabChange={setActive} />
        <div
          style={{
            padding: 'var(--tid-sp-6)',
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-body)',
          }}
        >
          {active === 'cookies' ? 'Cookie toggle rows go here.' : 'Shared data toggle rows go here.'}
        </div>
      </div>
    );
  },
};
