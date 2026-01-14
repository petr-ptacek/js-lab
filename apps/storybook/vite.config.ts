import { URL, fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@petr-ptacek/vue-ui": fileURLToPath(
        new URL("../../packages/vue-ui/src", import.meta.url),
      ),
      "@petr-ptacek/vue-core": fileURLToPath(
        new URL("../../packages/vue-core/src", import.meta.url),
      ),
    },
  },
  server: {
    fs: { allow: [".."] },
  },
});
