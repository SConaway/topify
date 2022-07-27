import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import tsconfigPaths from 'vite-tsconfig-paths';

import { dependencies } from './package.json';

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = [
  'react',
  'react-dom',
  // 'react-router-dom',
  '@geist-ui/core',
];

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  plugins: [react(), Pages(), tsconfigPaths()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  envPrefix: 'PUBLIC_',
});
