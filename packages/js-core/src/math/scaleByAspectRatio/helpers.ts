import { assertPositiveFinite }          from "../../_helpers_";
import type { Dimensions, RoundValueFn } from "../../types";
import { getAspectRatio }                from "../getAspectRatio";

export function scaleToWidth(
  dimensions: Dimensions,
  newWidth: number,
  round: RoundValueFn = Math.round,
): Dimensions {
  assertPositiveFinite("dimensions.width", dimensions.width);
  assertPositiveFinite("dimensions.height", dimensions.height);
  assertPositiveFinite("newWidth", newWidth);

  const ratio = getAspectRatio(dimensions.width, dimensions.height);
  const newHeight = newWidth / ratio;

  return {
    width: round(newWidth),
    height: round(newHeight),
  };
}

export function scaleToHeight(
  dimensions: Dimensions,
  newHeight: number,
  round: RoundValueFn = Math.round,
): Dimensions {
  assertPositiveFinite("dimensions.width", dimensions.width);
  assertPositiveFinite("dimensions.height", dimensions.height);
  assertPositiveFinite("newHeight", newHeight);

  const ratio = getAspectRatio(dimensions.width, dimensions.height);
  const newWidth = newHeight * ratio;

  return {
    width: round(newWidth),
    height: round(newHeight),
  };
}
