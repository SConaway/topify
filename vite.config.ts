import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
