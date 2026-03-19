# loadImage

Loads an image from a given source URL with optional configuration.

## Usage

```ts
import { loadImage } from "@petr-ptacek/js-core"

const image = await loadImage("/image.png");
document.body.appendChild(image);
```

## Why This Utility Exists

Loading images dynamically is a common task in web applications. While the native `Image` element provides this functionality, manually creating and managing image loading requires boilerplate code for promise-based handling, error management, and attribute configuration. `loadImage` wraps this pattern into a simple, reusable API that handles cross-origin settings and decoding options with sensible defaults.

## Signature

```typescript
function loadImage(src: string, options?: LoadImageOptions): Promise<HTMLImageElement>
```

## Parameters

- `src` (`string`): The image source URL to load.
- `options` (`LoadImageOptions`, optional): Optional configuration for image loading.
  - `crossOrigin` (`HTMLImageElement["crossOrigin"]`, optional): Sets the `crossOrigin` attribute on the image element.
  - `decoding` (`HTMLImageElement["decoding"]`, optional): Sets the `decoding` attribute on the image element.

## Return Type

Returns a promise that resolves with the loaded `HTMLImageElement` or rejects with the loading error.

## Type Declarations

```typescript
type LoadImageOptions = {
  crossOrigin?: HTMLImageElement["crossOrigin"];
  decoding?: HTMLImageElement["decoding"];
}
```

## Throws / Errors

- Rejects when the image fails to load (network error, invalid source, CORS restrictions, etc.).
- The rejection value is the error event from the image element.

## Design Notes

The implementation creates a new `HTMLImageElement` and configures optional attributes before setting the source. This ensures that event handlers are attached before the `src` property triggers the loading process. The function only applies optional attributes if explicitly provided, avoiding unnecessary default assignments.

## When To Use

Use `loadImage` when you need to:

- dynamically load images from URLs
- configure cross-origin settings for remote images
- handle image loading with promise-based error handling
- set up preloading or lazy-loaded image scenarios
- manage multiple concurrent image loads

## When Not To Use

Avoid when:

- you need to load images from a static set of URLs (use `<img>` tags directly)
- you need progress tracking for large images
- you require abort/cancellation capabilities (consider `withAbortable`)
- you need to handle base64 or data URLs only
- you need sophisticated image optimization features

## Summary

`loadImage` provides a simple, promise-based API for dynamically loading images with optional cross-origin and decoding configuration. It abstracts away the boilerplate of manual image element creation and event handling.

