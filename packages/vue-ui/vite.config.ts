import { fileURLToPath, URL } from "node:url";

import tailwindcssPlugin      from "@tailwindcss/vite";
import vuePlugin              from "@vitejs/plugin-vue";
import { defineConfig }       from "vite";


export default defineConfig({
  resolve: {
    alias: {
      "@petr-ptacek/vue-core": fileURLToPath(
        new URL("../vue-core/src", import.meta.url),
      ),
    },
  },
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
  ],
});
