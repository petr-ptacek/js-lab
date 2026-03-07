import { defineConfig } from "vitepress";
import data             from "./data/utilities.json";

function buildSidebar() {
  const categories = Object.entries(data.categories)
                           .sort(([a], [b]) => a.localeCompare(b)); // Sort categories A-Z

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
            link: `/api/${category}/`,
          },
          ...utils.map(u => ({
            text: u.name,
            link: `/api/${u.category}/${u.id}`,
          })),
        ],
      })),
    },
  ];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@petr-ptacek/js-core",
  base: "/js-lab/js-core/",
  description: "JavaScript & TypeScript utility library",
  // base: "/js-core/",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "API Reference", link: "/api/" },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/api/": buildSidebar(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/petr-ptacek/js-lab" },
    ],
  },
});
