import type { ShrinkImageOptions } from "./types";
import { assertPositiveFinite } from "../../_helpers_";
import { isNumber } from "../../is-what";
import { scaleByAspectRatio } from "../../math";
import type { Dimensions } from "../../types";

const DEFAULT_QUALITY = 0.8;
const DEFAULT_MIME_TYPE = "image/jpeg";

/**
 * Shrinks an image by limiting its maximum dimensions and optionally reducing
 * output quality.
 *
 * This utility is intended for **front-end pre-upload optimization**.
 * Its primary responsibility is to **reduce image dimensions** while preserving
 * the original aspect ratio. As a side effect, this also reduces the file size.
 *
 * The function operates on an `HTMLImageElement`, renders it into a canvas,
 * and exports the result as a `Blob`.
 *
 * This is **not a generic image compression utility**. Dimension limiting
 * is always the main mechanism; quality-based compression is secondary.
 *
 * @param image - Source image. Must have valid `naturalWidth` and `naturalHeight`.
 * @param options - Shrinking options such as maximum dimensions and output quality.
 *
 * @returns A `Promise` that resolves to a `Blob` containing the resized image.
 *
 * @throws
 * Throws if:
 * - the image has invalid natural dimensions
 * - a provided dimension constraint is not a positive finite number
 * - the canvas 2D context is unavailable
 * - the image blob cannot be created
 *
 * @remarks
 * - Aspect ratio is always preserved
 * - The image is only scaled down, never up
 * - The original image element is not mutated
 * - Output format and quality are controlled via `mimeType` and `quality`
 * - When both `maxWidth` and `maxHeight` are provided, the image is scaled
 *   so that **neither dimension exceeds its limit** (fit-inside behavior)
 *
 * @see scaleByAspectRatio
 *
 * @example
 * Shrink an image before upload:
 * ```ts
 * const img = document.querySelector("img")!;
 *
 * const blob = await shrinkImage(img, {
 *   maxWidth: 1600,
 *   maxHeight: 1600,
 * });
 * ```
 *
 * @example
 * Fit image inside a bounding box:
 * ```ts
 * // Original image: 4000 × 3000
 * const blob = await shrinkImage(img, {
 *   maxWidth: 1600,
 *   maxHeight: 1200,
 * });
 *
 * // Resulting dimensions: 1600 × 1200
 * ```
 *
 * @example
 * Control output quality:
 * ```ts
 * const blob = await shrinkImage(img, {
 *   maxWidth: 1200,
 *   quality: 0.75,
 * });
 * ```
 *
 * @example
 * Change output format:
 * ```ts
 * const blob = await shrinkImage(img, {
 *   maxWidth: 1600,
 *   mimeType: "image/webp",
 * });
 * ```
 *
 * @example
 * No resizing when image already fits constraints:
 * ```ts
 * await shrinkImage(img, { maxWidth: 4000 });
 * // image dimensions remain unchanged
 * ```
 *
 * @since 1.0.0
 */
export function shrinkImage(
  image: HTMLImageElement,
  options: ShrinkImageOptions = {},
): Promise<Blob> {
  assertPositiveFinite("image.naturalWidth", image.naturalWidth);
  assertPositiveFinite("image.naturalHeight", image.naturalHeight);

  const {
    maxWidth,
    maxHeight,
    quality = DEFAULT_QUALITY,
    mimeType = DEFAULT_MIME_TYPE,
  } = options;

  let target: Dimensions = {
    width: image.naturalWidth,
    height: image.naturalHeight,
  };

  if (isNumber(maxWidth) && target.width > maxWidth) {
    assertPositiveFinite("options.maxWidth", maxWidth);
    target = scaleByAspectRatio(target, { width: maxWidth });
  }

  if (isNumber(maxHeight) && target.height > maxHeight) {
    assertPositiveFinite("options.maxHeight", maxHeight);
    target = scaleByAspectRatio(target, { height: maxHeight });
  }

  const canvas = document.createElement("canvas");
  canvas.width = target.width;
  canvas.height = target.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context is not available");
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          reject(new Error("Failed to crete blob"));
          return;
        }

        resolve(blob);
      },
      mimeType,
      quality,
    );
  });
}
