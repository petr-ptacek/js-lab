# shrinkImage

Shrinks an image by limiting its maximum dimensions and optionally reducing output quality.

## Usage

```ts
import { shrinkImage } from "@petr-ptacek/js-core"

const img = document.querySelector("img")!;

const blob = await shrinkImage(img, {
  maxWidth: 1600,
  maxHeight: 1600,
});
```

## Why This Utility Exists

Image upload forms often require client-side optimization to reduce server load and improve user experience.
`shrinkImage` provides a front-end pre-upload optimization utility that reduces image dimensions while preserving aspect
ratio. As a side effect, this also reduces file size through dimension limiting and optional quality reduction. The
utility handles canvas rendering, blob creation, and error handling in a single promise-based API.

## Signature

```typescript
function shrinkImage(
  image: HTMLImageElement,
  options?: ShrinkImageOptions,
): Promise<Blob>
```

## Parameters

- `image` (`HTMLImageElement`): Source image element. Must have valid `naturalWidth` and `naturalHeight` properties.
- `options` (`ShrinkImageOptions`, optional): Shrinking and compression options.
  - `maxWidth` (`number`, optional): Maximum allowed image width. Image is scaled down proportionally if wider.
  - `maxHeight` (`number`, optional): Maximum allowed image height. Image is scaled down proportionally if taller.
  - `quality` (`number`, optional, default `0.8`): Output image quality (0–1). Applies only to lossy formats like JPEG
    and WebP.
  - `mimeType` (`string`, optional, default `"image/jpeg"`): Output MIME type (e.g., `"image/jpeg"`, `"image/webp"`,
    `"image/png"`).

## Return Type

Returns a promise that resolves with a `Blob` containing the resized and optionally compressed image, or rejects if the
operation fails.

## Type Declarations

```typescript
type ShrinkImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
}
```

## Throws / Errors

- Throws `Error` when `image.naturalWidth` or `image.naturalHeight` is not a positive finite number
- Throws `Error` when `maxWidth` or `maxHeight` is provided but not a positive finite number
- Throws `Error` if the canvas 2D context is unavailable
- Rejects if the image blob cannot be created

## Design Notes

The implementation:

1. **Dimension limiting is primary** - File size reduction is achieved mainly through dimension constraints
2. **Quality is secondary** - Used to further optimize for lossy formats
3. **Preserves aspect ratio** - The image is never distorted
4. **Never upscales** - If the image is already smaller than constraints, dimensions remain unchanged
5. **Uses canvas rendering** - Delegates to `HTMLCanvasElement.toBlob` for encoding
6. **Non-mutating** - The original image element is never modified
7. **Fit-inside behavior** - When both `maxWidth` and `maxHeight` are provided, the image is scaled so neither dimension
   exceeds its limit

The utility uses `scaleByAspectRatio` to calculate final dimensions and delegates encoding to canvas `toBlob` for
maximum compatibility.

## When To Use

Use `shrinkImage` when you need to:

- optimize images before upload
- reduce image dimensions client-side
- compress images with quality control
- fit images inside bounding boxes
- generate optimized thumbnails
- reduce bandwidth for mobile users

## When Not To Use

Avoid when:

- you need to store images (use a backend service or cloud storage)
- you need advanced compression features (use specialized image libraries)
- you need to process multiple images concurrently at scale (consider workers)
- you require exact file size guarantees
- the canvas API is not available (check browser support)

## Summary

`shrinkImage` provides a simple, promise-based API for front-end image optimization. It reduces dimensions while
preserving aspect ratio and allows optional quality control. The result is a `Blob` ready for upload or further
processing.

