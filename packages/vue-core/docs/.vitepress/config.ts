import { defineConfig } from "vitepress";
import data from "./data/items.json";

function buildSidebar() {
  const kindOrder = ["composable", "component", "utility"];
  const kindLabel: Record<string, string> = {
    composable: "Composables",
    component: "Components",
    utility: "Utilities",
    type: "Types",
  };

  const kinds = Object.entries(data.kinds).sort(([a], [b]) => kindOrder.indexOf(a) - kindOrder.indexOf(b));

  return [
    {
      text: "API",
      link: "/api/",
      items: kinds.map(([kind, items]) => ({
        text: kindLabel[kind] ?? kind,
        collapsed: true,
        items: [
          { text: `All ${kindLabel[kind] ?? kind}`, link: `/api/${kind}/` },
          ...items.map((item) => ({
            text: item.name,
            link: `/api/${kind}/${item.id}`,
          })),
        ],
      })),
    },
  ];
}

export default defineConfig({
  title: "@petr-ptacek/vue-core",
  base: "/js-lab/vue-core/",
  description: "Vue 3 components and composables",
  ignoreDeadLinks: true,

  themeConfig: {
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

    socialLinks: [{ icon: "github", link: "https://github.com/petr-ptacek/js-lab" }],
  },
});
