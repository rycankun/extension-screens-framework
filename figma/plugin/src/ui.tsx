/**
 * Figma Plugin UI Thread — TrustID Token Sync
 *
 * React application rendered inside the Figma plugin iframe panel.
 * Provides controls for token sync and displays sync status/results.
 *
 * Features:
 *   - "Sync Tokens" button to trigger Variable sync
 *   - Last sync timestamp display
 *   - Token/collection count summary
 *   - Sync result counts (created/updated/unchanged)
 *   - Error display with retry
 *
 * Communicates with the main thread (code.ts) via parent.postMessage.
 * The main thread sends typed messages back via figma.ui.postMessage.
 *
 * @see figma/plugin/src/code.ts — handles sync logic in Figma sandbox
 * @see figma/plugin/src/shared/manifest.ts — SyncResult type
 */

import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

/* ── Types ── */

/** Sync results from the main thread */
interface SyncResult {
  created: number;
  updated: number;
  unchanged: number;
  collectionsCreated: number;
  collectionsUpdated: number;
  durationMs: number;
}

/** Status data from the main thread */
interface SyncStatusData {
  lastSyncedAt: string | null;
  tokenCount: number;
  collectionCount: number;
  hasChanges: boolean;
}

/** Messages received from the main thread */
interface PluginMessage {
  type: 'sync-result' | 'sync-error' | 'status';
  data?: SyncResult | SyncStatusData | string;
}

/* ── App Component ── */

function App() {
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<SyncStatusData | null>(null);
  const [lastResult, setLastResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ── Message Handler ── */

  useEffect(() => {
    /** Handle messages from the Figma main thread */
    function onMessage(event: MessageEvent) {
      const msg = event.data.pluginMessage as PluginMessage | undefined;
      if (!msg) return;

      switch (msg.type) {
        case 'status':
          setStatus(msg.data as SyncStatusData);
          break;

        case 'sync-result':
          setLastResult(msg.data as SyncResult);
          setSyncing(false);
          setError(null);
          /* Refresh status after sync */
          sendToPlugin('check-status');
          break;

        case 'sync-error':
          setError(msg.data as string);
          setSyncing(false);
          break;
      }
    }

    window.addEventListener('message', onMessage);

    /* Request initial status on mount */
    sendToPlugin('check-status');

    return () => window.removeEventListener('message', onMessage);
  }, []);

  /* ── Actions ── */

  const handleSync = useCallback(() => {
    setSyncing(true);
    setError(null);
    setLastResult(null);
    sendToPlugin('sync-tokens');
  }, []);

  const handleClose = useCallback(() => {
    sendToPlugin('close');
  }, []);

  /* ── Render ── */

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>TrustID Token Sync</h1>
        <p style={styles.subtitle}>
          Sync design tokens from code to Figma Variables
        </p>
      </div>

      {/* Token Summary */}
      {status && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Token Manifest</h2>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Tokens</span>
            <span style={styles.statValue}>{status.tokenCount}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Collections</span>
            <span style={styles.statValue}>{status.collectionCount}</span>
          </div>
          {status.lastSyncedAt && (
            <div style={styles.statRow}>
              <span style={styles.statLabel}>Last synced</span>
              <span style={styles.statValue}>
                {formatTimestamp(status.lastSyncedAt)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Sync Results */}
      {lastResult && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Sync Results</h2>
          <div style={styles.resultGrid}>
            <ResultBadge label="Created" count={lastResult.created} color="#00C897" />
            <ResultBadge label="Updated" count={lastResult.updated} color="#0E6FFF" />
            <ResultBadge
              label="Unchanged"
              count={lastResult.unchanged}
              color="#6B7280"
            />
          </div>
          <p style={styles.duration}>
            Completed in {lastResult.durationMs}ms
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={styles.errorCard}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        <button
          onClick={handleSync}
          disabled={syncing}
          style={{
            ...styles.syncButton,
            ...(syncing ? styles.syncButtonDisabled : {}),
          }}
        >
          {syncing ? 'Syncing...' : 'Sync Tokens'}
        </button>
        <button onClick={handleClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ── Subcomponents ── */

/** Badge showing a count with a colored indicator */
function ResultBadge({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div style={styles.resultItem}>
      <span style={{ ...styles.resultDot, backgroundColor: color }} />
      <span style={styles.resultLabel}>{label}</span>
      <span style={styles.resultCount}>{count}</span>
    </div>
  );
}

/* ── Helpers ── */

/** Send a message to the Figma main thread */
function sendToPlugin(type: string): void {
  parent.postMessage({ pluginMessage: { type } }, '*');
}

/** Format an ISO timestamp into a human-readable string */
function formatTimestamp(iso: string): string {
  try {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

/* ── Styles ── */

/**
 * Inline styles for the plugin UI.
 * Figma plugins run in an iframe with restricted CSS loading.
 * All styles are inlined for reliability.
 */
const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 12,
    color: '#333',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    height: '100%',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    margin: '0 0 4px 0',
    color: '#0B1620',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    margin: 0,
  },
  card: {
    backgroundColor: '#F8F9FB',
    borderRadius: 6,
    padding: 12,
    border: '1px solid #E5E7EB',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: '#6B7280',
    margin: '0 0 8px 0',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
  },
  statLabel: {
    fontSize: 12,
    color: '#374151',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 500,
    color: '#0B1620',
  },
  resultGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  resultDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  resultLabel: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  resultCount: {
    fontSize: 13,
    fontWeight: 500,
    color: '#0B1620',
  },
  duration: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 0,
  },
  errorCard: {
    backgroundColor: '#FFF0F0',
    borderRadius: 6,
    padding: 12,
    border: '1px solid #FF4D4D',
  },
  errorText: {
    fontSize: 12,
    color: '#CC0000',
    margin: 0,
  },
  actions: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  syncButton: {
    backgroundColor: '#0B1620',
    color: '#F5F7FA',
    border: 'none',
    borderRadius: 6,
    padding: '10px 16px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  syncButtonDisabled: {
    backgroundColor: '#B0B7C3',
    cursor: 'not-allowed',
  },
  closeButton: {
    backgroundColor: 'transparent',
    color: '#6B7280',
    border: '1px solid #E5E7EB',
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 12,
    cursor: 'pointer',
  },
};

/* ── Mount ── */

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
