module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    /**
     * Povolené typy
     */
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "perf",
        "docs",
        "test",
        "chore",
        "build",
        "ci",
        "style",
      ],
    ],

    /**
     * Scope je povinný
     */
    "scope-empty": [2, "never"],

    /**
     * Scope musí být kebab-case
     */
    "scope-case": [2, "always", "kebab-case"],

    /**
     * Zakázat tečku na konci subjectu
     */
    "subject-full-stop": [2, "never", "."],

    /**
     * Subject musí být lower-case (add, fix, rename...)
     */
    "subject-case": [2, "always", ["lower-case"]],

    /**
     * Whitelist povolených scope
     * Zatím zakomentováno — aktivuj pokud chceš tvrdou validaci
     */
    // "scope-enum": [
    //   2,
    //   "always",
    //   [
    //     "js-core",
    //     "vue-core",
    //     "repo",
    //     "config",
    //     "playground/vue",
    //     "playground/nuxt"
    //   ]
    // ],

    /**
     * Max délka subject line
     */
    "header-max-length": [2, "always", 72],
  },
};
