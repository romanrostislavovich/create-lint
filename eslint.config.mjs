import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';

export default defineConfig([
  {
    ignores: ['dist/**'],
  },
  eslint.configs.recommended,
]);
