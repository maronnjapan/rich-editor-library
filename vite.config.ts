import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'rich-editor-lib',
      fileName: 'index',
    },
    rollupOptions: {
      // ライブラリーにバンドルされるべきではない依存関係を
      // 外部化するようにします
      external: ['react'],
      output: {
        // 外部化された依存関係のために UMD のビルドで使用する
        // グローバル変数を提供します
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    react(),
    dts()
  ],
});
