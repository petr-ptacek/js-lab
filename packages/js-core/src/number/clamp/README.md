# clamp

Constrains a numeric value between specified minimum and maximum boundaries.

## Usage

```ts
import { clamp } from "@petr-ptacek/js-core"

const result = clamp(15, 0, 10);
console.log(result); // 10

const inRange = clamp(5, 0, 10);
console.log(inRange); // 5

const belowMin = clamp(-5, 0, 10);
console.log(belowMin); // 0
```

## Why This Utility Exists

JavaScript lacks a built-in clamp function for constraining values within bounds. Common manual implementations require multiple Math.min/Math.max calls or verbose conditional logic. This utility provides a clean, validated solution with proper error handling for invalid ranges.

## Signature

```ts
function clamp(value: number, min: number, max: number): number
```

## Parameters

- `value` (`number`): The numeric value to constrain.
- `min` (`number`): The minimum boundary (inclusive).
- `max` (`number`): The maximum boundary (inclusive).

## Return Type

Returns the input value constrained to the range `[min, max]`. If the value is below `min`, returns `min`. If the value is above `max`, returns `max`. Otherwise returns the original value unchanged.

## Throws

- Throws `Error` when `min` is greater than `max`.

## Design Notes

The implementation uses `Math.min(Math.max(value, min), max)` for optimal performance. The function validates that `min <= max` to prevent logical errors and throws immediately for invalid ranges.

The bounds are inclusive, meaning both `min` and `max` values are considered valid results.

## When To Use

Use `clamp` when you need to:

- constrain user input within valid ranges
- limit calculated values to acceptable bounds  
- implement slider controls or progress bars
- ensure values stay within domain-specific limits

## When Not To Use

Avoid when:

- working with non-numeric values (use custom validation instead)
- you need exclusive bounds (min/max values should not be valid)
- complex validation logic beyond simple range checking is required
- performance is critical and you can guarantee valid inputs

## Summary

`clamp` provides a safe and efficient way to constrain numeric values within specified boundaries with proper validation and error handling.
