const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
  // FOR LOCAL BUILD
  // add /dist to the base of the url of the image folder on build to make it work

  base: "/dist/",
  build: {
    outDir: "home",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  // Websocket is not supported in the browser
  server: {
    proxy: {
      "^/home//ws": {
        target: "ws://127.0.0.1:5500",
        ws: false,
      },
    },
  },
});
