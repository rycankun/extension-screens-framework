/**
 * Plugin Build Script — TrustID Figma Plugin
 *
 * Builds both plugin targets in parallel:
 *   1. code.ts → dist/code.js  (esbuild, IIFE, no DOM — Figma sandbox)
 *   2. ui.tsx  → dist/ui.html  (Vite, React inlined into single HTML file)
 *
 * Why not a single Vite config?
 *   Figma's sandbox thread has no DOM, no `window`, no module system.
 *   esbuild's IIFE output is a better fit than Vite's module-based output.
 *   The UI thread needs full React + CSS inlined into one HTML file.
 *
 * Usage:
 *   node build.mjs           — One-shot build
 *   node build.mjs --watch   — Watch mode for development
 *
 * @see figma/plugin/manifest.json — expects dist/code.js and dist/ui.html
 */

import * as esbuild from 'esbuild';
import { build as viteBuild } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, rmSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const isWatch = process.argv.includes('--watch');

/* ── Read figma-variables.json at build time ── */

/**
 * Bundle the token manifest as a string constant inside code.js.
 * This avoids runtime file reading, which isn't available in the Figma sandbox.
 */
const tokenManifestPath = resolve(__dirname, '../../src/tokens/figma-variables.json');

/* ── esbuild: code.ts → dist/code.js ── */

/** @type {import('esbuild').BuildOptions} */
const codeOptions = {
  entryPoints: [resolve(__dirname, 'src/code.ts')],
  bundle: true,
  outfile: resolve(__dirname, 'dist/code.js'),
  format: 'iife',
  target: 'es2022',
  /* Figma sandbox has no external modules — bundle everything */
  external: [],
  /* Inject the token manifest as a global constant */
  define: {
    __TOKEN_MANIFEST__: JSON.stringify(readFileSync(tokenManifestPath, 'utf-8')),
  },
  logLevel: 'info',
};

/* ── Vite: ui.tsx → dist/ui.html ── */

async function buildUI() {
  await viteBuild({
    configFile: resolve(__dirname, 'vite.config.ts'),
    logLevel: 'info',
  });
}

/* ── Main ── */

async function main() {
  console.log('Building TrustID Figma Plugin...\n');

  /* Clean dist directory before building */
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  if (isWatch) {
    /* Watch mode — esbuild watches, Vite watches separately */
    const codeCtx = await esbuild.context(codeOptions);
    await codeCtx.watch();
    console.log('Watching code.ts for changes...');

    /* Vite watch mode via build --watch */
    await viteBuild({
      configFile: resolve(__dirname, 'vite.config.ts'),
      build: { watch: {} },
      logLevel: 'info',
    });
  } else {
    /* One-shot build — both targets in parallel */
    await Promise.all([esbuild.build(codeOptions), buildUI()]);
    console.log('\nPlugin build complete → dist/code.js + dist/ui.html');
  }
}

main().catch((err) => {
  console.error('Plugin build failed:', err);
  process.exit(1);
});
