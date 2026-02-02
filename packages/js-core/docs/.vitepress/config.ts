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
          },
        ],
      },
      {
        text: "Object",
        collapsed: true,
        items: [
          {
            text: "get",
            link: "/api/object/get",
          },
          {
            text: "entries",
            link: "/api/object/entries",
          },
        ],
      },
      {
        text: "Emitter",
        link: "/api/emitter/",
      },
      {
        text: "DOM",
        collapsed: true,
        items: [
          {
            text: "isInteractiveElement",
            link: "/api-generated/functions/isInteractiveElement",
          },
          {
            text: "loadImage",
            link: "/api-generated/functions/loadImage",
          },
        ],
      },
      {
        text: "Math",
        collapsed: true,
        items: [
          {
            text: "toPercentage",
            link: "/api-generated/functions/toPercentage",
          },
          {
            text: "clamp",
            link: "/api-generated/functions/clamp",
          },
          {
            text: "getRandomNumber",
            link: "/api-generated/functions/getRandomNumber",
          },
          {
            text: "getAspectRatio",
            link: "/api-generated/functions/getAspectRatio",
          },
          {
            text: "scaleByAspectRatio",
            link: "/api/math/scaleByAspectRatio",
          },
        ],
      },
      {
        text: "Safe/Execution",
        collapsed: true,
        items: [
          {
            text: "withTryCatch",
            link: "/api/safe/withTryCatch",
          },
          {
            text: "withTryCatchSync",
            link: "/api/safe/withTryCatchSync",
          }
        ]
      },
      {
        text: "Is What",
        collapsed: true,
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
          },
          {
            text: "isPrimitive",
            link: "/api-generated/functions/isPrimitive",
          },
        ],
      },
      {
        text: "Types",
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
          },
          {
            text: "InteractiveElementOptions",
            link: "/api-generated/type-aliases/InteractiveElementOptions",
          },
          {
            text: "EmitterEvents",
            link: "/api-generated/type-aliases/EmitterEvents",
          },
          {
            text: "EmitterEventHandler",
            link: "/api-generated/type-aliases/EmitterEventHandler",
          },
          {
            text: "EmitterInitialHandlers",
            link: "/api-generated/type-aliases/EmitterInitialHandlers",
          },
          {
            text: "Dimensions",
            link: "/api-generated/type-aliases/Dimensions",
          },
          {
            text: "RoundValueFn",
            link: "/api-generated/type-aliases/RoundValueFn",
          },
          {
            text: "WithTryCatchOptions",
            link: "/api-generated/type-aliases/WithTryCatchOptions",
          },
          {
            text: "TryCatchResult",
            link: "/api-generated/type-aliases/TryCatchResult",
          },
          {
            text: "TryCatchResultSuccess",
            link: "/api-generated/type-aliases/TryCatchResultSuccess",
          },
          {
            text: "TryCatchResultFailure",
            link: "/api-generated/type-aliases/TryCatchResultFailure",
          },
          {
            text: "TryCatchResultFailureNoData",
            link: "/api-generated/type-aliases/TryCatchResultFailureNoData",
          },
          {
            text: "TryCatchResultFailureWithData",
            link: "/api-generated/type-aliases/TryCatchResultFailureWithData",
          },
        ],
      },
      {
        text: "Constants",
        collapsed: true,
        items: [
          {
            text: "DEFAULT_INTERACTIVE_SELECTORS",
            link: "/api-generated/variables/DEFAULT_INTERACTIVE_SELECTORS",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
