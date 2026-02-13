module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
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
    "scope-empty": [2, "never"],
    "subject-case": [2, "always", ["lower-case"]],
    "subject-full-stop": [2, "never", "."],
  },
};
