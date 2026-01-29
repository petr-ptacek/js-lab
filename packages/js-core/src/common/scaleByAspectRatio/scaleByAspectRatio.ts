import { scaleToWidth, scaleToHeight } from "./helpers";
import type { Size, RoundFn, ScaleTarget } from "./types";
import { assertPositiveFinite } from "../../_helpers_";

export function scaleByAspectRatio(size: Size, target: { width: number; }, round?: RoundFn): Size;
export function scaleByAspectRatio(size: Size, target: { height: number; }, round?: RoundFn): Size;
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
