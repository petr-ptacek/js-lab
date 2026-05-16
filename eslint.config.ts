import eslintConfigPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/cache/**",
      "**/.vitepress/cache/**",
    ],
  },

  // TypeScript recommended rules for .ts files
  tseslint.configs.recommended,

  // Vue 3 recommended rules for .vue files (sets vue-eslint-parser as main parser)
  // Note: eslint-plugin-vue v10 dropped the vue3- prefix; flat/recommended targets Vue 3
  pluginVue.configs["flat/recommended"],

  // Use TypeScript parser inside <script lang="ts"> blocks in .vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Global rules across all files
  {
    rules: {
      // Allow _-prefixed variables to be unused (intentionally unused params/vars convention)
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "no-console": "warn",
      "no-debugger": "error",
      // Existing .vue files use <style> first — suppress until files are reorganized
      "vue/block-order": "warn",
      // Preloader in vue-core is a private component; relax multi-word requirement
      "vue/multi-word-component-names": "warn",
    },
  },

  // Type declaration files often need {} for generic Vue component types
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // Snippet files are documentation examples — intentionally use console and unused vars
  {
    files: ["**/snippets/**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Relaxed rules for test files
  {
    files: ["**/*.test.ts", "**/*.spec.ts", "**/test/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Relaxed rules for playground (experimental code)
  {
    files: ["apps/playground/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },

  // Nuxt pages and layouts use single-word filenames by convention (index.vue, default.vue)
  {
    files: ["apps/playground/**/pages/**/*.vue", "apps/playground/**/layouts/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },

  // Prettier disables all formatting-related ESLint rules (must be last)
  eslintConfigPrettier
);
