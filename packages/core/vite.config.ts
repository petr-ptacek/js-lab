import { defineConfig } from "vite";
import path from "node:path";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
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
});
