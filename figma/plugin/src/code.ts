/**
 * Figma Plugin Main Thread — TrustID Extension Screen Library
 *
 * Runs in the Figma sandbox with access to the Figma Plugin API.
 * Handles Variable creation/update, frame import, and component mapping.
 * Communicates with the UI thread (ui.tsx) via postMessage.
 *
 * Placeholder — implementation will be built alongside screen components.
 *
 * @see figma/plugin/manifest.json for plugin configuration
 * @see src/tokens/figma-variables.json for the token manifest
 */

// Plugin entry point — show UI panel
figma.showUI(__html__, { width: 320, height: 480 });

// Listen for messages from the UI iframe
figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
