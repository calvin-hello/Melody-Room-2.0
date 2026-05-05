import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — replaces what react-scripts did automatically.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,                                       // dev server port (same as CRA used)
    proxy: {
      // Forward any /api/* call from the React dev server to the Express backend on :5000
      // (same as CRA's "proxy" field in package.json did)
      '/api': 'http://localhost:5000',
    },
  },
});
