/**
 * ESLint Configuration — TrustID Extension Screen Library
 *
 * Uses ESLint v9 flat config format. Enforces TypeScript strict rules
 * and React best practices across all source files.
 *
 * @see .prettierrc for formatting rules (ESLint defers to Prettier for style)
 */
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: ['dist/', 'storybook-static/', 'figma/export/', 'node_modules/'],
  },
];
