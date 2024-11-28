// vite.config.ts
import { defineConfig } from "file:///var/www/rich-editor-library/node_modules/vite/dist/node/index.js";
import react from "file:///var/www/rich-editor-library/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///var/www/rich-editor-library/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/var/www/rich-editor-library";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/index.ts"),
      name: "rich-editor-lib",
      fileName: "index"
    },
    // CSSのツリーシェイキングを無効化
    cssCodeSplit: false,
    // 未使用のCSSを保持
    cssMinify: false
    // rollupOptions: {
    //   // ライブラリーにバンドルされるべきではない依存関係を
    //   // 外部化するようにします
    //   external: ['react'],
    //   output: {
    //     // 外部化された依存関係のために UMD のビルドで使用する
    //     // グローバル変数を提供します
    //     globals: {
    //       react: 'React',
    //     },
    //   },
    // },
  },
  plugins: [
    react(),
    dts()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvdmFyL3d3dy9yaWNoLWVkaXRvci1saWJyYXJ5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvdmFyL3d3dy9yaWNoLWVkaXRvci1saWJyYXJ5L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy92YXIvd3d3L3JpY2gtZWRpdG9yLWxpYnJhcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdsaWIvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdyaWNoLWVkaXRvci1saWInLFxuICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXG4gICAgfSxcbiAgICAvLyBDU1NcdTMwNkVcdTMwQzRcdTMwRUFcdTMwRkNcdTMwQjdcdTMwQTdcdTMwQTRcdTMwQURcdTMwRjNcdTMwQjBcdTMwOTJcdTcxMjFcdTUyQjlcdTUzMTZcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgIC8vIFx1NjcyQVx1NEY3Rlx1NzUyOFx1MzA2RUNTU1x1MzA5Mlx1NEZERFx1NjMwMVxuICAgIGNzc01pbmlmeTogZmFsc2VcbiAgICAvLyByb2xsdXBPcHRpb25zOiB7XG4gICAgLy8gICAvLyBcdTMwRTlcdTMwQTRcdTMwRDZcdTMwRTlcdTMwRUFcdTMwRkNcdTMwNkJcdTMwRDBcdTMwRjNcdTMwQzlcdTMwRUJcdTMwNTVcdTMwOENcdTMwOEJcdTMwNzlcdTMwNERcdTMwNjdcdTMwNkZcdTMwNkFcdTMwNDRcdTRGOURcdTVCNThcdTk1QTJcdTRGQzJcdTMwOTJcbiAgICAvLyAgIC8vIFx1NTkxNlx1OTBFOFx1NTMxNlx1MzA1OVx1MzA4Qlx1MzA4OFx1MzA0Nlx1MzA2Qlx1MzA1N1x1MzA3RVx1MzA1OVxuICAgIC8vICAgZXh0ZXJuYWw6IFsncmVhY3QnXSxcbiAgICAvLyAgIG91dHB1dDoge1xuICAgIC8vICAgICAvLyBcdTU5MTZcdTkwRThcdTUzMTZcdTMwNTVcdTMwOENcdTMwNUZcdTRGOURcdTVCNThcdTk1QTJcdTRGQzJcdTMwNkVcdTMwNUZcdTMwODFcdTMwNkIgVU1EIFx1MzA2RVx1MzBEM1x1MzBFQlx1MzBDOVx1MzA2N1x1NEY3Rlx1NzUyOFx1MzA1OVx1MzA4QlxuICAgIC8vICAgICAvLyBcdTMwQjBcdTMwRURcdTMwRkNcdTMwRDBcdTMwRUJcdTU5MDlcdTY1NzBcdTMwOTJcdTYzRDBcdTRGOUJcdTMwNTdcdTMwN0VcdTMwNTlcbiAgICAvLyAgICAgZ2xvYmFsczoge1xuICAgIC8vICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoKVxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNRLFNBQVMsb0JBQW9CO0FBQ25TLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBSGhCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQTtBQUFBLElBRUEsY0FBYztBQUFBO0FBQUEsSUFFZCxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFhYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLEVBQ047QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
