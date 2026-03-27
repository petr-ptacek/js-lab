## Commit Messages

Use conventional commits format:

    <type>(<scope>): <short summary>

## Rules:

- scope is required
- use kebab-case or path-like scopes (e.g. js-core/crypto)
- subject must be lower-case
- no trailing period

`<type>(<scope>): <subject>`

Generate commit message based on staged changes.
Focus on WHAT changed, not HOW.
Use scope based on package and domain.

## Type

- type must be one of:
  - feat
  - fix
  - refactor
  - perf
  - docs
  - test
  - chore
  - build
  - ci
  - style

## Scope

Use path-like scope:

`<package>/<domain>`

- js-core/crypto
- js-core/json
- vue-core/component
- repo
- js-core/crypto
- js-core/json
- js-core/async
- vue-core/component
- vue-core/composable
- repo
- config
- playground/vue
- playground/nuxt

## Subject

- describe change clearly
- lower-case only
- no trailing period
- max 100 characters
- use imperative mood (add, fix, update...)

## Examples:

- feat(js-core/crypto): add create-uuid-v4 utility

- fix(js-core/json): handle invalid json input

- refactor(vue-core/composable): simplify use-fetch logic

- test(js-core/object): add tests for deep-merge

- docs(js-core/async): improve abortable documentation

- ci(repo): add github pages deploy workflow

## Output

Generate a single commit message line.
Do not add explanation.
