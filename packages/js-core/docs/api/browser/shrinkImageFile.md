---
title: shrinkImageFile
category: browser
tags:
  - file
  - image
  - compression
  - upload
  - optimization
  - blob
since: 1.0.0
---


> **Category:** browser
> **Since:** 1.0.0
> **Tags:** file, image, compression, upload, optimization, blob


# shrinkImageFile

Shrinks an image file before upload by limiting its maximum dimensions and optionally reducing output quality.

## Usage

```ts
import { shrinkImageFile } from "@petr-ptacek/js-core"

const input = document.querySelector<HTMLInputElement>("input[type='file']")!;
const file = input.files![0];

const shrunk = await shrinkImageFile(file, {
  maxWidth: 1600,
  maxHeight: 1600,
});

// Ready for upload
const formData = new FormData();
formData.append("image", shrunk);
await fetch("/api/upload", { method: "POST", body: formData });
```

## Why This Utility Exists

`shrinkImage` is powerful but requires an `HTMLImageElement`. When working with file uploads, you have a `File` object
from an input, not a DOM element. This utility provides a **"file in → file out"** API that handles all the complexity
internally:

1. Load the file into an image element
2. Optimize using `shrinkImage`
3. Convert back to a `File` ready for upload

This eliminates boilerplate and provides an intuitive API for the most common use case: optimizing files before upload.

## Comparison to Related Utilities

| Utility              | Input            | Output           | Use Case             |
|----------------------|------------------|------------------|----------------------|
| `shrinkImage`        | HTMLImageElement | Blob             | Generic optimization |
| `shrinkImageElement` | HTMLImageElement | HTMLImageElement | DOM display          |
| `shrinkImageFile`    | File             | File             | Upload optimization  |
| `loadImage`          | URL string       | HTMLImageElement | Loading URLs         |

**Use `shrinkImageFile` when you have a `File` object** (from `<input type="file">`) and need to upload it.

## Signature

```typescript
function shrinkImageFile(
  file: File,
  options?: ShrinkImageOptions,
): Promise<File>
```

## Parameters

- `file` (`File`): Source image file to shrink.
- `options` (`ShrinkImageOptions`, optional): Shrinking and compression options (same as `shrinkImage`).
  - `maxWidth` (`number`, optional): Maximum allowed image width.
  - `maxHeight` (`number`, optional): Maximum allowed image height.
  - `quality` (`number`, optional, default `0.8`): Output image quality (0–1) for lossy formats.
  - `mimeType` (`string`, optional, default `"image/jpeg"`): Output MIME type.

## Return Type

Returns a promise that resolves with a new `File` object containing the shrunk image, or rejects if the operation fails.

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

- Rejects when the file cannot be loaded as an image
- Rejects when `shrinkImage` fails
- Rejects if the blob cannot be converted to a `File`

## Preservation Behavior

The returned `File` preserves:

- **File name** (`file.name`) - Original file name is kept
- **Last modified time** (`file.lastModified`) - Original timestamp is preserved
- **MIME type** - Taken from the `shrinkImage` output (or falls back to original file type if unavailable)

This ensures the file retains context information for storage and logging.

## Implementation Details

`shrinkImageFile` is a **high-level convenience wrapper** that:

1. Loads the `File` into an `HTMLImageElement` using an internal helper
2. Calls `shrinkImage` to optimize the image dimensions and quality
3. Creates a new `File` object from the optimized blob
4. Preserves file metadata (name, lastModified)
5. Returns the new `File` ready for upload

The original file is **never mutated**. The operation is purely functional.

## Design Notes

The utility focuses on the **upload optimization use case**. It automates the entire pipeline from file input to
optimized file output, making it ideal for form submissions and file upload flows.

Key characteristics:

- **Single responsibility**: File upload optimization
- **Complete automation**: No intermediate steps needed
- **Metadata preservation**: Name and timestamp are kept
- **Delegated optimization**: Uses `shrinkImage` internally for consistent behavior
- **Promise-based**: Fits naturally into async/await workflows

## When To Use

Use `shrinkImageFile` when you need to:

- optimize images from file input before upload
- reduce file size client-side before sending to server
- preserve file name and metadata during optimization
- automate the entire upload optimization flow
- handle file objects directly (avoiding DOM element conversion)

## When Not To Use

Avoid when:

- you need to display the optimized image (use `shrinkImageElement` instead)
- you have a URL instead of a File (use `loadImage` + `shrinkImage`)
- you need a `Blob` directly (use `shrinkImage` instead)
- you need to process files server-side (upload without optimization)
- you need to batch-process many files with custom logic (use `shrinkImage` in a loop)

## Summary

`shrinkImageFile` is a high-level convenience wrapper combining `loadImage` and `shrinkImage` for the common use case of
optimizing file uploads. It accepts a `File`, handles all intermediate steps, and returns a new optimized `File` ready
for upload with metadata preserved.

See also: `shrinkImage` (generic optimization), `shrinkImageElement` (DOM display), `loadImage` (URL loading).



## Snippets

### basic.ts

```ts
import { shrinkImageFile } from "@petr-ptacek/js-core";

// Basic usage: Shrink file before upload
const input = document.querySelector<HTMLInputElement>("input[type='file']")!;

input.addEventListener("change", async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    // Optimize the file
    const shrunk = await shrinkImageFile(file, {
      maxWidth: 1600,
      maxHeight: 1600,
    });

    console.log(`Original: ${file.size} bytes`);
    console.log(`Optimized: ${shrunk.size} bytes`);
    console.log(`Saved: ${((1 - shrunk.size / file.size) * 100).toFixed(1)}%`);

    // Ready for upload
    const formData = new FormData();
    formData.append("image", shrunk);
    // await fetch("/api/upload", { method: "POST", body: formData });
  } catch (error) {
    console.error("Failed to optimize file:", error);
  }
});


```

### batch-upload.ts

```ts
import { shrinkImageFile } from "@petr-ptacek/js-core";

// Multiple file upload with optimization

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadMultipleImages(files: FileList): Promise<void> {
  const optimized: File[] = [];

  for ( const file of Array.from(files) ) {
    try {
      const shrunk = await shrinkImageFile(file, {
        maxWidth: 1600,
        maxHeight: 1200,
        quality: 0.8,
      });

      optimized.push(shrunk);
      console.log(`✓ ${file.name} optimized: ${file.size} → ${shrunk.size}`);
    } catch ( error ) {
      console.error(`✗ Failed to optimize ${file.name}:`, error);
    }
  }

  // Upload all optimized files
  const formData = new FormData();
  optimized.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });

  // await fetch("/api/upload-multiple", {
  //   method: "POST",
  //   body: formData,
  // });
}

// Different quality presets for different use cases

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeWithPresets(file: File): Promise<{
  thumbnail: File;
  display: File;
  archive: File;
}> {
  const [thumbnail, display, archive] = await Promise.all([
    shrinkImageFile(file, {
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.85,
      mimeType: "image/jpeg",
    }),
    shrinkImageFile(file, {
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 0.8,
      mimeType: "image/webp",
    }),
    shrinkImageFile(file, {
      maxWidth: 2000,
      maxHeight: 2000,
      mimeType: "image/png",
    }),
  ]);

  return { thumbnail, display, archive };
}


```

### file-vs-image.ts

```ts
import { shrinkImageFile, shrinkImage } from "@petr-ptacek/js-core";

// Demonstrate use cases: when to use shrinkImageFile vs shrinkImage

// Use shrinkImageFile when you have a File from input

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleFileInputUpload(): Promise<void> {
  const input = document.querySelector<HTMLInputElement>("input[type='file']")!;
  const file = input.files![0]!;

  // File in → File out
  const optimized = await shrinkImageFile(file, {
    maxWidth: 1600,
    maxHeight: 1600,
  });

  const formData = new FormData();
  formData.append("file", optimized);
  // await fetch("/api/upload", { method: "POST", body: formData });
}

// Use shrinkImage when you have an HTMLImageElement

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleImageElementOptimization(): Promise<void> {
  const img = document.querySelector<HTMLImageElement>("img")!;

  // Image element in → Blob out
  const blob = await shrinkImage(img, {
    maxWidth: 1600,
    maxHeight: 1600,
  });

  const formData = new FormData();
  formData.append("image", blob);
  // await fetch("/api/upload", { method: "POST", body: formData });
}

// Real-world example: Avatar upload form

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadAvatarForm(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const input = form.querySelector<HTMLInputElement>("input[type='file']")!;
  const file = input.files?.[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  try {
    // Optimize for avatar (square, smaller size)
    const optimized = await shrinkImageFile(file, {
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.85,
    });

    // Submit form with optimized file
    const formData = new FormData(form);
    formData.set("avatar", optimized, optimized.name);

    const response = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    console.log("Avatar uploaded successfully");
  } catch (error) {
    console.error("Failed to upload avatar:", error);
  }
}


```




