import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'

export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = mode === 'library'
  return {
    build: {
      ...(isLibraryBuild ? {
        outDir: 'dist',
        lib: {
          entry: resolve(__dirname, 'lib/index.ts'),
          name: 'rich-editor-lib',
          fileName: 'index',
        },
        rollupOptions: {
          external: ['react'],
          output: {
            globals: {
              react: 'React',
            },
          },
        },
      } : {
        // プレイグラウンド/ドキュメントビルド時の設定
        outDir: 'dist',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
          }
        }
      }),
    },
    plugins: [
      react(),
      dts()
    ]
  }
});
