---
title: isNullable
category: validation
tags:
  - validation
  - type-guard
  - null
  - undefined
  - nullable
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, null, undefined, nullable, typescript


# isNullable

Checks whether the given value is null or undefined.

## Usage

```ts
import { isNullable } from "@petr-ptacek/js-core";

// Type checking
console.log(isNullable(null));       // true
console.log(isNullable(undefined));  // true
console.log(isNullable(0));          // false
console.log(isNullable(""));         // false

// Type guard usage
const value: unknown = null;

if ( isNullable(value) ) {
  // value is now typed as null | undefined
}
```

## Why This Utility Exists

The concept of "nullable" or "nullish" values (both `null` and `undefined`) is very common in TypeScript. This utility provides a convenient type guard for checking both simultaneously, much like the nullish coalescing operator (`??`) handles both values at runtime.

## Signature

```typescript
function isNullable(value: unknown): value is null | undefined
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is either `null` or `undefined`. When `true`, TypeScript narrows the type to `null | undefined`.

## Design Notes

The implementation checks for both null and undefined using strict equality comparisons. This is equivalent to checking with the nullish coalescing operator but as a runtime type guard.

## When To Use

Use `isNullable` when you need to:

- check if a value is either null or undefined
- validate optional API responses
- filter out nullish values
- narrow types to exclude nullish values (via negation)
- handle missing/absent values uniformly

## When Not To Use

Avoid when:

- you need to distinguish between `null` and `undefined` (use `isNull` and `isUndefined` separately)
- you're just checking for truthiness (use boolean check)
- you're using nullish coalescing in expressions (use `??` operator instead)

## Summary

`isNullable` provides a type guard for checking both `null` and `undefined` simultaneously, useful for validating optional or missing values.

See also: `isNull` (check for null only), `isUndefined` (check for undefined only).






