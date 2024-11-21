import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'rich-editor-lib',
      fileName: 'index',
    },
  },
  plugins: [
    react(),
    dts()
  ],
});
