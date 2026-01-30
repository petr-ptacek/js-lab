import { defineConfig } from "vitepress";
import { createApiSidebar } from "./api";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JS Core",
  description: "JavaScript & TypeScript utility library",
  srcDir: "src",
  base: "/js-core/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: "Home", link: "/" },
    //   { text: "API", link: "/api/" },
    // ],

    sidebar: createApiSidebar(),

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
