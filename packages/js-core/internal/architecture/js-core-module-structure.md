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
      types.ts
      utils.ts
      __tests__/
        createUUIDV4.test.ts
      README.md

Not all files are mandatory. Minimal modules may contain fewer files.

------------------------------------------------------------------------

# File Responsibilities

## index.ts

Defines the **public API of the module**.

This file **must not contain implementation logic**. It acts as the
**public API boundary** of the module.

Example:

``` ts
export { createUUIDV4 } from './createUUIDV4'
export type { UUID } from './types'
```

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

``` ts
export function createUUIDV4(): string {
  return crypto.randomUUID()
}
```

Rules:

- contains core functionality
- should be focused and minimal
- may use helpers from `utils.ts`

If multiple implementations exist:

    withTryCatch/
      withTryCatch.ts
      withTryCatchSync.ts

------------------------------------------------------------------------

## types.ts

Contains **TypeScript type definitions** used by the module.

This file may include:

- public types (exported via `index.ts`)
- internal types

Example:

``` ts
export type UUID = string
```

If the number of types grows significantly:

    types/
      public.ts
      internal.ts

For most utilities, a single `types.ts` file is preferred.

------------------------------------------------------------------------

## utils.ts

Contains **internal helper functions** used by the module
implementation.

These utilities:

- should not be exported through `index.ts`
- are considered private implementation details

Example:

``` ts
export function ensureHex(value: string): string {
  return value.toLowerCase()
}
```

Rules:

- avoid exporting helpers publicly
- keep helpers small and focused

------------------------------------------------------------------------

## **tests**/

Contains **Vitest test files** for the module.

Example:

    __tests__/
      createUUIDV4.test.ts

Benefits:

- cleaner implementation files
- easier tooling configuration
- tests are never included in production bundles

------------------------------------------------------------------------

## README.md

Contains the **documentation for the utility module**.

README is preferred over `index.md` because:

- GitHub automatically displays `README.md` in directories
- developers browsing the repository can immediately see documentation
- npm users often read documentation directly in the repository
- AI coding assistants index README files reliably

Example structure:

``` md
# createUUIDV4

Generate RFC4122 UUID v4.

## Usage

```ts
import { createUUIDV4 } from '@petr-ptacek/js-core'

const uuid = createUUIDV4()
```

## Why not crypto.randomUUID

Explanation of design decisions.

## Design Notes

Implementation trade-offs and reasoning.

    README files can also be consumed by **VitePress** when generating documentation pages.

    ------------------------------------------------------------------------

    # Minimal Module Variant

    For simple utilities, a reduced structure is acceptable:

        createUUIDV4/
          index.ts
          createUUIDV4.ts
          __tests__/
          README.md

    Additional files should only be introduced when they provide clear value.

    ------------------------------------------------------------------------

    # Root Export Structure

    All modules are re-exported from the package root.

    Example:

        src/index.ts

    ```ts
    export * from './createUUIDV4'
    export * from './parseJSONSafe'
    export * from './withTryCatch'

This allows consumers to import utilities from a single entry point.

------------------------------------------------------------------------

# Special Case: Type Utilities

In addition to feature utilities, the library also contains **shared
TypeScript type primitives**.

A type file may contain multiple related type utilities. If the file grows too large, it may be converted into a
directory with individual type modules.

These are not treated as feature modules because they:

- do not provide runtime functionality
- act as reusable type building blocks
- would gain little value from the full module structure

Type utilities therefore use a **flat structure**.

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

The `index.ts` file in the `type` directory re‑exports all type
primitives so they can be imported from the package root:

``` ts
export * from './type'
```

Usage example:

``` ts
import type { Maybe } from '@petr-ptacek/js-core'
```

------------------------------------------------------------------------

# Design Principles

The `js-core` module architecture follows several principles.

Feature isolation\
Each utility lives in its own directory.

Explicit public API\
`index.ts` defines what is publicly exported.

Implementation separation\
Internal helpers and types are separated from the public API.

Documentation per utility\
Each module contains its own documentation.

Scalable structure\
The pattern works equally well for small and large utilities.

------------------------------------------------------------------------

# Naming Conventions

Naming conventions for utilities are defined in a **separate document**.

Recommended file:

    docs/architecture/naming-conventions.md

Keeping naming rules separate ensures:

- architectural rules remain stable
- naming rules can evolve independently
- documentation stays easier to maintain

------------------------------------------------------------------------

# Summary

Canonical module structure:

    <feature>/
      index.ts
      <feature>.ts
      types.ts
      utils.ts
      __tests__/
      README.md

Core rules:

- `index.ts` defines the public API
- implementation lives in dedicated files
- tests live in `__tests__`
- documentation lives in `README.md`
- each utility is an isolated module
