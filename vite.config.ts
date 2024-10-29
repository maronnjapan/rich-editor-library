import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleX from "vite-plugin-stylex";
import wyw from '@wyw-in-js/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  build: {
    cssCodeSplit: true
  },
  plugins: [
    react(),
    styleX(),
    wyw({
      include: ['**/*.{js,jsx,ts,tsx}'],
    }),
    vanillaExtractPlugin({
      identifiers: 'short',
    })
  ],
});
