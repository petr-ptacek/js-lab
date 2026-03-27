## Commit Messages

Use conventional commits format:

    <type>(<scope>): <short summary>

## Rules:

- scope is required
- use kebab-case or path-like scopes (e.g. js-core/crypto)
- no trailing period

`<type>(<scope>): <subject>`

Generate commit message based on staged changes.
Focus on WHAT changed, not HOW.
Use scope based on package and domain.

## Type

Choose the correct type based on WHAT changed.

### feat

New functionality or capability.

Use when:

- adding new utility / composable / component
- introducing new public API
- extending existing behavior

Examples:

- add create-uuid-v4 utility
- add use-abortable composable

---

### fix

Bug fix.

Use when:

- incorrect behavior is corrected
- edge cases are handled
- runtime errors are fixed

Examples:

- fix abort signal not propagating
- handle invalid json input

---

### refactor

Code change without changing behavior.

Use when:

- restructuring code
- improving readability
- extracting logic
- renaming (without API change)

Do NOT use if behavior changes.

Examples:

- simplify abortable implementation
- extract validation logic

---

### perf

Performance improvement.

Use when:

- reducing allocations
- optimizing loops / algorithms
- improving runtime or memory usage

Examples:

- optimize deep-merge performance
- reduce unnecessary re-renders

---

### docs

Documentation only.

Use when:

- updating README, VitePress docs
- improving examples
- fixing typos in docs

Do NOT use if code changes.

Examples:

- update api documentation
- improve usage examples

---

### test

Tests only.

Use when:

- adding new tests
- updating existing tests
- fixing test cases

Examples:

- add tests for deep-merge
- fix failing async tests

---

### chore

Non-functional changes.

Use when:

- repo maintenance
- formatting, linting
- internal scripts
- no impact on runtime behavior

Examples:

- update dependencies
- clean up unused files

---

### build

Build system or packaging.

Use when:

- changing Vite / TS build config
- modifying output format
- updating bundling behavior

Examples:

- update vite build config
- adjust tsconfig paths

---

### ci

CI/CD configuration.

Use when:

- GitHub Actions changes
- deployment pipeline updates
- release automation

Examples:

- add github pages deploy
- update release workflow

---

### style

Code style only (no logic change).

Use when:

- formatting
- whitespace
- semicolons
- lint fixes

Examples:

- format codebase
- fix eslint issues

---

## Decision Guide

- New feature → feat
- Bug → fix
- Same behavior, different code → refactor
- Faster code → perf
- Docs only → docs
- Tests only → test
- Tooling / config → build
- CI/CD → ci
- Formatting → style
- Everything else → chore

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
