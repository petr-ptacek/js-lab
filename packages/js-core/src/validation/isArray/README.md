# isArray

Checks whether the given value is an array.

## Usage

```ts
import { isArray } from "@petr-ptacek/js-core"

// Basic type checking
console.log(isArray([1, 2, 3])) // true
console.log(isArray("text"))    // false
console.log(isArray({}))        // false
console.log(isArray(null))      // false

// Type guard usage
const value: unknown = ["a", "b", "c"]

if (isArray<string>(value)) {
  // value is now typed as string[]
  const uppercased = value.map(v => v.toUpperCase())
  console.log(uppercased) // ["A", "B", "C"]
}
```

## Why This Utility Exists

While JavaScript provides `Array.isArray()`, this utility adds TypeScript type guard functionality with generic type parameter support. It enables safe type narrowing in TypeScript while providing the same runtime behavior as the native method, making it ideal for type-safe validation in generic functions and mixed-type scenarios.

## Signature

```ts
function isArray<T = unknown>(value: unknown): value is T[]
```

## Parameters

- `value` (`unknown`): The value to test for array type.

## Type Parameters

- `<T>`: The expected type of array elements (defaults to `unknown`).

## Return Type

Returns a boolean indicating whether the value is an array. When `true`, TypeScript narrows the type to `T[]`.

## Design Notes

This utility is a thin wrapper around `Array.isArray()` with TypeScript type guard enhancement:

1. **Runtime behavior**: Identical to native `Array.isArray()`
2. **Type safety**: Provides type narrowing with configurable element type
3. **Generic support**: Allows specifying expected element type for better type inference
4. **Zero overhead**: Compiles to direct `Array.isArray()` call

The generic type parameter enables more precise type narrowing when you know the expected element type.

## When To Use

Use `isArray<T>` when you need:

- type-safe array validation in TypeScript
- generic functions that work with arrays of specific types
- runtime type checking with compile-time type narrowing
- validation in APIs that accept mixed types
- type guards in discriminated union handling

## When Not To Use

Avoid when:

- you only need runtime checking without TypeScript benefits (use `Array.isArray()`)
- working with known types that don't require validation
- performance is critical and type checking is unnecessary
- you need to validate array contents, not just array type

## Summary

`isArray<T>` provides type-safe array validation with TypeScript type guard functionality, enabling runtime type checking with compile-time type narrowing for safer array operations in generic and mixed-type scenarios.
