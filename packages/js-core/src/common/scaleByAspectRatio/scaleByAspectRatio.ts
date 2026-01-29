import { scaleToWidth, scaleToHeight } from "./helpers";
import type { Size, RoundFn, ScaleTarget } from "./types";
import { assertPositiveFinite } from "../../_helpers_";

export function scaleByAspectRatio(size: Size, target: { width: number; }, round?: RoundFn): Size;
export function scaleByAspectRatio(size: Size, target: { height: number; }, round?: RoundFn): Size;
/**
 * Scales a size while preserving its aspect ratio.
 *
 * Exactly one target dimension must be provided (`width` or `height`).
 * The opposite dimension is calculated automatically based on the
 * original aspect ratio.
 *
 * @param size - Original size
 * @param target - Target dimension (`width` or `height`)
 * @param round - Optional rounding function (defaults to `Math.round`)
 *
 * @returns A new size scaled by aspect ratio
 *
 * @throws {Error}
 * Throws if:
 * - `size.width` or `size.height` is not a positive finite number
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
 */
export function scaleByAspectRatio(
  size: Size,
  target: ScaleTarget,
  round: RoundFn = Math.round,
): Size {
  assertPositiveFinite("size.width", size.width);
  assertPositiveFinite("size.height", size.height);

  const hasWidth = typeof target.width === "number";
  const hasHeight = typeof target.height === "number";

  if (hasWidth === hasHeight) {
    throw new Error(
      "scaleTo requires exactly one of target.width or target.height",
    );
  }

  if (hasWidth) {
    assertPositiveFinite("target.width", target.width!);
    return scaleToWidth(size, target.width!, round);
  }

  assertPositiveFinite("target.height", target.height!);
  return scaleToHeight(size, target.height!, round);
}
