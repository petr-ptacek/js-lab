# isFiniteNumber

Checks whether the given value is a finite number.

## Usage

```ts
import { isFiniteNumber } from "@petr-ptacek/js-core"

// Finite numbers
console.log(isFiniteNumber(42));              // true
console.log(isFiniteNumber(3.14));            // true
console.log(isFiniteNumber(0));               // true
console.log(isFiniteNumber(-100));            // true

// Not finite
console.log(isFiniteNumber(NaN));             // false
console.log(isFiniteNumber(Infinity));        // false
console.log(isFiniteNumber(-Infinity));       // false
console.log(isFiniteNumber("42"));            // false

// Type guard usage
const value: unknown = 42;

if ( isFiniteNumber(value) ) {
  // value is now typed as number
  const doubled = value * 2;
}
```

## Why This Utility Exists

While `Number.isFinite()` works, this utility provides TypeScript type guard functionality that properly narrows the
type to `number`. It specifically excludes `NaN`, `Infinity`, and `-Infinity` - the non-finite numeric values.

## Signature

```typescript
function isFiniteNumber(value: unknown): value is number
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a finite number. When `true`, TypeScript narrows the type to `number`.

## Design Notes

The implementation uses `Number.isFinite()`, which checks that:

1. The value is of type `number`
2. The value is not `NaN`
3. The value is not `Infinity` or `-Infinity`

This is the strictest numeric check, ensuring only "usable" numbers.

## When To Use

Use `isFiniteNumber` when you need to:

- validate that a value is a usable number
- exclude NaN and Infinity from calculations
- ensure numbers are suitable for arithmetic
- type-narrow to finite numbers specifically

## When Not To Use

Avoid when:

- you allow Infinity values (use `isNumber` instead)
- you allow NaN values (use `isNumber` instead)
- you're using `Number.isFinite()` directly (use it if no narrowing needed)

## Summary

`isFiniteNumber` provides a type guard for finite numbers, excluding NaN, Infinity, and -Infinity, and enabling safe
type narrowing in TypeScript.

See also: `isNumber` (any number including NaN/Infinity), `isNaNValue` (specifically NaN).

