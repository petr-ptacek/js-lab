# DotPathValue

Resolves the type of the value at a given dot-separated path in a plain object type.

## Usage

```ts
import type { DotPathKeys, DotPathValue } from "@petr-ptacek/js-core";

type Config = {
  host: string;
  db: {
    port: number;
    name: string;
  };
};

type A = DotPathValue<Config, "host">; // string
type B = DotPathValue<Config, "db.port">; // number
type C = DotPathValue<Config, "db">; // { port: number; name: string }
```

## Why This Utility Exists

When building generic functions that accept dot-separated paths, you need to infer the return type based on the path
provided. `DotPathValue<T, P>` resolves that type at compile time, enabling fully typed return values without manual
type assertions.

## Signature

```ts
type DotPathValue<T, P extends DotPathKeys<T> | (string & {})> = ...
```

## Type Parameters

- `<T>`: The plain object type to resolve the value from.
- `<P extends DotPathKeys<T> | (string & {})>`: The dot-separated path. Accepts `DotPathKeys<T>` for full type safety,
  or `string & {}` for runtime-generated paths while still providing autocomplete for known paths.

## Return Type

The type of the value at path `P` in `T`. Returns `never` if the path does not correspond to a valid key sequence in `T`.

## Design Notes

The `string & {}` union in the `P` constraint is intentional. A plain `string` would widen the type parameter and
suppress autocomplete, while `string & {}` preserves autocomplete for `DotPathKeys<T>` values while still accepting
arbitrary strings.

Optional fields are unwrapped via `NonNullable` during traversal — the resolved type reflects the actual value type
rather than `T[K] | undefined`.

`DotPathValue` is designed to be used together with `DotPathKeys`:

```ts
function get<T extends object, P extends DotPathKeys<T>>(
  obj: T,
  path: P
): DotPathValue<T, P> | undefined { ... }
```

## When To Use

Use `DotPathValue<T, P>` when you need to:

- infer the return type of a function that reads a value at a dot-separated path
- derive the type of a nested field without manual property access chains

## When Not To Use

Avoid when:

- `T` contains arrays you need to index into — array elements are not traversed
- the path is not statically known — the resolved type will be `never` or imprecise

## Summary

`DotPathValue<T, P>` resolves the compile-time type of the value at a dot-separated path in a plain object type,
enabling precise return type inference in generic path-based utilities.
