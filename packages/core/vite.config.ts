/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { URL, fileURLToPath } from "node:url";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "@vueuse/core"],
    },
  },
  plugins: [
    dtsPlugin({
      entryRoot: "src",
      outDir: "dist",
      insertTypesEntry: true,
      tsconfigPath: "tsconfig.app.json",
      exclude: [
        "vite.config.ts",
        "**/*.config.ts",
        "**/*.config.js",
      ],
    }),
  ],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
