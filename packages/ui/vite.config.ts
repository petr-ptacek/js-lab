import { URL, fileURLToPath } from "node:url";

import tailwindcssPlugin from "@tailwindcss/vite";
import vuePlugin         from "@vitejs/plugin-vue";
import { defineConfig }  from "vite";
import dtsPlugin         from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      fileName: "index",
      formats: ["es"],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.type === "asset" &&
            assetInfo.originalFileNames?.some((name) =>
              name.endsWith(".css"),
            )
          ) {
            return "style.css";
          }

          return "[name][extname]";
        },
      },
    },
  },
  plugins: [
    tailwindcssPlugin(),
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
