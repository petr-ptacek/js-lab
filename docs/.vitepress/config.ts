import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JS Lab",
  description: "JavaScript Playground",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "JS Core",
        items: [
          { text: "Overview", link: "/api/js-core/" },
          { text: "Array", link: "/api/js-core/array" },
          { text: "Math", link: "/api/js-core/math/" },
          { text: "Object", link: "/api/js-core/object/" },
          { text: "Is / What", link: "/api/js-core/is-what/" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
