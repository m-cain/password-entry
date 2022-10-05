/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
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
      output: {
        sourcemapExcludeSources: true,
      },
      external: [...Object.keys(pkg.peerDependencies), "react/jsx-runtime"],
    },
    minify: false,
    sourcemap: true,
    target: "esnext",
  },
  test: {
    globals: true,
    includeSource: ["src/**/*.{js,ts}"],
  },
});
