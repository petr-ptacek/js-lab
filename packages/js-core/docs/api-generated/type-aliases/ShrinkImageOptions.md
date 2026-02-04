# Type Alias: ShrinkImageOptions

> **ShrinkImageOptions** = `object`

## Since

1.0.0

## Properties

### maxWidth?

> `optional` **maxWidth**: `number`

Maximum allowed image width.
If the image is wider, it will be proportionally scaled down.

***

### maxHeight?

> `optional` **maxHeight**: `number`

Maximum allowed image height.
If the image is taller, it will be proportionally scaled down.

***

### quality?

> `optional` **quality**: `number`

Output image quality (0–1).
Applies only to lossy formats (e.g. JPEG, WebP).

#### Default

```ts
0.8
```

***

### mimeType?

> `optional` **mimeType**: `string`

Output MIME type.

#### Default

```ts
"image/jpeg"
```
