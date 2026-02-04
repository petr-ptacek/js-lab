# Function: shrinkImage()

> **shrinkImage**(`image`, `options`): `Promise`\<`Blob`\>

Shrinks an image by limiting its maximum dimensions and optionally reducing
output quality.

This utility is intended for **front-end pre-upload optimization**.
Its primary responsibility is to **reduce image dimensions** while preserving
the original aspect ratio. As a side effect, this also reduces the file size.

The function operates on an `HTMLImageElement`, renders it into a canvas,
and exports the result as a `Blob`.

This is **not a generic image compression utility**. Dimension limiting
is always the main mechanism; quality-based compression is secondary.

## Parameters

### image

`HTMLImageElement`

Source image. Must have valid `naturalWidth` and `naturalHeight`.

### options

[`ShrinkImageOptions`](../type-aliases/ShrinkImageOptions.md) = `{}`

Shrinking options such as maximum dimensions and output quality.

## Returns

`Promise`\<`Blob`\>

A `Promise` that resolves to a `Blob` containing the resized image.

## Throws

Throws if:
- the image has invalid natural dimensions
- a provided dimension constraint is not a positive finite number
- the canvas 2D context is unavailable
- the image blob cannot be created

## Remarks

- Aspect ratio is always preserved
- The image is only scaled down, never up
- The original image element is not mutated
- Output format and quality are controlled via `mimeType` and `quality`
- When both `maxWidth` and `maxHeight` are provided, the image is scaled
  so that **neither dimension exceeds its limit** (fit-inside behavior)

## See

scaleByAspectRatio

## Examples

Shrink an image before upload:
```ts
const img = document.querySelector("img")!;

const blob = await shrinkImage(img, {
  maxWidth: 1600,
  maxHeight: 1600,
});
```

Fit image inside a bounding box:
```ts
// Original image: 4000 × 3000
const blob = await shrinkImage(img, {
  maxWidth: 1600,
  maxHeight: 1200,
});

// Resulting dimensions: 1600 × 1200
```

Control output quality:
```ts
const blob = await shrinkImage(img, {
  maxWidth: 1200,
  quality: 0.75,
});
```

Change output format:
```ts
const blob = await shrinkImage(img, {
  maxWidth: 1600,
  mimeType: "image/webp",
});
```

No resizing when image already fits constraints:
```ts
await shrinkImage(img, { maxWidth: 4000 });
// image dimensions remain unchanged
```

## Since

1.0.0
