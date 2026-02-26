// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from "eslint-plugin-storybook";

import js                   from "@eslint/js";
import tsPlugin             from "@typescript-eslint/eslint-plugin";
import tsParser             from "@typescript-eslint/parser";
import { defineConfig }     from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin         from "eslint-plugin-import";
import unusedImportsPlugin  from "eslint-plugin-unused-imports";
import vitest               from "eslint-plugin-vitest";
import pluginVue            from "eslint-plugin-vue";
import globals              from "globals";
import vueParser            from "vue-eslint-parser";

export default defineConfig([
  /* ------------------------------------------------------------------ *
   * Ignore
   * ------------------------------------------------------------------ */
  {
    ignores: [
      "**/dist/**",
      "**/.output/**",
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/coverage/**",

      // docs
      "**/docs/**",
      "**/.vitepress/**",
      "**/docs/.vitepress/**",
      "**/docs/**/api/**", // TypeDoc output (markdown)
    ],
  },

  /* ------------------------------------------------------------------ *
   * Základní JS doporučení
   * ------------------------------------------------------------------ */
  js.configs.recommended,

  {
    files: ["**/*.{ts,mts,cts,tsx,vue}"],
    rules: {
      "no-undef": "off",
    },
  },

  /* ------------------------------------------------------------------ *
   * JS / TS / Vue (script část)
   * ------------------------------------------------------------------ */
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      /* ---------------- TS ---------------- */

      ...tsPlugin.configs.recommended.rules,
      //"no-undef": "off", // vypnuto, protože TS tohle řeší

      "@typescript-eslint/no-explicit-any": "warn",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      /* vynutit import type */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      /* ---------------- Unused imports ---------------- */

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",

      /* ---------------- Imports ---------------- */

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      /* ---------------- Obecné ---------------- */

      "no-debugger": "error",

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
          "ts-expect-error": true,
          "ts-nocheck": false,
          "ts-check": false,
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Vue SFC
   * ------------------------------------------------------------------ */
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs["flat/recommended"].rules,
    },
  },

  /* --------------------------------------------------------------
  * TESTY
  * --------------------------------------------------------------- */
  {
    files: [
      "**/*.test.{ts,tsx}",
      "**/*.spec.{ts,tsx}",
    ],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: vitest.environments.env.globals,
    },
    rules: {
      ...vitest.configs.recommended.rules,

      "vitest/expect-expect": [
        "error",
        {
          assertFunctionNames: [
            "expect",
            "expectTypeOf",
          ],
        },
      ],

      /* testy mohou být volnější */
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",
      "@typescript-eslint/ban-ts-comment": "off",


      /* v testech neřešíme import pořadí */
      "import/order": "off",
    },
  },

  /* TS Overloads */
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",
    },
  },

  /* ------------------------------------------------------------------ *
   * Prettier (vypnutí stylistických pravidel)
   * ------------------------------------------------------------------ */
  eslintConfigPrettier,
]);
