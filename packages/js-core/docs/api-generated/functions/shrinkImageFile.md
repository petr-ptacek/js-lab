# Function: shrinkImageFile()

> **shrinkImageFile**(`file`, `options?`): `Promise`\<`File`\>

Shrinks an image file before upload by limiting its maximum dimensions
and optionally reducing output quality.

This is a **high-level convenience wrapper** around [shrinkImage](shrinkImage.md).
It accepts a `File`, performs all required loading internally,
and returns a new `File` ready for upload.

The original file is not mutated.

## Parameters

### file

`File`

Source image file.

### options?

[`ShrinkImageOptions`](../type-aliases/ShrinkImageOptions.md)

Shrinking options such as maximum dimensions and output quality.

## Returns

`Promise`\<`File`\>

A `Promise` that resolves to a new `File` containing the shrunk image.

## Throws

Throws if:
- the file cannot be loaded as an image
- shrinking fails

## Remarks

- Aspect ratio is always preserved
- The image is only scaled down, never up
- File name and `lastModified` are preserved

## See

shrinkImage

## Examples

Shrink a file before upload:
```ts
const file = input.files![0];

const shrunk = await shrinkImageFile(file, {
  maxWidth: 1600,
  maxHeight: 1600,
});

const formData = new FormData();
formData.append("file", shrunk);
```

Reduce file size aggressively:
```ts
const shrunk = await shrinkImageFile(file, {
  maxWidth: 1200,
  quality: 0.7,
});
```

## Since

1.0.0
