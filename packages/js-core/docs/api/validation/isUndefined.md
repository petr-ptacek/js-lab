---
title: isUndefined
category: validation
tags:
  - validation
  - type-guard
  - undefined
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, undefined, typescript


# isUndefined

Checks whether the given value is undefined.

## Usage

```ts
import { isUndefined } from "@petr-ptacek/js-core"

// Type checking
console.log(isUndefined(undefined)); // true
console.log(isUndefined(null));      // false
console.log(isUndefined(0));         // false
console.log(isUndefined(""));        // false

// Type guard usage
const value: unknown = undefined;

if (isUndefined(value)) {
  // value is now typed as undefined
}
```

## Why This Utility Exists

While `typeof value === 'undefined'` works, this utility provides TypeScript type guard functionality that properly narrows the type to `undefined`. It's useful in validation pipelines and generic functions where you need reliable type narrowing.

## Signature

```typescript
function isUndefined(value: unknown): value is undefined
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is undefined. When `true`, TypeScript narrows the type to `undefined`.

## Design Notes

The implementation uses `typeof value === "undefined"` for runtime checking, which correctly identifies the `undefined` value while excluding `null` and other falsy values.

## When To Use

Use `isUndefined` when you need to:

- distinguish between `undefined` and `null`
- validate that a value is explicitly undefined
- filter out undefined values
- narrow types in conditional logic

## When Not To Use

Avoid when:

- you want to check for both null and undefined (use `isNullable` instead)
- you only need to check for falsiness (use direct boolean check)
- you need to check for missing properties (use `in` operator or optional chaining)

## Summary

`isUndefined` provides a precise type guard for the `undefined` value, useful when you need to distinguish undefined from null and other values.

See also: `isNull` (check for null), `isNullable` (check for both null and undefined).






