/**
 * Figma Plugin Main Thread — TrustID Token Sync
 *
 * Runs in the Figma sandbox with access to the Figma Plugin API.
 * Creates and updates Figma Variable collections from the token manifest.
 *
 * Key behaviors:
 *   - Idempotent: matches collections/variables by name, updates if exists
 *   - Handles Light/Dark modes for color collections, single mode for others
 *   - Reports sync results (created/updated/unchanged counts) to the UI
 *   - Stores sync state in the Figma file for diff detection
 *
 * The token manifest (figma-variables.json) is injected at build time
 * as the __TOKEN_MANIFEST__ constant by esbuild's `define` feature.
 *
 * @see figma/plugin/manifest.json — plugin entry point configuration
 * @see figma/plugin/src/shared/token-parser.ts — value parsing
 * @see figma/plugin/src/shared/manifest.ts — sync state persistence
 * @see src/tokens/figma-variables.json — token data (bundled at build time)
 */

import {
  parseManifestFromString,
  type ParsedCollection,
  type ParsedToken,
  type FigmaRGBA,
} from './shared/token-parser';
import {
  getSyncState,
  setSyncState,
  createSyncRecord,
  type SyncResult,
} from './shared/manifest';

/* ── Build-time Injected Manifest ── */

/**
 * Token manifest JSON string, injected by esbuild at build time.
 * See build.mjs — `define: { __TOKEN_MANIFEST__: ... }`
 */
declare const __TOKEN_MANIFEST__: string;

/* ── Message Types ── */

/** Messages sent from the UI iframe to the main thread */
interface UIMessage {
  type: 'sync-tokens' | 'check-status' | 'close';
}

/** Messages sent from the main thread to the UI iframe */
interface PluginMessage {
  type: 'sync-result' | 'sync-error' | 'status';
  data?: SyncResult | SyncStatusData | string;
}

/** Status data sent to UI on load */
interface SyncStatusData {
  lastSyncedAt: string | null;
  tokenCount: number;
  collectionCount: number;
  hasChanges: boolean;
}

/* ── Plugin Entry ── */

figma.showUI(__html__, { width: 360, height: 520 });

/* ── Message Handler ── */

figma.ui.onmessage = async (msg: UIMessage) => {
  switch (msg.type) {
    case 'sync-tokens':
      await handleTokenSync();
      break;

    case 'check-status':
      handleCheckStatus();
      break;

    case 'close':
      figma.closePlugin();
      break;
  }
};

/* ── Status Check ── */

/**
 * Report the current sync status to the UI.
 * Called on plugin load so the UI can show last sync time and
 * whether the manifest has changed since then.
 */
function handleCheckStatus(): void {
  const lastSync = getSyncState();
  const manifest = JSON.parse(__TOKEN_MANIFEST__);

  const statusData: SyncStatusData = {
    lastSyncedAt: lastSync?.syncedAt ?? null,
    tokenCount: manifest.tokenCount,
    collectionCount: manifest.collectionCount,
    hasChanges: true, /* Always report changes on status check for simplicity */
  };

  sendToUI({ type: 'status', data: statusData });
}

/* ── Token Sync ── */

/**
 * Main sync operation: parse manifest → create/update Figma Variable collections.
 *
 * Algorithm:
 *   1. Parse the bundled manifest JSON into typed collections
 *   2. For each collection, find or create the Figma VariableCollection
 *   3. Ensure the collection has the correct modes (Light/Dark or Default)
 *   4. For each token, find or create the Variable within the collection
 *   5. Set the variable's value for each mode
 *   6. Track created/updated/unchanged counts
 *   7. Persist sync state and report results to UI
 */
async function handleTokenSync(): Promise<void> {
  const startTime = Date.now();

  try {
    const collections = parseManifestFromString(__TOKEN_MANIFEST__);

    const result: SyncResult = {
      created: 0,
      updated: 0,
      unchanged: 0,
      collectionsCreated: 0,
      collectionsUpdated: 0,
      durationMs: 0,
    };

    for (const collection of collections) {
      await syncCollection(collection, result);
    }

    result.durationMs = Date.now() - startTime;

    /* Persist sync state to the Figma file */
    const manifest = JSON.parse(__TOKEN_MANIFEST__);
    setSyncState(
      createSyncRecord(__TOKEN_MANIFEST__, manifest.tokenCount, manifest.collectionCount),
    );

    sendToUI({ type: 'sync-result', data: result });

    figma.notify(
      `Token sync complete: ${result.created} created, ${result.updated} updated, ${result.unchanged} unchanged`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    sendToUI({ type: 'sync-error', data: message });
    figma.notify(`Token sync failed: ${message}`, { error: true });
  }
}

/* ── Collection Sync ── */

/**
 * Sync a single parsed collection to Figma.
 * Finds the existing collection by name or creates a new one.
 * Ensures modes match, then syncs all tokens within.
 */
async function syncCollection(
  collection: ParsedCollection,
  result: SyncResult,
): Promise<void> {
  const existingCollections = figma.variables.getLocalVariableCollections();
  let figmaCollection = existingCollections.find((c) => c.name === collection.name);

  if (figmaCollection) {
    result.collectionsUpdated++;
  } else {
    /* Create new collection */
    figmaCollection = figma.variables.createVariableCollection(collection.name);
    result.collectionsCreated++;
  }

  /* Ensure the collection has the correct modes */
  const modeMap = ensureModes(figmaCollection, collection.modes);

  /* Sync each token as a Variable within this collection */
  for (const token of collection.tokens) {
    syncVariable(figmaCollection, token, modeMap, result);
  }
}

/* ── Mode Management ── */

/**
 * Ensure a Figma VariableCollection has exactly the modes we need.
 * Returns a map of mode name → Figma mode ID.
 *
 * Figma creates collections with one default mode. We rename it
 * to our first mode name, then add additional modes as needed.
 */
function ensureModes(
  collection: VariableCollection,
  modeNames: string[],
): Map<string, string> {
  const modeMap = new Map<string, string>();
  const existingModes = collection.modes;

  /* Map existing modes by name */
  for (const mode of existingModes) {
    modeMap.set(mode.name, mode.modeId);
  }

  /* Rename the first mode if it doesn't match (Figma's default is "Mode 1") */
  if (existingModes.length > 0 && !modeMap.has(modeNames[0])) {
    const firstMode = existingModes[0];
    collection.renameMode(firstMode.modeId, modeNames[0]);
    modeMap.delete(firstMode.name);
    modeMap.set(modeNames[0], firstMode.modeId);
  }

  /* Add any missing modes */
  for (const modeName of modeNames) {
    if (!modeMap.has(modeName)) {
      const modeId = collection.addMode(modeName);
      modeMap.set(modeName, modeId);
    }
  }

  return modeMap;
}

/* ── Variable Sync ── */

/**
 * Sync a single parsed token to a Figma Variable.
 * Matches by name within the collection — updates if exists, creates if new.
 *
 * Figma Variables API expects:
 *   COLOR → { r, g, b, a } with 0–1 range
 *   FLOAT → number
 *   STRING → string
 */
function syncVariable(
  collection: VariableCollection,
  token: ParsedToken,
  modeMap: Map<string, string>,
  result: SyncResult,
): void {
  /* Resolve the Figma variable type */
  const resolvedType = resolveFigmaType(token.type);

  /* Look for an existing variable with this name in the collection */
  const existingVars = figma.variables
    .getLocalVariables()
    .filter(
      (v) =>
        v.variableCollectionId === collection.id && v.name === token.name,
    );

  let variable: Variable;
  let isNew = false;

  if (existingVars.length > 0) {
    variable = existingVars[0];
  } else {
    variable = figma.variables.createVariable(
      token.name,
      collection,
      resolvedType,
    );
    isNew = true;
  }

  /* Set value for each mode */
  let anyValueChanged = false;

  for (const [modeName, modeId] of modeMap) {
    const newValue = token.values[modeName];
    if (newValue === undefined) continue;

    /* Check if the value has actually changed to avoid unnecessary updates */
    try {
      const currentValue = variable.valuesByMode[modeId];
      if (!valuesAreEqual(currentValue, newValue)) {
        variable.setValueForMode(modeId, newValue as VariableValue);
        anyValueChanged = true;
      }
    } catch {
      /* If reading current value fails, just set the new one */
      variable.setValueForMode(modeId, newValue as VariableValue);
      anyValueChanged = true;
    }
  }

  /* Update counters */
  if (isNew) {
    result.created++;
  } else if (anyValueChanged) {
    result.updated++;
  } else {
    result.unchanged++;
  }
}

/* ── Value Comparison ── */

/**
 * Compare two Figma variable values for equality.
 * Handles COLOR (RGBA objects), FLOAT (numbers), and STRING values.
 */
function valuesAreEqual(
  current: unknown,
  incoming: FigmaRGBA | number | string,
): boolean {
  if (current === undefined || current === null) return false;

  /* Compare RGBA color objects */
  if (typeof incoming === 'object' && 'r' in incoming) {
    if (typeof current !== 'object' || current === null || !('r' in current))
      return false;
    const c = current as FigmaRGBA;
    return (
      Math.abs(c.r - incoming.r) < 0.001 &&
      Math.abs(c.g - incoming.g) < 0.001 &&
      Math.abs(c.b - incoming.b) < 0.001 &&
      Math.abs(c.a - incoming.a) < 0.001
    );
  }

  /* Compare primitives (number, string) */
  return current === incoming;
}

/* ── Figma Type Resolution ── */

/**
 * Map our token type strings to Figma's VariableResolvedDataType.
 * Figma only supports COLOR, FLOAT, STRING, and BOOLEAN.
 */
function resolveFigmaType(
  type: 'COLOR' | 'FLOAT' | 'STRING',
): VariableResolvedDataType {
  switch (type) {
    case 'COLOR':
      return 'COLOR';
    case 'FLOAT':
      return 'FLOAT';
    case 'STRING':
      return 'STRING';
  }
}

/* ── UI Communication ── */

/** Send a typed message to the UI iframe */
function sendToUI(msg: PluginMessage): void {
  figma.ui.postMessage(msg);
}
