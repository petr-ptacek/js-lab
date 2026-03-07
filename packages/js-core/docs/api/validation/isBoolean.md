---
title: isBoolean
category: validation
tags:
  - validation
  - type-guard
  - boolean
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, boolean, typescript


# isBoolean

Checks whether the given value is a boolean.

## Usage

```ts
import { isBoolean } from "@petr-ptacek/js-core"

// Type checking
console.log(isBoolean(true));        // true
console.log(isBoolean(false));       // true
console.log(isBoolean(1));           // false
console.log(isBoolean("true"));      // false
console.log(isBoolean(null));        // false

// Type guard usage
const value: unknown = true;

if (isBoolean(value)) {
  // value is now typed as boolean
  const inverted = !value;
}
```

## Why This Utility Exists

While `typeof value === 'boolean'` works, this utility provides TypeScript type guard functionality that properly narrows the type to `boolean`. It's useful for validation, filtering, and type-safe generic functions.

## Signature

```typescript
function isBoolean(value: unknown): value is boolean
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a boolean. When `true`, TypeScript narrows the type to `boolean`.

## Design Notes

The implementation uses `typeof value === "boolean"` for runtime checking, which correctly identifies both `true` and `false` while excluding truthy and falsy values of other types.

## When To Use

Use `isBoolean` when you need to:

- validate that a value is a boolean
- type-narrow unknown values
- filter for boolean values specifically
- separate booleans from truthy/falsy values

## When Not To Use

Avoid when:

- you're checking truthiness (use `!!value` instead)
- you need to allow both booleans and truthy values
- you're using `typeof` for string comparison (use `typeof` directly if no narrowing needed)

## Summary

`isBoolean` provides a type guard for boolean values, enabling safe type narrowing in TypeScript.

See also: `isPrimitive` (check for any primitive type).






