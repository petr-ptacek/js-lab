# Function: shrinkImageElement()

> **shrinkImageElement**(`image`, `options?`): `Promise`\<`HTMLImageElement`\>

Shrinks an image element and returns a new `HTMLImageElement`.

This is a **convenience wrapper** around [shrinkImage](shrinkImage.md) designed
for cases where a DOM image element is the desired output.

Unlike [shrinkImage](shrinkImage.md), which returns a `Blob`, this utility follows
the intuitive **"image in → image out"** mental model and is therefore
better suited for direct use in UI code.

Internally, the image is resized using a canvas, converted to a `Blob`,
and then loaded back into a new `HTMLImageElement`.

The original image element is not mutated.

## Parameters

### image

`HTMLImageElement`

Source image element. Must have valid `naturalWidth`
and `naturalHeight`.

### options?

[`ShrinkImageOptions`](../type-aliases/ShrinkImageOptions.md)

Shrinking options such as maximum dimensions and output quality.

## Returns

`Promise`\<`HTMLImageElement`\>

A `Promise` that resolves to a new `HTMLImageElement`
containing the shrunk image.

## Throws

Throws if:
- the source image has invalid natural dimensions
- shrinking fails
- the resulting image cannot be loaded

## Remarks

- Aspect ratio is always preserved
- The image is only scaled down, never up
- A new image element is always created
- This utility is intended for UI usage, not direct file uploads

## See

 - shrinkImage
 - shrinkImageFile

## Examples

Shrink an image element for display:
```ts
const img = document.querySelector("img")!;

const resized = await shrinkImageElement(img, {
  maxWidth: 1200,
  maxHeight: 1200,
});

document.body.appendChild(resized);
```

Replace an existing image after resizing:
```ts
const resized = await shrinkImageElement(img, { maxWidth: 800 });
img.replaceWith(resized);
```

## Since

1.0.0
