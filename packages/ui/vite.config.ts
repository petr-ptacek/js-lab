import { URL, fileURLToPath } from "node:url";

import vuePlugin        from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dtsPlugin        from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
  plugins: [
    vuePlugin(),
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
