/**
 * Vite Configuration — TrustID Extension Screen Library
 *
 * Build tool configuration for the React + TypeScript component library.
 * Uses the React plugin for JSX transform and path aliases matching tsconfig.
 * Library mode outputs ES modules for consumption by Storybook and the Figma plugin.
 *
 * @see tsconfig.json for matching path alias configuration
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TrustIDScreens',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
