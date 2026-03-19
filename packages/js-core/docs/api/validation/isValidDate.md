---
title: isValidDate
category: validation
tags:
  - validation
  - type-guard
  - date
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, date, typescript


# isValidDate

Checks whether the given value is a valid Date instance.

## Usage

```ts
import { isValidDate } from "@petr-ptacek/js-core"

// Valid dates
console.log(isValidDate(new Date()));              // true
console.log(isValidDate(new Date("2024-01-01"))); // true

// Invalid dates
console.log(isValidDate(new Date("invalid")));    // false
console.log(isValidDate("2024-01-01"));           // false
console.log(isValidDate(null));                   // false

// Type guard usage
const value: unknown = new Date();

if (isValidDate(value)) {
  // value is now typed as Date
  const iso = value.toISOString();
}
```

## Why This Utility Exists

While `isDate` checks if a value is a `Date` instance, it doesn't verify that the date is valid. In JavaScript, invalid dates like `new Date("invalid")` are still `Date` instances but have `NaN` as their internal time value. This utility provides a complete type guard that ensures both instance type and value validity.

## Signature

```typescript
function isValidDate(value: unknown): value is Date
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a valid `Date` instance. When `true`, TypeScript narrows the type to `Date`.

## Design Notes

A date is considered valid when:

1. It is a `Date` instance (checked via `isDate`)
2. Its internal time value is not `NaN` (checked via `isNaNValue`)

The implementation delegates to `isDate` and `isNaNValue` for consistency:

```typescript
return isDate(value) && !isNaNValue(value.getTime());
```

This ensures that invalid dates (with `NaN` time) are properly rejected.

## When To Use

Use `isValidDate` when you need to:

- validate that a date is valid before using it
- parse user input that might be an invalid date
- filter arrays containing date-like values
- ensure date values in data structures are valid

## When Not To Use

Avoid when:

- you only need to check if something is a `Date` instance (use `isDate` instead)
- you need to validate date format (the value is already a `Date` object)
- you need specific date constraints (use custom validation logic)

## Summary

`isValidDate` provides a type guard for valid `Date` instances, ensuring both instance type and value validity by checking that the internal time value is not `NaN`.

See also: `isDate` (any Date instance, including invalid), `isNaNValue` (check for NaN specifically).






