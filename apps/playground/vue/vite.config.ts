import { fileURLToPath, URL } from "node:url";

import tailwindcss      from "@tailwindcss/vite";
import vue              from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(
        new URL("./src", import.meta.url),
      ),
      "@petr-ptacek/vue-core": fileURLToPath(
        new URL("../../../packages/js-core/src", import.meta.url),
      ),
      "@petr-ptacek/vue-ui": fileURLToPath(
        new URL("../../../packages/vue-core/src", import.meta.url),
      ),
    },
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
