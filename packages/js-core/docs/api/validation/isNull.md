---
title: isNull
category: validation
tags:
  - validation
  - type-guard
  - null
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, null, typescript


# isNull

Checks whether the given value is null.

## Usage

```ts
import { isNull } from "@petr-ptacek/js-core"

// Type checking
console.log(isNull(null));       // true
console.log(isNull(undefined));  // false
console.log(isNull(0));          // false
console.log(isNull(""));         // false

// Type guard usage
const value: unknown = null;

if (isNull(value)) {
  // value is now typed as null
}
```

## Why This Utility Exists

While `typeof value === 'object' && value === null` works, it's verbose. This utility provides a clean, type-guarding way to check for null specifically, distinguishing it from `undefined` and other falsy values.

## Signature

```typescript
function isNull(value: unknown): value is null
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is null. When `true`, TypeScript narrows the type to `null`.

## Design Notes

The implementation uses strict equality comparison (`value === null`), which correctly identifies the null literal without matching `undefined` or other falsy values.

## When To Use

Use `isNull` when you need to:

- distinguish between `null` and `undefined`
- validate that a value is explicitly null
- filter out null values from mixed data
- narrow types in conditional logic

## When Not To Use

Avoid when:

- you want to check for both null and undefined (use `isNullable` instead)
- you only need to check for falsiness (use direct boolean check)
- you need to check for nullish coalescing (use `??` operator)

## Summary

`isNull` provides a precise type guard for the `null` value, useful when you need to distinguish null from undefined and other values.

See also: `isUndefined` (check for undefined), `isNullable` (check for both null and undefined).






