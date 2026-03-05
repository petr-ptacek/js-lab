import { defineConfig } from "vitepress";
import data from "./data/utilities.json";

function buildSidebar() {
  const categories = Object.entries(data.categories);

  return [
    {
      text: "API",
      link: "/api/",
      items: categories.map(([category, utils]) => ({
        text: category.charAt(0).toUpperCase() + category.slice(1),
        collapsed: true,
        items: [
          {
            text: "All utilities",
            link: `/api/generated/${category}/`,
          },
          ...utils.map(u => ({
            text: u.name,
            link: `/api/generated/${u.category}/${u.id}`,
          })),
        ],
      })),
    },
  ];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@petr-ptacek/js-core",
  description: "JavaScript & TypeScript utility library",
  // base: "/js-core/",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: "Home", link: "/" },
    //   { text: "API", link: "/api/" },
    // ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/api/": buildSidebar(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
