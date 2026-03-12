/**
 * Plugin Manifest — Figma Plugin Shared Utilities
 *
 * Tracks sync state between the code-side token manifest and what's
 * been applied to the Figma file. Stores metadata in the Figma file's
 * shared plugin data so the plugin can detect what changed since last sync.
 *
 * Uses figma.root.setSharedPluginData() for persistence across sessions.
 * The namespace "trustid-tokens" isolates our data from other plugins.
 *
 * @see figma/plugin/src/code.ts — reads/writes sync state via these helpers
 * @see src/tokens/figma-variables.json — the manifest being tracked
 */

/* ── Constants ── */

/** Plugin data namespace — isolates our data from other plugins */
const NAMESPACE = 'trustid-tokens';

/** Key for the sync state JSON blob */
const SYNC_STATE_KEY = 'syncState';

/* ── Types ── */

/** Record of a single sync operation */
export interface SyncRecord {
  /** ISO timestamp of when this sync completed */
  syncedAt: string;
  /** Token count at time of sync */
  tokenCount: number;
  /** Collection count at time of sync */
  collectionCount: number;
  /** Hash of the manifest content — enables diff detection */
  manifestHash: string;
}

/** Sync results reported back to the UI */
export interface SyncResult {
  /** Number of new variables created */
  created: number;
  /** Number of existing variables updated */
  updated: number;
  /** Number of variables unchanged (values match) */
  unchanged: number;
  /** Number of collections created */
  collectionsCreated: number;
  /** Number of collections updated */
  collectionsUpdated: number;
  /** Total sync duration in milliseconds */
  durationMs: number;
}

/* ── Hash Utility ── */

/**
 * Simple string hash for diff detection.
 * Not cryptographic — just needs to detect content changes.
 * Uses DJB2 algorithm for fast, reasonably-distributed hashes.
 */
export function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  /* Convert to unsigned 32-bit hex string */
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/* ── Sync State Persistence ── */

/**
 * Read the current sync state from the Figma file's plugin data.
 * Returns null if the plugin has never synced to this file.
 */
export function getSyncState(): SyncRecord | null {
  const raw = figma.root.getSharedPluginData(NAMESPACE, SYNC_STATE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SyncRecord;
  } catch {
    return null;
  }
}

/**
 * Write the sync state to the Figma file's plugin data.
 * Called after a successful sync operation.
 */
export function setSyncState(record: SyncRecord): void {
  figma.root.setSharedPluginData(NAMESPACE, SYNC_STATE_KEY, JSON.stringify(record));
}

/**
 * Check if the manifest has changed since last sync.
 * Compares the DJB2 hash of the current manifest JSON
 * against the stored hash from the last sync.
 */
export function hasManifestChanged(manifestJson: string): boolean {
  const currentHash = hashString(manifestJson);
  const lastSync = getSyncState();

  if (!lastSync) return true;
  return lastSync.manifestHash !== currentHash;
}

/**
 * Create a SyncRecord from the current manifest and sync results.
 * Used by code.ts after completing a sync operation.
 */
export function createSyncRecord(
  manifestJson: string,
  tokenCount: number,
  collectionCount: number,
): SyncRecord {
  return {
    syncedAt: new Date().toISOString(),
    tokenCount,
    collectionCount,
    manifestHash: hashString(manifestJson),
  };
}
