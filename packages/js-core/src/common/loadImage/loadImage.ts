import type { LoadImageOptions } from "./types";
import { isUndefined }           from "../../is-what";

/**
 * Loads an image from the given source URL.
 *
 * Creates a new `HTMLImageElement`, applies optional configuration,
 * and resolves once the image is successfully loaded.
 *
 * The returned promise is rejected if the image fails to load.
 *
 * @param src - Image source URL.
 * @param options - Optional image loading configuration.
 * @param options.crossOrigin - Sets the `crossOrigin` attribute on the image.
 * @param options.decoding - Sets the `decoding` attribute on the image.
 *
 * @returns A promise that resolves with the loaded `HTMLImageElement`
 * or rejects with the loading error.
 *
 * @example
 * ```ts
 * const image = await loadImage("/image.png", {
 *   crossOrigin: "anonymous",
 *   decoding: "async",
 * });
 * ```
 */
export function loadImage(src: string, options: LoadImageOptions = {}): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if ( !isUndefined(options.crossOrigin) ) {
      img.crossOrigin = options.crossOrigin;
    }

    if ( !isUndefined(options.decoding) ) {
      img.decoding = options.decoding;
    }

    img.onload = () => resolve(img);
    img.onerror = (e: unknown) => reject(e);
    img.src = src;
  });
}
