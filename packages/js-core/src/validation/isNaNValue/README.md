# isNaNValue

Checks whether the given value is NaN (Not-a-Number).

## Usage

```ts
import { isNaNValue } from "@petr-ptacek/js-core"

// NaN values
console.log(isNaNValue(NaN));              // true
console.log(isNaNValue(0 / 0));            // true

// Not NaN
console.log(isNaNValue("NaN"));            // false (string)
console.log(isNaNValue(undefined));        // false
console.log(isNaNValue(Infinity));         // false
console.log(isNaNValue(42));               // false

// Type guard usage
const value: unknown = NaN;

if (isNaNValue(value)) {
  // value is now typed as number (NaN)
  const isNum = Number.isNaN(value);
}
```

## Why This Utility Exists

`NaN` is a special numeric value in JavaScript where `NaN === NaN` returns `false`. The standard `Number.isNaN()` works, but this utility provides TypeScript type guard functionality that properly narrows the type to `number` while specifically checking for NaN. It's also more aligned with the utility naming conventions of the library.

## Signature

```typescript
function isNaNValue(value: unknown): value is number
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is NaN. When `true`, TypeScript narrows the type to `number`.

## Design Notes

The implementation uses both:
1. `typeof value === "number"` - ensures the value is numeric type
2. `Number.isNaN(value)` - checks specifically for NaN

This dual-check is necessary because:
- `NaN` is a special numeric value
- `Number.isNaN()` is safer than global `isNaN()` (which has coercion issues)
- Type narrowing requires `typeof "number"` check

## When To Use

Use `isNaNValue` when you need to:

- detect NaN values specifically
- type-narrow unknown values to NaN
- check for invalid numeric operations
- validate calculation results

## When Not To Use

Avoid when:

- you want to check for any "not a number" value (use different logic)
- you need to distinguish NaN from Infinity
- you only need `Number.isNaN()` (use it directly if no narrowing)

## Summary

`isNaNValue` provides a type guard for NaN values, enabling safe type narrowing in TypeScript while avoiding the pitfalls of global `isNaN()`.

See also: `isNumber` (any number including NaN), `isFiniteNumber` (finite numbers only).

