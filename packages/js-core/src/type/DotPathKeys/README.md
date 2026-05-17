# DotPathKeys

Generates a union of all valid dot-separated key paths for a plain object type.

## Usage

```ts
import type { DotPathKeys } from "@petr-ptacek/js-core";

type Config = {
  host: string;
  db: {
    port: number;
    name: string;
  };
};

type Paths = DotPathKeys<Config>;
// "host" | "db" | "db.port" | "db.name"
```

## Why This Utility Exists

When working with utilities like `get` or `has` that accept dot-separated paths, you need a way to type function
parameters so only valid paths are accepted. `DotPathKeys<T>` generates that union at compile time, enabling
autocomplete and catching invalid paths as type errors.

## Signature

```ts
type DotPathKeys<T> = ...
```

## Type Parameters

- `<T>`: The plain object type to generate paths for. Non-plain-object types (arrays, `Date`, `Map`, etc.) resolve to `never`.

## Return Type

A union of string literal types representing all valid dot-separated paths in `T`. Returns `never` if `T` is not a
plain object.

## Design Notes

Only plain objects are traversed. The following types are treated as leaves and not recursed into:

- Arrays (`readonly any[]`)
- Functions
- `Date`, `RegExp`, `Error`
- `Map`, `Set`, `WeakMap`, `WeakSet`
- `Promise`

Optional fields are handled via `NonNullable` — paths through `T[K] | undefined` resolve correctly to paths of `T[K]`.

The type does not impose a recursion depth limit. TypeScript's own recursion limit applies. For objects with extreme
nesting depth or mutually recursive types, this may cause slowdowns or errors — those cases are outside the intended
use.

## When To Use

Use `DotPathKeys<T>` when you need to:

- constrain a function parameter to valid dot-notation paths of an object type
- generate autocomplete for path strings in your own utilities
- derive a type-safe union of paths from a known object shape

```ts
function pick<T extends object, P extends DotPathKeys<T>>(obj: T, path: P) { ... }
```

## When Not To Use

Avoid when:

- `T` contains arrays you need to index into — array elements are not traversed
- paths are fully dynamic and unknown at compile time — use `string` instead
- `T` is a union type with varying shapes — results may be wider than expected

## Summary

`DotPathKeys<T>` produces a compile-time union of all valid dot-separated paths for a plain object type, enabling
type-safe path parameters in generic functions.
