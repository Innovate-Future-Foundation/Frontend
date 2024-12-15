import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTest.ts",
    coverage: {
      reporter: ["text", "json", "html"]
    }
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
