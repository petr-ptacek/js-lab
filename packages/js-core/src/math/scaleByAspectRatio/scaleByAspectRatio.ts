import { scaleToWidth, scaleToHeight } from "./helpers";
import type { DimensionsTarget } from "./types";
import { assertPositiveFinite } from "../../_helpers_";
import type { Dimensions, RoundValueFn } from "../../types";

export function scaleByAspectRatio(dimensions: Dimensions, target: {
  width: number;
}, round?: RoundValueFn): Dimensions;
export function scaleByAspectRatio(dimensions: Dimensions, target: {
  height: number;
}, round?: RoundValueFn): Dimensions;
/**
 * Scales a dimensions while preserving its aspect ratio.
 *
 * Exactly one target dimension must be provided (`width` or `height`).
 * The opposite dimension is calculated automatically based on the
 * original aspect ratio.
 *
 * @param dimensions - Original dimensions
 * @param target - Target dimension (`width` or `height`)
 * @param round - Optional rounding function (defaults to `Math.round`)
 *
 * @returns A new dimensions scaled by aspect ratio
 *
 * @throws {Error}
 * Throws if:
 * - `dimensions.width` or `dimensions.height` is not a positive finite number
 * - both or neither of `target.width` / `target.height` are provided
 * - target dimension is not a positive finite number
 *
 * @example
 * ```ts
 * scaleByAspectRatio(
 *   { width: 400, height: 300 },
 *   { width: 200 },
 * );
 * // → { width: 200, height: 150 }
 *
 * scaleByAspectRatio(
 *   { width: 400, height: 300 },
 *   { height: 150 },
 * );
 * // → { width: 200, height: 150 }
 * ```
 *
 * @since 1.0.0
 */
export function scaleByAspectRatio(
  dimensions: Dimensions,
  target: DimensionsTarget,
  round: RoundValueFn = Math.round,
): Dimensions {
  assertPositiveFinite("dimensions.width", dimensions.width);
  assertPositiveFinite("dimensions.height", dimensions.height);

  const hasWidth = typeof target.width === "number";
  const hasHeight = typeof target.height === "number";

  if ( hasWidth === hasHeight ) {
    throw new Error(
      "scaleTo requires exactly one of target.width or target.height",
    );
  }

  if ( hasWidth ) {
    assertPositiveFinite("target.width", target.width!);
    return scaleToWidth(dimensions, target.width!, round);
  }

  assertPositiveFinite("target.height", target.height!);
  return scaleToHeight(dimensions, target.height!, round);
}
