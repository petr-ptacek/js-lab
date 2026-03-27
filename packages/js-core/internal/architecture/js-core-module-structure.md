# js-core Module Structure

This document defines the canonical structure of a **utility module**
inside the `@petr-ptacek/js-core` package.

The goal of this structure is to ensure:

- predictable project organization
- clear public API boundaries
- maintainable implementation
- easy testability
- straightforward documentation generation
- compatibility with AI coding assistants (Copilot, ChatGPT)

Each utility must live in its **own directory**, representing a
self-contained module.

------------------------------------------------------------------------

# Module Directory Layout

Example module:

    createUUIDV4/

Canonical structure:

    createUUIDV4/
      index.ts
      createUUIDV4.ts
      types.ts or types/
      utils.ts or utils/
      helpers.ts or helpers/
      meta.ts
      __tests__/
        createUUIDV4.test.ts
      README.md
      demo/
        basic.vue
      snippets/
        basic.ts

Not all files are mandatory. Minimal modules may contain fewer files.

------------------------------------------------------------------------

# File Responsibilities

## index.ts

Defines the **public API of the module**.

This file **must not contain implementation logic**. It acts as the
**public API boundary** of the module.

Example:

export { createUUIDV4 } from './createUUIDV4'
export type { UUID } from './types'

Responsibilities:

- expose public functions
- expose public types
- define the external API boundary

Benefits:

- internal files can be refactored safely
- clear separation between internal and public code
- predictable import structure

------------------------------------------------------------------------

## `<feature>`.ts

Contains the **main implementation of the module**.

Example:

```ts
export function createUUIDV4(): string {
  return crypto.randomUUID();
}
```

Rules:

- contains core functionality
- should be focused and minimal
- may use helpers from `utils.ts` or `helpers.ts`
- should not contain unrelated logic

------------------------------------------------------------------------

## types.ts

Contains **TypeScript type definitions** used by the module.

This file may include:

- public types (exported via `index.ts`)
- internal types

Example:

```ts
export type UUID = string
```

If the number of types grows significantly:

    types/
      public.ts
      internal.ts
       ... etc

For most utilities, a single `types.ts` file is preferred, but if the module has many types, a `types/` directory can be
used to organize them.

------------------------------------------------------------------------

## utils.ts

Contains **internal helper functions** used by the module
implementation.

If the number of helpers grows significantly, a `utils/` directory can be used to organize them.

These utilities:

- should not be exported through `index.ts`
- are considered private implementation details

Example:

```ts
export function ensureHex(value: string): string {
  return value.toLowerCase()
}
```

Rules:

- avoid exporting helpers publicly
- keep helpers small and focused

------------------------------------------------------------------------

## meta.ts

Contains **metadata describing the utility**.

Metadata is used primarily by documentation tooling (for example
VitePress) to automatically generate documentation pages and navigation.

Example:

```ts
export const meta = {
  id: "createUUIDV4",
  name: "createUUIDV4",
  description: "Generates a random UUID (version 4) string.",
  category: "crypto",
  tags: ["uuid", "v4", "random", "string", "crypto"],
  demo: false,
  snippets: false,
  since: "1.0.0",
} satisfies Meta;
```

Rules:

- metadata is **not part of the public API**
- metadata is used only by tooling
- metadata should remain small and stable

------------------------------------------------------------------------

## __tests__/

Contains **Vitest test files** for the module.

Example:

    __tests__/
      createUUIDV4.test.ts

Benefits:

- cleaner implementation files
- easier tooling configuration
- tests are never included in production bundles
- if the number of tests grows significantly, another files can be added to the `__tests__/` directory, for example:

  __tests__/
  createUUIDV4.test.ts
  edgeCases.test.ts
  performance.test.ts

------------------------------------------------------------------------

## README.md

Contains the **documentation for the utility module**.

README is preferred over `index.md` because:

- GitHub automatically displays `README.md` in directories
- developers browsing the repository can immediately see documentation
- npm users often read documentation directly in the repository
- AI coding assistants index README files reliably

`README` files can also be consumed by **VitePress** when generating documentation pages.

------------------------------------------------------------------------

## demo/

Contains **interactive examples** demonstrating how the utility works.

Example:

    demo/
      basic.vue
      button.vue

Rules:

- demo files are typically Vue components (`.vue`)
- multiple demo files are allowed
- demo files are not part of the public API
- demo files exist only for documentation purposes

------------------------------------------------------------------------

## snippets/

Contains **code snippets** demonstrating how to use the utility.

Example:

    snippets/
      basic.ts
      vue.vue
      node.ts

Rules:

- snippets may contain TypeScript or Vue examples
- multiple snippets are allowed
- snippets are used only for documentation
- snippets are not part of the public API

------------------------------------------------------------------------

# Minimal Module Variant

For simple utilities, a reduced structure is acceptable:

    createUUIDV4/
      index.ts
      README.md
      meta.ts
      createUUIDV4.ts
      __tests__/

Additional files should only be introduced when they provide clear value.

------------------------------------------------------------------------

# Root Export Structure

All modules are re-exported from the package root.

Example:

    src/index.ts

export * from './createUUIDV4'
export * from './parseJSONSafe'
export * from './withTryCatch'

This allows consumers to import utilities from a single entry point.

------------------------------------------------------------------------

# Special Case: Type Utilities

In addition to feature utilities, the library also contains **shared
TypeScript type primitives**.

Example:

    src/type/
      dictionary.ts
      dimensions.ts
      function.ts
      maybe.ts
      primitive.ts
      index.ts

These files export reusable types such as:

    Maybe<T>
    Dictionary<K, V>
    Primitive

------------------------------------------------------------------------

# Design Principles

The `js-core` module architecture follows several principles.

## Feature isolation

Each utility lives in its own directory.

## Explicit public API

`index.ts` defines what is publicly exported.

## Implementation separation

Internal helpers and types are separated from the public API.

## Documentation per utility

Each module contains its own documentation.

## Scalable structure

The pattern works equally well for small and large utilities.

------------------------------------------------------------------------

# Naming Conventions

Naming conventions for utilities are defined in a **separate document**.

Recommended file:

    docs/architecture/naming-conventions.md

------------------------------------------------------------------------

# Summary

Canonical module structure:

    <feature>/
      index.ts
      <feature>.ts
      types.ts
      utils.ts
      meta.ts
      __tests__/
      README.md
      demo/
      snippets/

Core rules:

- `index.ts` defines the public API
- implementation lives in dedicated files
- tests live in `__tests__`
- documentation lives in `README.md`
- each utility is an isolated module
