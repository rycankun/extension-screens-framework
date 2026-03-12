/**
 * ConsentToggle Stories — Molecule Component
 *
 * Showcases consent toggle rows for cookie/data category controls.
 *
 * @see src/components/molecules/ConsentToggle/ConsentToggle.tsx for implementation
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentToggle } from './ConsentToggle';

const meta: Meta<typeof ConsentToggle> = {
  title: 'Molecules/ConsentToggle',
  component: ConsentToggle,
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

type Story = StoryObj<typeof ConsentToggle>;

/** Essential cookies toggle — locked ON */
export const EssentialLocked: Story = {
  args: {
    label: 'Essential',
    sublabel: 'Required for the website to function properly.',
    checked: true,
    locked: true,
    onChange: () => {},
  },
};

/** Analytics toggle — ON state */
export const AnalyticsOn: Story = {
  args: {
    label: 'Analytics',
    sublabel: 'Help us understand how visitors interact with our website.',
    checked: true,
    showInfo: true,
    infoText: 'Analytics cookies collect anonymized usage data.',
    onChange: () => {},
  },
};

/** Marketing toggle — OFF state */
export const MarketingOff: Story = {
  args: {
    label: 'Marketing',
    sublabel: 'Used to deliver relevant advertisements.',
    checked: false,
    showInfo: true,
    infoText: 'Marketing cookies track browsing for ad targeting.',
    onChange: () => {},
  },
};

/** Toggle without sublabel */
export const NoSublabel: Story = {
  args: {
    label: 'Personalization',
    checked: false,
    onChange: () => {},
  },
};

/** Interactive consent toggle group */
export const ConsentGroup: Story = {
  render: function InteractiveConsentGroup() {
    const [analytics, setAnalytics] = useState(true);
    const [marketing, setMarketing] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ConsentToggle
          label="Essential"
          sublabel="Required for the website to function properly."
          checked={true}
          locked={true}
          onChange={() => {}}
        />
        <ConsentToggle
          label="Analytics"
          sublabel="Help us understand how visitors interact with our website."
          checked={analytics}
          onChange={setAnalytics}
          showInfo={true}
          infoText="Analytics cookies collect anonymized usage data."
        />
        <ConsentToggle
          label="Marketing"
          sublabel="Used to deliver relevant advertisements."
          checked={marketing}
          onChange={setMarketing}
          showInfo={true}
          infoText="Marketing cookies track browsing for ad targeting."
        />
      </div>
    );
  },
};
