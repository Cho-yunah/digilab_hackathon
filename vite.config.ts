import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import envCompatiblePlugin from 'vite-plugin-env-compatible';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), envCompatiblePlugin()],
  define: {
    'process.env': process.env,
  },
});
