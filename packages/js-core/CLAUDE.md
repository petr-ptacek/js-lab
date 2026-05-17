# js-core — Claude Instructions

Package-specific rules for `@petr-ptacek/js-core`. Applies on top of the root `CLAUDE.md`.
Full design rationale lives in `internal/architecture/`.

## Module Structure

Every utility lives in its own directory inside a category folder:

```
src/<category>/<utilityName>/
  index.ts          ← public API boundary only, no logic
  <utilityName>.ts  ← implementation
  meta.ts           ← metadata for docs tooling
  types.ts          ← types (or types/ directory if many)
  helpers.ts        ← internal helpers (not exported)
  __tests__/
    <utilityName>.test.ts
  README.md
```

Minimal acceptable structure: `index.ts`, `<utilityName>.ts`, `meta.ts`, `__tests__/`.

## Naming Conventions

Directory name = main file name = exported function name. Always.

| Prefix   | Use for                                             |
| -------- | --------------------------------------------------- |
| `create` | produces new values/objects — default creation verb |
| `parse`  | converts text/external data to structured values    |
| `to`     | type conversions                                    |
| `is`     | boolean checks, prefer type guards (`value is T`)   |
| `has`    | existence checks                                    |
| `assert` | throws on failure                                   |
| `with`   | function wrappers / behavioral decorators           |

**Never use:** `get` (unless truly a getter), `handle`, `do`, `make`, `build`, `process`.
**Never use:** generic names like `utils`, `helpers`, `common`, `misc`.
**Abbreviations:** only industry-standard ones (UUID, URL, JSON, HTML). No `cfg`, `obj`, `val`, `tmp`.

## Categories

Available `MetaCategory` values: `array`, `async`, `browser`, `crypto`, `error`, `event`, `number`, `object`, `type`,
`validation`.

Adding a new category requires updating `src/_internal/meta.ts`.

## meta.ts

```ts
import type { Meta } from "../../_internal/meta";

export const meta: Meta = {
  id: "utilityName",
  name: "utilityName",
  description: "One sentence describing what it does.",
  category: "error",
  tags: ["tag1", "tag2"],
  demo: false,
  snippets: false,
  since: "1.1.0", // ← see version rule below
};
```

`meta` is not part of the public API — never export it from `index.ts`.

## `since` Version Rule

1. Check current version in `package.json`
2. Increment **minor** version
3. Use that as the `since` value in `meta.ts` and `@since` TSDoc tag

Example: current `1.1.0` → new utility uses `since: "1.2.0"`.

## TSDoc

Required tags on the implementation function (not on overload signatures):

````ts
/**
 * One-line description.
 *
 * @param name - Description.
 * @returns Description of return value.
 * @throws TypeError When input is invalid.
 * @since 1.1.0
 *
 * @example
 * ```ts
 * utilityName(x) // result
 * ```

*/
````

For complex utilities with multiple behaviors, use multi-section docs separated by `---` (see `withTryCatch` as reference).

## index.ts Pattern

```ts
// Only re-exports. No logic, no types that are internal.
export { utilityName } from "./utilityName";
export type { PublicType } from "./types";
```

## Export Chain

```
src/<category>/<utility>/index.ts
  ↓ re-exported by
src/<category>/index.ts
  ↓ re-exported by
src/index.ts
```

All three must be updated when adding a new utility.

## Tests

- Location: `__tests__/<utilityName>.test.ts`
- Test behavior, not implementation details
- Include edge cases and error paths
- Coverage threshold: 80% branches/functions/lines/statements

```ts
import { describe, it, expect } from "vitest";
import { utilityName }          from "../utilityName";

describe("utilityName", () => {
  it("...", () => { ...
  });
});
```

## Internal Helpers (`_internal/`)

Shared cross-utility helpers live in `src/_internal/`. They are excluded from coverage thresholds and never exported
from the package public API.

Use existing asserts from `_internal/asserts/` (e.g. `assertDefined`, `assertFiniteNumber`, `assertInRange`) before
writing new ones.

## README.md

Each utility needs a `README.md`. Standard section order (omit non-applicable):

1. Title (`# utilityName`)
2. Short description
3. Usage (import + basic example)
4. Why this utility exists
5. Signature
6. Parameters / Type Parameters (if any)
7. Return Type
8. Type Declarations (if complex types are exported)
9. Throws / Errors (if applicable)
10. Design Notes
11. When To Use / When Not To Use
12. Summary

Max ~200–300 lines. No marketing language.

## When Modifying Existing Utilities

After any change to a utility's behavior, signature, or supported input types, always update:

1. **`README.md`** — signatures, parameters, Design Notes, When To Use / When Not To Use
2. **`snippets/*.ts`** — examples must reflect current behavior (remove examples of removed features)
3. **`__tests__/*.test.ts`** — remove tests for removed behavior, add tests for new behavior

These are part of the definition of done, not optional.

## What Does NOT Belong in js-core

- UI helpers or DOM manipulation
- Vue/React/framework-specific logic → use `vue-core`
- Utilities duplicating native JS APIs
- Heavy external dependencies
- Highly specific edge-case utilities
