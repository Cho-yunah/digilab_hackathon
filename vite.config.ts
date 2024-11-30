import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import envCompatiblePlugin from 'vite-plugin-env-compatible';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    envCompatiblePlugin(),
    svgr({
      svgrOptions: {
        icon: true, // SVG를 ReactComponent로 사용할 수 있도록 설정
      },
    }),
  ],
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
