import { defineConfig } from "vitepress";
import { createSidebar } from "./src";

import { modules } from "../modules";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JS Core",
  description: "JavaScript & TypeScript utility library",
  base: "/js-core/",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: "Home", link: "/" },
    //   { text: "API", link: "/api/" },
    // ],

    sidebar: createSidebar(modules),

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
