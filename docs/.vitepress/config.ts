import { defineConfig } from "vitepress";

export default defineConfig({
  title: "JS Lab",
  description: "Monorepo documentation",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "JS Core", link: "/js-core/" },
    ],
    sidebar: {
      "/js-core/": [
        {
          text: "JS Core",
          items: [
            { text: "Overview", link: "/js-core/" },
            { text: "API Reference", link: "/js-core/api/" },
          ],
        },
      ],
    },
  },
});
