# isNumber

Checks whether the given value is a number.

## Usage

```ts
import { isNumber } from "@petr-ptacek/js-core";

// Type checking
console.log(isNumber(42));       // true
console.log(isNumber(3.14));     // true
console.log(isNumber(0));        // true
console.log(isNumber(-5));       // true
console.log(isNumber(NaN));      // true
console.log(isNumber(Infinity)); // true

console.log(isNumber("42"));     // false
console.log(isNumber(null));     // false
console.log(isNumber([]));       // false

// Type guard usage
const value: unknown = 42;

if ( isNumber(value) ) {
  // value is now typed as number
  const squared = value * value;
}
```

## Why This Utility Exists

While JavaScript provides `typeof value === 'number'`, this utility provides TypeScript type guard functionality that properly narrows the type to `number`. It's especially useful in generic functions and validation pipelines where you need reliable type narrowing.

## Signature

```typescript
function isNumber(value: unknown): value is number
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a number. When `true`, TypeScript narrows the type to `number`.

## Design Notes

The function uses `typeof value === "number"` for runtime checking, which correctly identifies:

- regular numbers: `42`, `3.14`, `-5`
- special values: `NaN` (which is technically a number type), `Infinity`
- but excludes: `null`, strings, booleans, and objects

Note: `NaN` is considered a number in JavaScript, despite its name (Not-A-Number). Use `isNaNValue` to specifically check for `NaN`.

## When To Use

Use `isNumber` when you need to:

- validate that a value is numeric
- type-narrow unknown values
- filter arrays containing mixed types
- validate function parameters
- separate numbers from strings or other types

## When Not To Use

Avoid when:

- you need to check if a value is a finite number (use `isFiniteNumber`)
- you specifically need to check for `NaN` (use `isNaNValue`)
- you need to validate that a value is an integer (use `Number.isInteger()` or validation libraries)
- you're checking `typeof` for string comparison (use `typeof` directly if no narrowing needed)

## Summary

`isNumber` provides a type guard for numeric values, enabling safe type narrowing in TypeScript while properly handling edge cases like `NaN` and `Infinity`.

See also: `isFiniteNumber` (finite numbers only), `isNaNValue` (specifically NaN).

