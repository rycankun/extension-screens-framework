/**
 * Vitest Configuration — TrustID Extension Screen Library
 *
 * Test runner configuration for unit and component tests.
 * Uses jsdom for DOM simulation and inherits path aliases from vite.config.ts.
 *
 * @see vite.config.ts for shared configuration (path aliases, plugins)
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
    },
  },
});
