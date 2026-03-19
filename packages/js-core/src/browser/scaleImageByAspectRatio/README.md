# scaleImageByAspectRatio

Scales an image to a target width or height while preserving its aspect ratio.

## Usage

```ts
import { scaleImageByAspectRatio } from "@petr-ptacek/js-core"

const img = document.querySelector("img")!;

// Scale to fixed width
const scaled = scaleImageByAspectRatio(img, { width: 300 });
console.log(scaled.width);  // 300
console.log(scaled.height); // calculated automatically

// Scale to fixed height
const scaledHeight = scaleImageByAspectRatio(img, { height: 200 });
console.log(scaledHeight.width);  // calculated automatically
console.log(scaledHeight.height); // 200
```

## Why This Utility Exists

When working with images dynamically, you often need to resize them while maintaining their original aspect ratio to prevent distortion. This utility provides a type-safe, DOM-oriented wrapper around `scaleByAspectRatio` that operates directly on `HTMLImageElement` objects. It handles validation, uses the image's natural dimensions, and returns a new image instance without mutating the original.

## Signature

```typescript
function scaleImageByAspectRatio(
  image: HTMLImageElement,
  target: DimensionsTarget,
  roundFn?: RoundValueFn,
): HTMLImageElement
```

## Parameters

- `image` (`HTMLImageElement`): Source image element. Must have valid `naturalWidth` and `naturalHeight` properties.
- `target` (`DimensionsTarget`): Target dimension object containing either `width` or `height` (exactly one must be provided).
- `roundFn` (`RoundValueFn`, optional): Function to round the calculated dimension. Defaults to `Math.round`.

## Return Type

Returns a new `HTMLImageElement` with:
- The specified target dimension matching your requirement
- The other dimension automatically calculated to preserve aspect ratio
- The same `src` as the original image
- Both width and height set to the calculated values

## Type Declarations

```typescript
type Dimensions = {
  width: number;
  height: number;
}

type DimensionsTarget = 
  | { width: number; height?: never }
  | { height: number; width?: never }

type RoundValueFn = (value: number) => number
```

## Throws / Errors

- Throws `Error` when both `width` and `height` are provided
- Throws `Error` when neither `width` nor `height` is provided
- Throws `Error` when `image.naturalWidth` or `image.naturalHeight` is not a positive finite number
- Throws `Error` when the target dimension is not a positive finite number

## Design Notes

The implementation:

1. **Uses function overloads** to enforce type safety and ensure exactly one dimension is specified
2. **Creates new image instance** - the original image is never mutated
3. **Preserves source** - the returned image shares the same `src` as the input
4. **Delegates calculation** - uses `scaleByAspectRatio` from the `number` module for consistent scaling logic
5. **Customizable rounding** - allows different rounding strategies (Math.round, Math.floor, Math.ceil, etc.)

The utility is a thin, DOM-oriented wrapper that combines:
- Image element handling
- Natural dimension extraction
- Aspect ratio preservation via `scaleByAspectRatio`

## When To Use

Use `scaleImageByAspectRatio` when you need to:

- dynamically resize images while maintaining aspect ratio
- generate image thumbnails with responsive sizing
- scale images in responsive layouts
- prepare images for specific width or height constraints
- create multiple versions of the same image at different scales

## When Not To Use

Avoid when:

- you need to directly manipulate DOM (use canvas or CSS instead)
- you need to scale already-rendered images (use canvas)
- you need to change the aspect ratio intentionally
- you need both dimensions to scale independently
- you only have `width` and `height` attributes (use `scaleByAspectRatio` instead)

## Summary

`scaleImageByAspectRatio` provides a simple, type-safe way to scale `HTMLImageElement` objects to target widths or heights while preserving their natural aspect ratios. It returns a new image instance with calculated dimensions, making it ideal for responsive image handling and thumbnail generation.

