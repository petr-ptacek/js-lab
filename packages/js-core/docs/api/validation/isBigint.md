---
title: isBigint
category: validation
tags:
  - validation
  - type-guard
  - bigint
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, bigint, typescript


# isBigint

Checks whether the given value is a bigint.

## Usage

```ts
import { isBigint } from "@petr-ptacek/js-core"

// Bigints
console.log(isBigint(100n));              // true
console.log(isBigint(BigInt("123")));     // true

// Not bigints
console.log(isBigint(100));               // false (regular number)
console.log(isBigint("100n"));            // false (string)
console.log(isBigint(null));              // false

// Type guard usage
const value: unknown = 999999999999999999n;

if (isBigint(value)) {
  // value is now typed as bigint
  const doubled = value * 2n;
}
```

## Why This Utility Exists

While `typeof value === 'bigint'` works, this utility provides TypeScript type guard functionality that properly narrows the type to `bigint`. It's useful in validation pipelines and generic functions where you need reliable type narrowing for large integers.

## Signature

```typescript
function isBigint(value: unknown): value is bigint
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a bigint. When `true`, TypeScript narrows the type to `bigint`.

## Design Notes

The implementation uses `typeof value === "bigint"` for runtime checking, which correctly identifies bigint values while excluding regular numbers and other types.

Bigints are useful for:
- Arbitrary precision integers
- Large numbers beyond `Number.MAX_SAFE_INTEGER`
- Working with 64-bit integers
- Cryptography and big number calculations

## When To Use

Use `isBigint` when you need to:

- validate that a value is a bigint
- type-narrow unknown values
- filter for bigints in mixed collections
- work with arbitrary precision integers

## When Not To Use

Avoid when:

- you're checking `typeof` directly (use `typeof` if no narrowing needed)
- you need regular numbers (check `isNumber` instead)
- you need to validate bigint value constraints

## Summary

`isBigint` provides a type guard for bigint values, enabling safe type narrowing in TypeScript.

See also: `isPrimitive` (check for any primitive type), `isNumber` (regular numbers).






