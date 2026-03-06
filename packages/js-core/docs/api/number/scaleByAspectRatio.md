---
title: scaleByAspectRatio
category: number
tags:
  - scaling
  - aspect-ratio
  - dimensions
  - responsive
  - image
since: 1.0.0
---


> **Category:** number
> **Since:** 1.0.0
> **Tags:** scaling, aspect-ratio, dimensions, responsive, image


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


## Snippets

### basic.ts

```ts
import { scaleByAspectRatio } from "@petr-ptacek/js-core";

// basic scaling examples
const original = { width: 1920, height: 1080 }; // Full HD

// scale to specific width (e.g., for thumbnails)
const thumbnail = scaleByAspectRatio(original, { width: 320 });
console.log(thumbnail); // { width: 320, height: 180 }

// scale to specific height (e.g., for mobile screens)
const mobile = scaleByAspectRatio(original, { height: 640 });
console.log(mobile); // { width: 1138, height: 640 }

// working with different aspect ratios
const portrait = { width: 600, height: 800 }; // 3:4 ratio

const scaledPortrait = scaleByAspectRatio(portrait, { width: 300 });
console.log(scaledPortrait); // { width: 300, height: 400 }

```

### custom-rounding.ts

```ts
import { scaleByAspectRatio } from "@petr-ptacek/js-core";

// custom rounding examples
const dimensions = { width: 100, height: 75 };

// default rounding (Math.round)
const defaultRound = scaleByAspectRatio(dimensions, { width: 33 });
console.log("Default round:", defaultRound);
// { width: 33, height: 25 } (24.75 rounds to 25)

// floor rounding (always round down)
const floorRound = scaleByAspectRatio(dimensions, { width: 33 }, Math.floor);
console.log("Floor round:", floorRound);
// { width: 33, height: 24 } (24.75 floors to 24)

// ceil rounding (always round up)
const ceilRound = scaleByAspectRatio(dimensions, { width: 33 }, Math.ceil);
console.log("Ceil round:", ceilRound);
// { width: 33, height: 25 } (24.75 ceils to 25)

// custom rounding to even numbers
const roundToEven = (value: number) => {
  const rounded = Math.round(value);
  return rounded % 2 === 0 ? rounded : rounded + 1;
};

const evenRound = scaleByAspectRatio(dimensions, { width: 33 }, roundToEven);
console.log("Even round:", evenRound);
// { width: 33, height: 26 } (25 becomes 26 to be even)

// precision rounding (to specific decimal places)
const roundToDecimal = (decimals: number) => (value: number) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

const precisionRound = scaleByAspectRatio(
  dimensions,
  { width: 33.33 },
  roundToDecimal(1)
);
console.log("Precision round:", precisionRound);
// Rounds to 1 decimal place

```

### responsive-images.ts

```ts
import { scaleByAspectRatio } from "@petr-ptacek/js-core";

// responsive image scaling
class ResponsiveImage {
  private originalDimensions: { width: number; height: number };

  constructor(width: number, height: number) {
    this.originalDimensions = { width, height };
  }

  // scale to fit within container width
  scaleToFitWidth(containerWidth: number) {
    return scaleByAspectRatio(this.originalDimensions, { width: containerWidth });
  }

  // scale to fit within container height
  scaleToFitHeight(containerHeight: number) {
    return scaleByAspectRatio(this.originalDimensions, { height: containerHeight });
  }

  // scale to fit within container (uses smallest dimension)
  scaleToFitContainer(containerWidth: number, containerHeight: number) {
    const scaledByWidth = this.scaleToFitWidth(containerWidth);
    const scaledByHeight = this.scaleToFitHeight(containerHeight);

    // choose the scaling that fits entirely within container
    if (scaledByWidth.height <= containerHeight) {
      return scaledByWidth;
    }
    return scaledByHeight;
  }

  // generate multiple sizes for srcset
  generateSizes(widths: number[]) {
    return widths.map(width => ({
      ...scaleByAspectRatio(this.originalDimensions, { width })
    }));
  }
}

// usage example
const image = new ResponsiveImage(2048, 1536); // 4:3 ratio

console.log("Mobile:", image.scaleToFitWidth(320));
// Mobile: { width: 320, height: 240 }

console.log("Tablet:", image.scaleToFitWidth(768));
// Tablet: { width: 768, height: 576 }

console.log("Desktop:", image.scaleToFitWidth(1200));
// Desktop: { width: 1200, height: 900 }

// generate srcset sizes
const sizes = image.generateSizes([320, 640, 1024, 1920]);
console.log("Srcset sizes:", sizes);
// [
//   { width: 320, height: 240 },
//   { width: 640, height: 480 },
//   { width: 1024, height: 768 },
//   { width: 1920, height: 1440 }
// ]

```




