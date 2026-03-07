# shrinkImageElement

Shrinks an image element and returns a new `HTMLImageElement` with the optimized result.

## Usage

```ts
import { shrinkImageElement } from "@petr-ptacek/js-core"

const img = document.querySelector("img")!;

const resized = await shrinkImageElement(img, {
  maxWidth: 1200,
  maxHeight: 1200,
});

document.body.appendChild(resized);
```

## Why This Utility Exists

`shrinkImage` returns a `Blob`, which is perfect for uploads and storage. However, when you simply want to display an
optimized image in the DOM, working with `Blob` objects adds unnecessary complexity. This utility provides a convenient
**"image in → image out"** mental model by wrapping `shrinkImage` and automatically converting the `Blob` result back
into an `HTMLImageElement`. This is ideal for direct DOM manipulation and interactive use cases.

## Comparison to shrinkImage

| Aspect           | `shrinkImage`     | `shrinkImageElement`           |
|------------------|-------------------|--------------------------------|
| **Input**        | HTMLImageElement  | HTMLImageElement               |
| **Output**       | Blob (file-like)  | HTMLImageElement (DOM element) |
| **Use case**     | Uploads, storage  | Display, DOM insertion         |
| **Mental model** | File optimization | Image resizing                 |

Use `shrinkImage` when you need the `Blob` directly (e.g., for upload or download).  
Use `shrinkImageElement` when you want a new DOM element (e.g., for display or replacement).

## Signature

```typescript
function shrinkImageElement(
  image: HTMLImageElement,
  options?: ShrinkImageOptions,
): Promise<HTMLImageElement>
```

## Parameters

- `image` (`HTMLImageElement`): Source image element. Must have valid `naturalWidth` and `naturalHeight` properties.
- `options` (`ShrinkImageOptions`, optional): Shrinking and compression options (same as `shrinkImage`).
  - `maxWidth` (`number`, optional): Maximum allowed image width.
  - `maxHeight` (`number`, optional): Maximum allowed image height.
  - `quality` (`number`, optional, default `0.8`): Output image quality (0–1) for lossy formats.
  - `mimeType` (`string`, optional, default `"image/jpeg"`): Output MIME type.

## Return Type

Returns a promise that resolves with a new `HTMLImageElement` containing the shrunk image, or rejects if the operation
fails.

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
- Rejects if the image blob cannot be created
- Rejects if the resulting image cannot be loaded

## Implementation Details

`shrinkImageElement` is a thin wrapper that:

1. Calls `shrinkImage` to create a `Blob` with optimized dimensions and quality
2. Creates an object URL from the `Blob` using `URL.createObjectURL`
3. Loads the blob back into a new `HTMLImageElement` using `loadImage`
4. Revokes the object URL (in a `finally` block to ensure cleanup even on error)
5. Returns the new image element

The original image element is **never mutated**.

## Design Notes

The utility maintains proper resource cleanup by revoking the object URL in a `finally` block. This ensures cleanup even
if `loadImage` throws. The URL is only held temporarily during the load operation.

The combination of `shrinkImage` → object URL → `loadImage` ensures:

- Consistent optimization behavior (delegates to `shrinkImage`)
- Clean DOM integration (returns `HTMLImageElement`)
- Proper resource management (revokes object URLs)
- Zero mutations of input (creates new element)

## When To Use

Use `shrinkImageElement` when you need to:

- resize and display images in the DOM
- replace an image with an optimized version for display
- preview optimized images before upload
- generate responsive image thumbnails for display
- chain image operations in UI code

## When Not To Use

Avoid when:

- you need the `Blob` directly (use `shrinkImage` instead)
- you need to upload or download the image (use `shrinkImage` instead)
- you need to batch-process images programmatically (use `shrinkImage` in a loop)
- performance is critical and you want to avoid extra conversions
- you need to control caching behavior (object URLs have special lifecycle rules)

## Summary

`shrinkImageElement` provides a convenience wrapper around `shrinkImage` for DOM-focused use cases. It returns a new
`HTMLImageElement` with optimized dimensions, making it ideal for interactive image resizing and display scenarios where
the "image in → image out" model is more intuitive than working with `Blob` objects.

See also: `shrinkImage` (Blob output), `scaleImageByAspectRatio` (scaling only, no compression), `loadImage` (loading
images from URLs).

