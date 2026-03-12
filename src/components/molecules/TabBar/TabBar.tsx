/**
 * TabBar — Molecule Component
 *
 * Horizontal tab switcher with active indicator. Used in CookiePrefs
 * to switch between Cookies and Shared Data tabs. Implements WAI-ARIA
 * tablist pattern with keyboard navigation (Left/Right arrows).
 *
 * @see docs/PRD.md § 3.2 — TabBar specification
 * @see docs/PRD.md § 4.3 — CookiePrefs screen (tab consumer)
 */
import React, { useId } from 'react';
import styles from './TabBar.module.css';

/* ── Props ── */

export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Display label for the tab */
  label: string;
}

export interface TabBarProps {
  /** Array of tab items to render */
  tabs: TabItem[];
  /** Key of the currently active tab */
  activeTab: string;
  /** Callback when a tab is selected */
  onTabChange: (key: string) => void;
}

/* ── Component ── */

export function TabBar({
  tabs,
  activeTab,
  onTabChange,
}: TabBarProps) {
  const baseId = useId();

  /** Handle keyboard navigation between tabs */
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    e.preventDefault();
    onTabChange(tabs[nextIndex].key);
  };

  return (
    <div className={styles.tabBar} role="tablist">
      {tabs.map((tab, index) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            id={`${baseId}-tab-${tab.key}`}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${tab.key}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.key)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabBar;
