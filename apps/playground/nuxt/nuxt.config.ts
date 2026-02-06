import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app: {
    head: {
      bodyAttrs: {
        class: "",
      },
    },
  },
  css: [
    "./app/assets/styles/index.css",
  ],
  modules: [
    "@nuxt/ui",
  ],
  vite: {
    resolve: {
      alias: {
        "@petr-ptacek/js-core": fileURLToPath(
          new URL("../../../packages/js-core/src", import.meta.url),
        ),
        "@petr-ptacek/vue-core": fileURLToPath(
          new URL("../../../packages/vue-core/src", import.meta.url),
        ),
      },
    },
    plugins: [
      tailwindcss() as any,
    ],
  },
  devtools: { enabled: true },
  ssr: false,
  components: false,
  imports: {
    autoImport: false,
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          "@petr-ptacek/vue-core": [
            "../../../../packages/vue-core/src",
          ],
          "@petr-ptacek/js-core": [
            "../../../../packages/js-core/src",
          ],
        }
      },
    },
  },
  ui: {
    colorMode: false,
    theme: {
      colors: [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
});
