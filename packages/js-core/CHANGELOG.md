# @petr-ptacek/js-core

## 2.0.0

### Major Changes

- 3218517: Add `DotPathKeys` and `DotPathValue` types, restrict `get` and `has` to plain objects.

  **New exports:**
  - `DotPathKeys<T>` — generates a union of all valid dot-separated key paths for a plain object type
  - `DotPathValue<T, P>` — resolves the type of the value at a given dot-separated path
  - `has` — checks whether a dot-separated path exists in a plain object

  **Breaking changes:**
  - `get` and `has` no longer traverse arrays, `Date`, `Map`, `Set`, or other non-plain-object values — they are treated as leaves. Paths going through these types return `undefined`/`false` at runtime and are not accepted by the type system.
  - Internal `Path` and `PathValue` types (from `object/get`) are removed and replaced by the public `DotPathKeys` and `DotPathValue`.

### Patch Changes

- 9d6e070: Migrate build tooling from Vite to tsdown (powered by rolldown). No changes to public API or output format.

## 1.1.0

### Minor Changes

- add isAbortError utility
- bc92a39: Simplify abortable execution handling

## 1.0.2

### Patch Changes

- Fix documentation deployment workflow

## 1.0.1

### Patch Changes

- Add meta info to withRunId to generate DOCS

## 1.0.0

### Major Changes

- Initial public release

### Minor Changes

- ab3e870: with-run-id: implementation
- 350b394: Add isEmptyString utility.

### Patch Changes

- c139b7c: with-run-id: improve documentation
- 589c241: with-abortable: Fix race condition bug
- 3e5fff3: with-abortable: rename abort to cancel for consistency in API documentation

## 0.2.1

### Patch Changes

- 51bcd67: Update js-core readme, add links to docs page.

## 0.2.0

### Minor Changes

- ba49164: Added withAbortable utility function for managing abortable operations, e.g. api calls.

## 0.1.0

### Minor Changes

- 700f9ef: Add createUUIDV4 utility for generating UUID v4 strings

## 0.0.1

### Patch Changes

- 19b0db3: Initial release
