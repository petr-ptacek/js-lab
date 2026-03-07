---
title: shrinkImage
category: browser
tags:
  - image
  - compression
  - canvas
  - blob
  - resize
  - optimization
since: 1.0.0
---


> **Category:** browser
> **Since:** 1.0.0
> **Tags:** image, compression, canvas, blob, resize, optimization


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



## Snippets

### basic.ts

```ts
import { shrinkImage } from "@petr-ptacek/js-core";

// Basic usage: Shrink image before upload
const imageInput = document.querySelector<HTMLInputElement>("input[type='file']")!;

imageInput.addEventListener("change", async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  // Create image element
  const img = new Image();
  img.onload = async () => {
    try {
      // Shrink image to max 1600x1600
      const blob = await shrinkImage(img, {
        maxWidth: 1600,
        maxHeight: 1600,
      });

      console.log(`Original: ${file.size} bytes`);
      console.log(`Optimized: ${blob.size} bytes`);
      console.log(`Saved: ${((1 - blob.size / file.size) * 100).toFixed(1)}%`);
    } catch (error) {
      console.error("Failed to shrink image:", error);
    }
  };

  // Load image from file
  img.src = URL.createObjectURL(file);
});


```

### form-upload.ts

```ts
import { shrinkImage } from "@petr-ptacek/js-core";

// Helper function for form submission with image optimization

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function submitFormWithOptimizedImage(
  formElement: HTMLFormElement,
  imageElement: HTMLImageElement,
  maxWidth: number,
  maxHeight: number,
): Promise<void> {
  try {
    // Optimize the image
    const optimizedBlob = await shrinkImage(imageElement, {
      maxWidth,
      maxHeight,
      quality: 0.8,
    });

    // Create FormData
    const formData = new FormData(formElement);

    // Replace or add the image file
    formData.set("image", optimizedBlob, "optimized-image.jpg");

    // Submit the form
    const response = await fetch(formElement.action, {
      method: formElement.method || "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    console.log("Image uploaded successfully");
  } catch (error) {
    console.error("Failed to upload image:", error);
  }
}

// Example usage:
// const form = document.querySelector("form")!;
// const img = document.querySelector("img")!;
// await submitFormWithOptimizedImage(form, img, 1600, 1600);


```

### multiple-formats.ts

```ts
import { shrinkImage } from "@petr-ptacek/js-core";

// Fit image inside a bounding box (e.g., 1600x1200)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeImageForGallery(imageElement: HTMLImageElement) {
  try {
    const blob = await shrinkImage(imageElement, {
      maxWidth: 1600,
      maxHeight: 1200,
    });

    console.log("Image optimized for gallery display");
    console.log(`Size: ${blob.size} bytes`);
    return blob;
  } catch (error) {
    console.error("Failed to optimize image:", error);
  }
}

// Different quality levels for different formats

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeWithFormats(imageElement: HTMLImageElement) {
  // High quality JPEG for thumbnails
  const thumbnail = await shrinkImage(imageElement, {
    maxWidth: 200,
    maxHeight: 200,
    quality: 0.85,
    mimeType: "image/jpeg",
  });

  // Medium quality WebP for display
  const display = await shrinkImage(imageElement, {
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.75,
    mimeType: "image/webp",
  });

  // High quality PNG for archive (lossless)
  const archive = await shrinkImage(imageElement, {
    maxWidth: 2000,
    maxHeight: 2000,
    mimeType: "image/png",
  });

  return { thumbnail, display, archive };
}


```




