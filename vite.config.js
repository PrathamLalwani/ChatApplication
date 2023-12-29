import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  base: "",
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
});
