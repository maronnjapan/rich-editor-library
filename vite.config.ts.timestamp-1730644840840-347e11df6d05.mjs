// vite.config.ts
import { defineConfig } from "file:///var/www/rich-editor-library/node_modules/vite/dist/node/index.js";
import react from "file:///var/www/rich-editor-library/node_modules/@vitejs/plugin-react/dist/index.mjs";
import styleX from "file:///var/www/rich-editor-library/node_modules/vite-plugin-stylex/dist/main.mjs";
import wyw from "file:///var/www/rich-editor-library/node_modules/@wyw-in-js/vite/esm/index.mjs";
import { vanillaExtractPlugin } from "file:///var/www/rich-editor-library/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
var vite_config_default = defineConfig({
  build: {
    cssCodeSplit: true
  },
  plugins: [
    react(),
    styleX(),
    wyw({
      include: ["**/*.{js,jsx,ts,tsx}"]
    }),
    vanillaExtractPlugin({
      identifiers: "short"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvdmFyL3d3dy9yaWNoLWVkaXRvci1saWJyYXJ5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvdmFyL3d3dy9yaWNoLWVkaXRvci1saWJyYXJ5L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy92YXIvd3d3L3JpY2gtZWRpdG9yLWxpYnJhcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHN0eWxlWCBmcm9tIFwidml0ZS1wbHVnaW4tc3R5bGV4XCI7XG5pbXBvcnQgd3l3IGZyb20gJ0B3eXctaW4tanMvdml0ZSc7XG5pbXBvcnQgeyB2YW5pbGxhRXh0cmFjdFBsdWdpbiB9IGZyb20gJ0B2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBzdHlsZVgoKSxcbiAgICB3eXcoe1xuICAgICAgaW5jbHVkZTogWycqKi8qLntqcyxqc3gsdHMsdHN4fSddLFxuICAgIH0pLFxuICAgIHZhbmlsbGFFeHRyYWN0UGx1Z2luKHtcbiAgICAgIGlkZW50aWZpZXJzOiAnc2hvcnQnLFxuICAgIH0pXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxvQkFBb0I7QUFDblMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFFckMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsc0JBQXNCO0FBQUEsSUFDbEMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFDbkIsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
