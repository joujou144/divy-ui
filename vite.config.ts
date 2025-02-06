/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({ rollupTypes: true })],
  build: {
    // lib entry and output settings
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "divy-ui",
      fileName: "divy-ui",
    },
    // bundler options, externalise react-related imports
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
  resolve: {
    alias: {
      "divy-ui": resolve(__dirname, "./lib"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./lib/test/setup.ts",
    css: true,
  },
});
