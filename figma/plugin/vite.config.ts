/**
 * Vite Build Config — TrustID Figma Plugin (UI thread only)
 *
 * Builds the UI iframe as a single self-contained HTML file.
 * Figma plugins cannot load external scripts — everything must be inlined.
 *
 * Uses a custom `inlineScript` plugin that replaces <script> tags
 * with inline <script> blocks containing the bundled JS. This is
 * simpler than pulling in vite-plugin-singlefile as a dependency.
 *
 * The main thread (code.ts) is built separately by esbuild — see build.mjs.
 *
 * @see figma/plugin/build.mjs — orchestrates both builds
 * @see figma/plugin/manifest.json — references dist/ui.html
 */

import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

/* ── Inline Script Plugin ── */

/**
 * Custom Vite plugin that inlines all JS bundles into the HTML file.
 * After Vite finishes bundling, it rewrites the HTML to replace
 * <script src="..."> with <script>...bundled code...</script>.
 *
 * Why not use vite-plugin-singlefile?
 *   Fewer dependencies. This plugin does exactly what we need
 *   for the Figma plugin use case — nothing more.
 */
function inlineScript(): Plugin {
  return {
    name: 'inline-script',
    enforce: 'post',
    generateBundle(_options, bundle) {
      /* Find the HTML file in the bundle */
      const htmlFile = Object.keys(bundle).find((key) => key.endsWith('.html'));
      if (!htmlFile) return;

      const htmlChunk = bundle[htmlFile];
      if (htmlChunk.type !== 'asset') return;

      let html = typeof htmlChunk.source === 'string'
        ? htmlChunk.source
        : new TextDecoder().decode(htmlChunk.source);

      /* Find all JS chunks and inline them */
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk') continue;

        /* Replace the <script> reference with inline code */
        const scriptTag = new RegExp(
          `<script[^>]*src=["'][^"']*${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>\\s*</script>`,
          'g',
        );
        html = html.replace(scriptTag, `<script>${chunk.code}</script>`);

        /* Remove the JS file from the bundle — it's now inlined */
        delete bundle[fileName];
      }

      htmlChunk.source = html;
    },
  };
}

/* ── Vite Config ── */

export default defineConfig({
  plugins: [react(), inlineScript()],
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    /* Don't empty dist — esbuild writes code.js there first */
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/ui.html'),
      output: {
        entryFileNames: 'ui.js',
        assetFileNames: '[name].[ext]',
      },
    },
    /* Inline all assets under 1MB to avoid separate files */
    assetsInlineLimit: 1_000_000,
    /* Disable CSS code splitting — keep everything in one file */
    cssCodeSplit: false,
  },
});
