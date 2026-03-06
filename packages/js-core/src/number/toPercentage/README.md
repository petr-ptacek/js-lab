# toPercentage

Converts a numeric value to a percentage relative to a given base.

## Usage

```ts
import { toPercentage } from "@petr-ptacek/js-core"

const percentage = toPercentage(25, 100)
console.log(percentage) // 25

const result = toPercentage(3, 4)
console.log(result) // 75
```

## Why This Utility Exists

Converting values to percentages is a common operation in data visualization, progress indicators, and statistical calculations. While the math is simple `(value / base) * 100`, this utility provides a consistent, well-tested function with proper error handling for edge cases like division by zero.

## Signature

```ts
function toPercentage(value: number, base: number): number
```

## Parameters

- `value` (`number`): The value to convert into a percentage.
- `base` (`number`): The base value representing 100%. Must not be 0.

## Return Type

Returns a `number` representing the calculated percentage value.

## Throws

- Throws `Error` when `base` is 0 (division by zero).

## Design Notes

The function performs a simple mathematical calculation `(value / base) * 100` with validation to prevent division by zero. The implementation prioritizes:

1. **Input validation**: Checks for zero base to prevent `Infinity` results
2. **Clear error messages**: Provides descriptive error when invalid input is detected
3. **Simplicity**: Direct calculation without unnecessary complexity

The function does not perform rounding - if precise decimal control is needed, combine with rounding utilities.

## When To Use

Use `toPercentage` when you need:

- progress calculations (completed/total tasks)
- data visualization percentages
- statistical percentage calculations
- consistent percentage conversion with error handling

## When Not To Use

Avoid when:

- you need percentage with specific decimal places (use with rounding utilities)
- working with already calculated percentages
- base value can legitimately be zero (handle division by zero differently)
- you need percentage as a formatted string (use formatting utilities)

## Summary

`toPercentage` provides a simple, safe way to convert numeric values to percentages with proper error handling for division by zero cases.
