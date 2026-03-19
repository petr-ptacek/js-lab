# get

Safely gets a nested value from an object using a dot-separated path with full TypeScript type safety.

## Usage

```ts
import { get } from "@petr-ptacek/js-core"

const user = {
  profile: {
    name: "John",
    contacts: {
      email: "john@example.com"
    }
  }
};

const name = get(user, "profile.name");
console.log(name); // "John"
```

## Why This Utility Exists

Direct property access can throw runtime errors when intermediate properties are null or undefined. Optional chaining lacks type safety for deep paths and always returns potentially `any` types. This utility provides safe access with compile-time path validation and full type inference.

## Signature

```ts
// Without default value
function get<T extends object, P extends Path<T>>(
  obj: T,
  path: P,
): PathValue<T, P> | undefined

// With default value
function get<T extends object, P extends Path<T>, D>(
  obj: T,
  path: P,
  defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D
```

## Parameters

- `obj` (`T extends object`): The object to access.
- `path` (`P extends Path<T>`): The dot-separated path string.
- `defaultValue` (`D`, optional): Value to return if the path resolves to `undefined`.

## Type Parameters

- `<T extends object>`: The type of the input object.
- `<P extends Path<T>>`: The valid path type derived from the object structure.
- `<D>`: The type of the default value (when provided).

## Return Type

Returns the value at the specified path, or `undefined` if the path doesn't exist. When a default value is provided, returns the default value instead of `undefined` for missing paths. The return type is automatically inferred based on the path and object structure.

## Design Notes

The utility uses TypeScript's template literal types to validate paths at compile time. Only valid paths that exist in the object structure are accepted. The path traversal uses dot notation exclusively and supports array access via numeric indices.

The implementation uses `reduce()` for path traversal with graceful handling of missing properties.

## When To Use

Use `get` when you need:

- safe deep property access without runtime errors
- type-safe path strings validated at compile time
- fallback values for missing properties
- array element access via dot notation

## When Not To Use

Avoid when:

- shallow access where optional chaining (`obj?.prop`) is sufficient
- dynamic paths that cannot be known at compile time
- performance critical code where direct access is faster
- complex path syntax beyond simple dot notation

## Summary

`get` provides safe and type-safe access to nested object properties with compile-time path validation and graceful error handling.
