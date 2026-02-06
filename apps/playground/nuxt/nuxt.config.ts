import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: [
    "./app/assets/styles/index.css",
  ],
  modules: [
    "@nuxt/ui",
  ],
  vite: {
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
