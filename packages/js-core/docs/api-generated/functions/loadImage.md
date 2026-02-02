# Function: loadImage()

> **loadImage**(`src`, `options`): `Promise`\<`HTMLImageElement`\>

Loads an image from the given source URL.

Creates a new `HTMLImageElement`, applies optional configuration,
and resolves once the image is successfully loaded.

The returned promise is rejected if the image fails to load.

## Parameters

### src

`string`

Image source URL.

### options

[`LoadImageOptions`](../type-aliases/LoadImageOptions.md) = `{}`

Optional image loading configuration.

## Returns

`Promise`\<`HTMLImageElement`\>

A promise that resolves with the loaded `HTMLImageElement`
or rejects with the loading error.

## Example

```ts
const image = await loadImage("/image.png", {
  crossOrigin: "anonymous",
  decoding: "async",
});
```

## Since

1.0.0
