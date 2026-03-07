# has

Checks whether a nested value exists at a given dot-separated path in an object with full TypeScript type safety.

## Usage

```ts
import { has } from "@petr-ptacek/js-core"

const config = {
  server: {
    host: "localhost",
    port: 3000,
    ssl: false,
    auth: null,
  },
};

has(config, "server.host");
// → true

has(config, "server.ssl");
// → true  (false is a valid value)

has(config, "server.auth");
// → true  (null is a valid value)

has(config, "server.timeout" as any);
// → false
```

## Why This Utility Exists

Optional chaining (`obj?.a?.b`) evaluates the value at each step, which means it cannot distinguish between "key does
not exist" and "key exists with value `undefined`". This utility checks own-property existence at every segment of the
path, mirroring the behaviour of `lodash/has`.

## Signature

```ts
function has<T extends object, P extends Path<T>>(
  obj: T,
  path: P,
): boolean
```

## Parameters

- `obj` (`T extends object`): The object to check.
- `path` (`P extends Path<T>`): The dot-separated path string.

## Type Parameters

- `<T extends object>`: The type of the input object.
- `<P extends Path<T>>`: The valid path type derived from the object structure.

## Return Type

Returns `true` if every key in the path exists as an **own property** on the intermediate object. Returns `false` if any
key is missing.

## Key Existence Behaviour

| Situation                         | `has` returns |
|-----------------------------------|---------------|
| Key present, value `"hello"`      | `true`        |
| Key present, value `0`            | `true`        |
| Key present, value `false`        | `true`        |
| Key present, value `""`           | `true`        |
| Key present, value `null`         | `true`        |
| Key present, value `undefined`    | `true`        |
| Key **not present** on the object | `false`       |
| Intermediate key missing          | `false`       |

## Design Notes

The utility uses the same `Path<T>` type as `get`, ensuring consistent compile-time path validation across both
utilities. Each path segment is checked with `Object.hasOwn`, which tests whether the key physically exists on the
object — regardless of what value is stored at that key. This mirrors the behaviour of `lodash/has` and is distinct from
`get`, which reads the value and returns `undefined` for missing paths.

## When To Use

Use `has` when you need to:

- verify a path exists before acting on its value
- distinguish between "key missing" and "key set to a falsy value"
- implement conditional logic based on object structure
- validate configuration or data shapes at runtime

## When Not To Use

Avoid when:

- you also need the value — use `get` instead
- the path is dynamic and unknown at compile time
- shallow access where `key in obj` is sufficient

## Summary

`has` provides a type-safe way to check whether a path exists in a nested object, correctly handling falsy values and
ensuring only `undefined` is treated as missing.

