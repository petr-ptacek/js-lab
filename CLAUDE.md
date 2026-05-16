# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**js-lab** is a pnpm monorepo containing reusable TypeScript utilities and Vue components/composables for frontend
applications.

**Key packages:**

- `@petr-ptacek/js-core` (published): Framework-agnostic JavaScript/TypeScript utilities with 80%+ test coverage
  requirement
- `@petr-ptacek/vue-core` (private): Vue 3 components and composables that depend on js-core
- `@petr-ptacek/vue-test-utils` (internal): Testing utilities for Vue components used within the monorepo

**Applications:**

- `apps/playground/nuxt`: Nuxt 4 playground for testing packages
- `apps/storybook`: Storybook setup (present but minimal)

## Project Configuration

**Package Manager:** pnpm 10.33.0 (required)  
**Node Version:** >=22  
**Language:** TypeScript 5.9+ with strict mode  
**Linter:** ESLint 10 + typescript-eslint 8 + eslint-plugin-vue 10  
**Formatter:** Prettier 3  
**Test Framework:** Vitest 4.1.2 with v8 coverage provider  
**Build Tool:** Vite (per-package)  
**Documentation:** VitePress 1.6.4  
**Release Management:** Changesets CLI  
**Git Hooks:** Husky + lint-staged + commitlint

## Architecture Principles

**Dependency Direction:**

```
vue-core → js-core → (no framework dependencies)
```

- `js-core` must remain **framework-agnostic** and contain no Vue-specific code
- `vue-core` may depend on js-core but not vice versa
- `vue-test-utils` is internal only and not published

**Code Organization:**

- Each package is organized by domain. Current js-core domains: `array`, `async`, `browser`, `crypto`, `error`, `event`,
  `number`, `object`, `type`, `validation`
- Each utility exports `meta` information (id, name, description, category, tags, since version, demo flag, snippets
  flag)
- Functions must be fully typed with TSDoc documentation
- Prefer explicit types over implicit ones; avoid `any`

**Test Coverage:**

- All public utilities require unit tests using Vitest
- js-core enforces 80% threshold on branches, functions, lines, and statements
- Test files: `src/**/*.test.ts`
- Internal code (`src/_internal/`) is excluded from coverage thresholds

## Commands

### Common Development

```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test

# Run tests in watch mode (per-package)
pnpm --filter @petr-ptacek/js-core run test:watch

# Type checking
pnpm typecheck

# Linting and formatting
pnpm lint                 # ESLint check
pnpm lint:fix             # ESLint auto-fix
pnpm format               # Prettier write
pnpm format:check         # Prettier check (CI)

# Build
pnpm --filter @petr-ptacek/js-core run build

# Development
pnpm dev                  # Start Nuxt playground
```

### Per-Package Commands

For `@petr-ptacek/js-core`:

```bash
pnpm --filter @petr-ptacek/js-core run test          # Run tests once
pnpm --filter @petr-ptacek/js-core run test:watch    # Watch mode
pnpm --filter @petr-ptacek/js-core run coverage      # Generate coverage report
pnpm --filter @petr-ptacek/js-core run coverage:ui   # Coverage with UI
pnpm --filter @petr-ptacek/js-core run type:check    # TypeScript check
pnpm --filter @petr-ptacek/js-core run build         # Vite build (ESM only)
pnpm --filter @petr-ptacek/js-core run prepublishOnly # Full release check
pnpm --filter @petr-ptacek/js-core run release:check # typecheck + test + build
pnpm --filter @petr-ptacek/js-core run release:dry   # release:check + npm publish --dry-run
pnpm --filter @petr-ptacek/js-core run clear         # Remove dist/ and .tmp
```

For `@petr-ptacek/vue-core`:

```bash
pnpm --filter @petr-ptacek/vue-core run test
pnpm --filter @petr-ptacek/vue-core run type:check
pnpm --filter @petr-ptacek/vue-core run dev         # Start Vite dev server
```

### Documentation

```bash
pnpm docs:dev            # VitePress docs in dev mode
pnpm docs:build          # Build docs for all packages
pnpm --filter @petr-ptacek/js-core run docs:dev    # Per-package docs
```

## TypeScript Configuration

- **Base config:** `tsconfig.app.base.json` (ES2022, strict mode, bundler resolution)
- **App-level:** `tsconfig.json` (project references to packages)
- **Per-package:** Each package has `tsconfig.app.json` (for type checking) and `tsconfig.types.json` (for declaration
  emission)
- **Strict rules enforced:**
  - `noUnusedLocals`, `noUnusedParameters`
  - `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`
  - `verbatimModuleSyntax`, `forceConsistentCasingInFileNames`
  - `noExplicitAny` (warn in linter, off in playground and tests)

## ESLint + Prettier Configuration

**ESLint** (`eslint.config.ts` — flat config):

- `typescript-eslint` recommended rules for all `.ts` files
- `eslint-plugin-vue` vue3-recommended rules for `.vue` files
- `vue-eslint-parser` as main parser for `.vue`, `@typescript-eslint/parser` as sub-parser inside `<script lang="ts">`
- `@typescript-eslint/no-explicit-any`: warn globally, off in tests and playground
- `@typescript-eslint/consistent-type-imports`: enforced (use `import type`)
- Test files (`**/*.test.ts`, `**/*.spec.ts`): `no-explicit-any` off, `no-unused-vars` off
- Playground (`apps/playground/**`): `no-explicit-any` off, `no-console` off

**Prettier** (`.prettierrc`):

- 2-space indentation, 120-character line width
- Double quotes, semicolons, trailing commas (es5)
- `singleAttributePerLine`, `endOfLine: lf`, `htmlWhitespaceSensitivity: ignore`
- `eslint-config-prettier` disables conflicting ESLint rules (applied last in ESLint config)

## Test Setup

**Vitest Configuration:**

- Environment: jsdom (DOM API available)
- Pattern: `src/**/*.test.ts`
- Coverage provider: v8
- Setup files: Per-package (e.g., `vue-core` has `test/setup.ts`)
- Coverage thresholds: 80% for js-core

**Running Tests:**

- Single package: `pnpm --filter @scope/package run test`
- Watch mode: `pnpm --filter @scope/package run test:watch`
- Coverage UI: `pnpm --filter @scope/package run coverage:ui`

## Publishing and Versioning

**Changesets Workflow:**

1. Create `.changeset/<pr-name>.md` with version bump and changelog
2. Changesets config ignores: `@petr-ptacek/vue-core`, `@petr-ptacek/playground-nuxt`, `@petr-ptacek/vue-test-utils`
3. Only `@petr-ptacek/js-core` is published to npm (public access)
4. Commands:
   ```bash
   pnpm changeset           # Create new changeset
   pnpm changeset:version   # Bump versions
   pnpm changeset:publish   # Publish to npm
   ```

## Commit Message Guidelines

**Format:** `<type>(<scope>): <subject>`

**Types:** feat, fix, refactor, perf, docs, test, chore, build, ci, style, release

**Scope:** Required (enforced by commitlint). Package/domain (e.g., `js-core/crypto`, `vue-core/composable`, `repo`,
`config`)

**Subject:** Lower-case, no period, imperative mood, max 100 chars

**Examples:**

- `feat(js-core/crypto): add create-uuid-v4 utility`
- `fix(js-core/json): handle invalid json input`
- `refactor(vue-core/composable): simplify use-fetch logic`
- `docs(js-core/async): improve abortable documentation`

Commits are enforced via commitlint (Husky pre-commit hook).

## Build Output

**js-core:**

- ESM-only (`dist/index.js`)
- Type declarations (`dist/types/index.d.ts`)
- Side-effect free for tree-shaking
- Main entry point: `./dist/index.js`

**vue-core:**

- ESM only
- Exports style.css separately
- External dependencies: vue, @vueuse/core (not bundled)

## Code Patterns and Conventions

**Naming:**

- camelCase for variables, functions
- PascalCase for types, classes, components

**Utility Structure:**

- Each domain has an `index.ts` exporting utilities
- Utilities export `meta` object with metadata (id, name, description, category, tags, since, demo, snippets)
- Internal helpers in `_internal/` directory

**Type Guards:**

- Many utilities in `src/type/` for runtime type checking
- Full TypeScript inference for public functions

**Validation:**

- `src/validation/` contains schema validation and data validators
- TSDoc comments describe behavior and usage clearly

## VitePress Documentation

- Main docs in `docs/` directory with `.vitepress/` config
- Per-package docs generation scripts (e.g., `docs/.vitepress/scripts/generateApiMetadata.ts`)
- Homepage: https://petr-ptacek.github.io/js-lab/
- js-core API docs: https://petr-ptacek.github.io/js-lab/js-core/

## Development Workflow Notes

**Workspace References:**

- Use `workspace:*` protocol in pnpm for internal dependencies
- Ensures proper symlinking during development

**Git Configuration:**

- onlyBuiltDependencies: `@parcel/watcher`, `esbuild`, `vue-demi`
- Files ignored from version control: dist/, build/, coverage/, out/

**Pre-commit Hooks:**

- `pnpm lint-staged` runs Prettier + ESLint on staged files (Prettier first, then ESLint)
- commitlint validates commit message format

## When Adding New Utilities

1. **Create domain folder** if needed (e.g., `src/domain/`)
2. **Add utility file** with TSDoc and export `meta` object
3. **Write tests** in `src/domain/utility.test.ts` targeting 80%+ coverage
4. **Export from index** in `src/domain/index.ts` and `src/index.ts`
5. **Create changeset** for release tracking
6. **Update documentation** if public API is significant
7. **Run full checks:** `pnpm typecheck`, `pnpm test`, `pnpm lint`
