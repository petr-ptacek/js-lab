# scaleByAspectRatio

Scales dimensions while preserving aspect ratio to a target width or height.

## Usage

```ts
import { scaleByAspectRatio } from "@petr-ptacek/js-core"

// scale to specific width
const scaled = scaleByAspectRatio(
  { width: 400, height: 300 },
  { width: 200 }
)
console.log(scaled) // { width: 200, height: 150 }

// scale to specific height
const scaledHeight = scaleByAspectRatio(
  { width: 800, height: 600 },
  { height: 300 }
)
console.log(scaledHeight) // { width: 400, height: 300 }
```

## Why This Utility Exists

When working with images, videos, or responsive layouts, maintaining aspect ratios is crucial to prevent distortion. While the math is straightforward, this utility provides a type-safe, well-tested implementation with proper validation and customizable rounding behavior for consistent results across different scaling scenarios.

## Signature

```ts
function scaleByAspectRatio(
  dimensions: Dimensions, 
  target: { width: number }, 
  round?: RoundValueFn
): Dimensions

function scaleByAspectRatio(
  dimensions: Dimensions, 
  target: { height: number }, 
  round?: RoundValueFn
): Dimensions
```

## Parameters

- `dimensions` (`Dimensions`): Original dimensions with `width` and `height` properties. Both must be positive finite numbers.
- `target` (`DimensionsTarget`): Target dimension object containing either `width` or `height` (exactly one must be provided).
- `round` (`RoundValueFn`, optional): Function to round the calculated dimension. Defaults to `Math.round`.

## Type Parameters

The utility uses these type definitions:

- `Dimensions`: Object with `width` and `height` number properties
- `DimensionsTarget`: Union type allowing either `{ width: number }` or `{ height: number }`
- `RoundValueFn`: Function type `(value: number) => number` for rounding behavior

## Return Type

Returns a `Dimensions` object with both `width` and `height` properties, where:
- The specified target dimension matches the input
- The other dimension is calculated to preserve the original aspect ratio
- Both values are rounded using the provided rounding function

## Type Declarations

```ts
type Dimensions = {
  width: number;
  height: number;
}

type DimensionsTarget = 
  | { width: number; height?: never }
  | { height: number; width?: never }

type RoundValueFn = (value: number) => number
```

## Throws

- Throws `Error` when `dimensions.width` or `dimensions.height` is not a positive finite number
- Throws `Error` when both `target.width` and `target.height` are provided or both are missing
- Throws `Error` when the target dimension is not a positive finite number

## Design Notes

The utility uses function overloads to provide type safety at compile time, ensuring that exactly one target dimension is specified. The implementation:

1. **Validates inputs**: Checks that all dimensions are positive finite numbers
2. **Enforces exclusivity**: Ensures exactly one target dimension is provided
3. **Preserves precision**: Uses helper functions `scaleToWidth` and `scaleToHeight` for accurate calculations
4. **Customizable rounding**: Allows different rounding strategies (Math.round, Math.floor, Math.ceil, etc.)

The aspect ratio calculation uses the formula: `newDimension = originalDimension * (target / correspondingOriginal)`.

## When To Use

Use `scaleByAspectRatio` when you need:

- responsive image scaling
- video thumbnail generation
- UI component resizing with aspect ratio preservation
- canvas or SVG element scaling
- consistent rounding behavior across dimensions

## When Not To Use

Avoid when:

- you need to scale to exact dimensions (use direct assignment)
- aspect ratio distortion is acceptable or desired
- you need to scale both dimensions with different ratios
- working with non-rectangular shapes or complex transformations

## Summary

`scaleByAspectRatio` provides type-safe dimension scaling with aspect ratio preservation, input validation, and customizable rounding for consistent results in responsive design and media processing scenarios.
