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
        collapsed: true,
        link: "/api/array/",
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
        text: "Is What",
        collapsed: true,
        docFooterText: "Is What fafafvavfadf",
        items: [
          {
            text: "isUndefined",
            link: "/api-generated/functions/isUndefined",
          },
          {
            text: "isNull",
            link: "/api-generated/functions/isNull",
          },
          {
            text: "isNullable",
            link: "/api-generated/functions/isNullable",
          },
          {
            text: "isString",
            link: "/api-generated/functions/isString",
          },
          {
            text: "isNumber",
            link: "/api-generated/functions/isNumber",
          },
          {
            text: "isFunction",
            link: "/api-generated/functions/isFunction",
          },
          {
            text: "isArray",
            link: "/api-generated/functions/isArray",
          },
          {
            text: "isBoolean",
            link: "/api-generated/functions/isBoolean",
          },
          {
            text: "isDate",
            link: "/api-generated/functions/isDate",
          },
          {
            text: "isObject",
            link: "/api-generated/functions/isObject",
          },
          {
            text: "isPlainObject",
            link: "/api-generated/functions/isPlainObject",
          },
          {
            text: "isSymbol",
            link: "/api-generated/functions/isSymbol",
          },
          {
            text: "isValidDate",
            link: "/api-generated/functions/isValidDate",
          },
          {
            text: "isNaNValue",
            link: "/api-generated/functions/isNaNValue",
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
