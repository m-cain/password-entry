/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  define: {
    "import.meta.vitest": "undefined",
  },
  build: {
    watch: {},
    lib: {
      entry: "src/index.ts",
      name: "password-entry",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    includeSource: ["src/**/*.{js,ts}"],
    // setupFiles: ["./src/setup.ts"],
  },
});
