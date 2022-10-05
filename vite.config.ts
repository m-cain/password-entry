/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    base: `/example/`,
  },
  optimizeDeps: {
    exclude: ["react/jsx-runtime"],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "password-entry",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), "react/jsx-runtime"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    includeSource: ["src/**/*.{js,ts}"],
  },
});
