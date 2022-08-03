import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import tsconfigPaths from 'vite-tsconfig-paths';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), Pages(), tsconfigPaths(), visualizer()],
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  envPrefix: 'PUBLIC_',
});
