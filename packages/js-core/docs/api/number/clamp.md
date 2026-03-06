---
title: clamp
category: number
tags:
  - number
  - clamp
  - constrain
  - bounds
  - range
  - limit
since: 1.0.0
---


> **Category:** number
> **Since:** 1.0.0
> **Tags:** number, clamp, constrain, bounds, range, limit


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


## Snippets

### basic.ts

```ts
import { clamp } from "@petr-ptacek/js-core";

// Basic clamping examples
console.log("=== Basic Clamping ===");

// Value within range - unchanged
const withinRange = clamp(5, 0, 10);
console.log(`clamp(5, 0, 10) = ${withinRange}`); // 5

// Value above maximum - clamped to max
const aboveMax = clamp(15, 0, 10);
console.log(`clamp(15, 0, 10) = ${aboveMax}`); // 10

// Value below minimum - clamped to min
const belowMin = clamp(-3, 0, 10);
console.log(`clamp(-3, 0, 10) = ${belowMin}`); // 0

// Edge cases - boundary values
const exactMin = clamp(0, 0, 10);
console.log(`clamp(0, 0, 10) = ${exactMin}`); // 0

const exactMax = clamp(10, 0, 10);
console.log(`clamp(10, 0, 10) = ${exactMax}`); // 10

```

### error-handling.ts

```ts
import { clamp } from "@petr-ptacek/js-core";

// Error handling examples
console.log("=== Error Handling ===");

// Valid usage
try {
  const result = clamp(50, 0, 100);
  console.log(`✓ Valid range: clamp(50, 0, 100) = ${result}`);
} catch (error) {
  console.error(`✗ Error: ${error instanceof Error ? error.message : String(error)}`);
}

// Invalid range - min > max
try {
  const result = clamp(50, 100, 0);  // Invalid: min(100) > max(0)
  console.log(`Result: ${result}`);
} catch (error) {
  console.error(`✗ Invalid range: ${error instanceof Error ? error.message : String(error)}`);
}

// Safe clamp wrapper with validation
function safeClamp(value: number, min: number, max: number): number | null {
  try {
    return clamp(value, min, max);
  } catch (_error) {
    console.warn(`Invalid clamp parameters: min=${min}, max=${max}`);
    return null;
  }
}

console.log("\n=== Safe Wrapper ===");

// Valid usage
const validResult = safeClamp(75, 0, 100);
console.log(`Safe clamp result: ${validResult}`); // 75

// Invalid usage - handled gracefully
const invalidResult = safeClamp(75, 200, 100);
console.log(`Safe clamp result: ${invalidResult}`); // null

// Auto-correcting clamp (swaps min/max if needed)
function autoClamp(value: number, bound1: number, bound2: number): number {
  const min = Math.min(bound1, bound2);
  const max = Math.max(bound1, bound2);

  return clamp(value, min, max);
}

console.log("\n=== Auto-correcting Clamp ===");

// Works regardless of parameter order
const result1 = autoClamp(50, 0, 100);    // Normal order
const result2 = autoClamp(50, 100, 0);    // Swapped order - auto-corrected

console.log(`autoClamp(50, 0, 100) = ${result1}`);   // 50
console.log(`autoClamp(50, 100, 0) = ${result2}`);   // 50

```

### practical-usage.ts

```ts
import { clamp } from "@petr-ptacek/js-core";

// User input validation
function processUserInput(userValue: string) {
  const numericValue = parseFloat(userValue);

  // Clamp to valid percentage range
  const percentage = clamp(numericValue, 0, 100);
  console.log(`User input "${userValue}" -> ${percentage}%`);

  return percentage;
}

console.log("=== User Input Validation ===");
processUserInput("50");   // 50%
processUserInput("150");  // 100%
processUserInput("-20");  // 0%

// Slider/Progress bar implementation
class Slider {
  private _value: number = 0;
  private min: number;
  private max: number;

  constructor(min: number = 0, max: number = 100) {
    this.min = min;
    this.max = max;
  }

  setValue(value: number): void {
    this._value = clamp(value, this.min, this.max);
  }

  getValue(): number {
    return this._value;
  }

  getPercentage(): number {
    const range = this.max - this.min;
    return ((this._value - this.min) / range) * 100;
  }
}

console.log("\n=== Slider Control ===");
const slider = new Slider(0, 255);  // RGB color slider

slider.setValue(128);
console.log(`Value: ${slider.getValue()}, Percentage: ${slider.getPercentage().toFixed(1)}%`);

slider.setValue(300);  // Clamped to 255
console.log(`Value: ${slider.getValue()}, Percentage: ${slider.getPercentage().toFixed(1)}%`);

slider.setValue(-50);  // Clamped to 0
console.log(`Value: ${slider.getValue()}, Percentage: ${slider.getPercentage().toFixed(1)}%`);

// Game physics - velocity limiting
function updatePlayerVelocity(currentVelocity: number, acceleration: number) {
  const MAX_SPEED = 10;
  const MIN_SPEED = -10;

  const newVelocity = currentVelocity + acceleration;
  return clamp(newVelocity, MIN_SPEED, MAX_SPEED);
}

console.log("\n=== Game Physics ===");
let velocity = 0;

velocity = updatePlayerVelocity(velocity, 5);   // 5
velocity = updatePlayerVelocity(velocity, 8);   // 10 (clamped)
velocity = updatePlayerVelocity(velocity, -25); // -10 (clamped)

console.log(`Final velocity: ${velocity}`);

```




