import { assertPositiveFinite } from "../../_helpers_";
import { scaleByAspectRatio } from "../../math";
import type { Dimensions, DimensionsTarget, RoundValueFn } from "../../types";


export function scaleImageByAspectRatio(
  image: HTMLImageElement,
  { width }: { width: number },
  roundFn?: RoundValueFn,
): HTMLImageElement;
export function scaleImageByAspectRatio(
  image: HTMLImageElement,
  { height }: { height: number },
  roundFn?: RoundValueFn,
): HTMLImageElement;

/**
 * Scales an image to a target width or height while preserving its aspect ratio.
 *
 * Exactly one dimension (`width` or `height`) must be provided.
 * The other dimension is calculated automatically based on the
 * image's natural size.
 *
 * This utility is a thin, DOM-oriented wrapper around `scaleByAspectRatio`
 * that operates directly on `HTMLImageElement` and returns a **new image
 * instance** with updated dimensions.
 *
 * The original image is not mutated.
 *
 * @param image - Source image. Must have valid `naturalWidth` and `naturalHeight`.
 * @param target - Target dimension. Exactly one of `width` or `height` is required.
 * @param roundFn - Optional rounding function applied to the calculated dimension.
 *
 * @returns A new `HTMLImageElement` scaled proportionally to the target dimension.
 *
 * @throws
 * Throws if:
 * - both `width` and `height` are provided
 * - neither `width` nor `height` is provided
 * - image natural dimensions are not positive finite numbers
 *
 * @remarks
 * - Aspect ratio is always preserved
 * - Scaling is synchronous
 * - The returned image shares the same `src` as the original image
 *
 * @see scaleByAspectRatio
 *
 * @example
 * Scale an image to a fixed width:
 * ```ts
 * const img = document.querySelector("img")!;
 *
 * const scaled = scaleImageByAspectRatio(img, { width: 300 });
 *
 * scaled.width;  // 300
 * scaled.height; // calculated automatically
 * ```
 *
 * @example
 * Scale an image to a fixed height:
 * ```ts
 * const scaled = scaleImageByAspectRatio(img, { height: 200 });
 * ```
 *
 * @example
 * Use a custom rounding strategy:
 * ```ts
 * const scaled = scaleImageByAspectRatio(
 *   img,
 *   { width: 300 },
 *   Math.floor,
 * );
 * ```
 *
 * @example
 * Invalid usage (compile-time + runtime protection):
 * ```ts
 * scaleImageByAspectRatio(img, { width: 300, height: 200 });
 * // ❌ throws – exactly one dimension must be provided
 * ```
 *
 * @since 1.0.0
 */
export function scaleImageByAspectRatio(
  image: HTMLImageElement,
  target: DimensionsTarget,
  roundFn?: RoundValueFn,
): HTMLImageElement {
  const hasWidth = typeof target.width === "number";
  const hasHeight = typeof target.height === "number";

  if (hasWidth === hasHeight) {
    throw new Error(
      "scaleImageByAspectRatio requires exactly one of target.width or target.height",
    );
  }

  assertPositiveFinite("image.naturalWidth", image.naturalWidth);
  assertPositiveFinite("image.naturalHeight", image.naturalHeight);

  const dimensions: Dimensions = {
    width: image.naturalWidth,
    height: image.naturalHeight,
  };

  let newDimensions: Dimensions;

  if (hasWidth) {
    assertPositiveFinite("target.width", target.width);
    newDimensions = scaleByAspectRatio(
      dimensions,
      { width: target.width },
      roundFn,
    );
  } else {
    assertPositiveFinite("target.height", target.height);
    newDimensions = scaleByAspectRatio(
      dimensions,
      {
        height: target.height,
      },
      roundFn,
    );
  }

  // Create image
  const result = new Image();
  result.src = image.src;
  result.width = newDimensions.width;
  result.height = newDimensions.height;

  return result;
}
