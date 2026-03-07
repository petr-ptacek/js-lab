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

