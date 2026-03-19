---
title: isDate
category: validation
tags:
  - validation
  - type-guard
  - date
  - instance
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, date, instance, typescript


# isDate

Checks whether the given value is a Date instance.

## Usage

```ts
import { isDate } from "@petr-ptacek/js-core"

// Valid dates
console.log(isDate(new Date()));              // true
console.log(isDate(new Date("invalid")));    // true (still a Date instance)

// Not dates
console.log(isDate("2024-01-01"));           // false
console.log(isDate(1704067200000));          // false (timestamp, not Date)
console.log(isDate(null));                   // false

// Type guard usage
const value: unknown = new Date();

if (isDate(value)) {
  // value is now typed as Date
  const time = value.getTime();
}
```

## Why This Utility Exists

While `instanceof Date` works, this utility provides TypeScript type guard functionality that properly narrows the type to `Date`. It's essential for distinguishing Date instances from timestamps (numbers) or date strings.

## Signature

```typescript
function isDate(value: unknown): value is Date
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a `Date` instance. When `true`, TypeScript narrows the type to `Date`.

## Design Notes

The implementation uses `instanceof Date` for runtime checking, which correctly identifies:

- `Date` instances created via `new Date()`
- Invalid dates like `new Date("invalid")` (still instances, just with NaN internal time)

It excludes:
- Date strings ("2024-01-01")
- Timestamps (numbers)
- `null` and `undefined`

Note: This function does **not** verify date validity. Use `isValidDate` to ensure the date value is valid (not NaN).

## When To Use

Use `isDate` when you need to:

- check if a value is a `Date` instance (regardless of validity)
- type-narrow unknown values to Date
- distinguish Date objects from timestamps
- filter for Date instances in mixed collections

## When Not To Use

Avoid when:

- you specifically need a valid date (use `isValidDate` instead)
- you only need to check for date-like values (timestamps or strings)
- you're checking `instanceof` directly (use `instanceof` if no narrowing needed)

## Summary

`isDate` provides a type guard for `Date` instances, enabling safe type narrowing in TypeScript without verifying date validity.

See also: `isValidDate` (valid dates only, excluding NaN).






