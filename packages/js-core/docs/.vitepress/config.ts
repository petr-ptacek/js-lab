import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@petr-ptacek/js-core",
  description: "JavaScript & TypeScript utility library",
  base: "/js-core/",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: "Home", link: "/" },
    //   { text: "API", link: "/api/" },
    // ],

    sidebar: [
      {
        text: "Array",
        collapsed: false,
        items: [
          {
            text: "shuffle",
            link: "/api-generated/functions/shuffle",
          },
          {
            text: "zip",
            link: "/api-generated/functions/zip",
          },
          {
            text: "range",
            link: "/api-generated/functions/range",
          }
        ]
      },
      {
        text: "TS - Types",
        collapsed: true,
        items: [
          {
            text: "MaybeUndefined",
            link: "/api-generated/type-aliases/MaybeUndefined",
          },
          {
            text: "MaybeNull",
            link: "/api-generated/type-aliases/MaybeNull",
          },
          {
            text: "MaybeNullable",
            link: "/api-generated/type-aliases/MaybeNullable",
          },
          {
            text: "MaybePromise",
            link: "/api-generated/type-aliases/MaybePromise",
          },
          {
            text: "Dict",
            link: "/api-generated/type-aliases/Dict",
          },
          {
            text: "PrimitiveValue",
            link: "/api-generated/type-aliases/PrimitiveValue",
          }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
