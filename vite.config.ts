import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

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
  plugins: [react()],
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
});
