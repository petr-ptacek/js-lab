---
title: isPrimitive
category: validation
tags:
  - validation
  - type-guard
  - primitive
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, primitive, typescript


# isPrimitive

Checks whether the given value is a JavaScript primitive.

## Usage

```ts
import { isPrimitive } from "@petr-ptacek/js-core"

// Type checking
console.log(isPrimitive("text"));     // true
console.log(isPrimitive(42));         // true
console.log(isPrimitive(true));       // true
console.log(isPrimitive(null));       // true
console.log(isPrimitive(undefined));  // true
console.log(isPrimitive(Symbol("id"))); // true
console.log(isPrimitive(100n));       // true

console.log(isPrimitive({}));         // false
console.log(isPrimitive([]));         // false
console.log(isPrimitive(() => {}));   // false

// Type guard usage
const value: unknown = "hello";

if (isPrimitive(value)) {
  // value is now typed as PrimitiveValue
}
```

## Why This Utility Exists

Checking whether a value is a primitive is a fundamental operation in JavaScript. While individual primitive checks exist (`isString`, `isNumber`, etc.), this utility consolidates all primitive type checks into a single function. It's especially useful for filtering, validation, and generic type narrowing where you need to distinguish between primitive and complex types.

## Signature

```typescript
function isPrimitive(value: unknown): value is PrimitiveValue
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a primitive. When `true`, TypeScript narrows the type to `PrimitiveValue`.

## Type Declarations

```typescript
type PrimitiveValue = string | number | boolean | symbol | bigint | null | undefined
```

## Design Notes

This utility checks all seven primitive types in JavaScript:

1. `string` - text values
2. `number` - numeric values (including `NaN` and `Infinity`)
3. `boolean` - `true` or `false`
4. `symbol` - unique symbol values
5. `bigint` - arbitrary precision integers
6. `null` - the null value
7. `undefined` - the undefined value

The implementation delegates to individual type guard functions for consistency and maintainability.

## When To Use

Use `isPrimitive` when you need to:

- validate that a value is primitive before processing
- separate primitive and complex types in mixed data
- implement generic functions that treat primitives differently
- filter arrays or objects by primitive values
- type-narrow values in conditional logic

## When Not To Use

Avoid when:

- you only need to check a specific primitive type (use `isString`, `isNumber`, etc. instead)
- you need to distinguish between specific primitives
- performance is critical for checking many values (use specific type checks)

## Summary

`isPrimitive` provides a convenient type guard for checking whether a value is any of the seven JavaScript primitive types, making it ideal for validation and type narrowing scenarios where primitive vs. complex type distinction is important.






