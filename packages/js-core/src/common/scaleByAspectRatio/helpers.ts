import { getAspectRatio } from "../getAspectRatio";
import type { RoundFn, Size } from "./types";
import { assertPositiveFinite } from "../../_helpers_";

export function scaleToWidth(
  size: Size,
  newWidth: number,
  round: RoundFn = Math.round,
): Size {
  assertPositiveFinite("size.width", size.width);
  assertPositiveFinite("size.height", size.height);
  assertPositiveFinite("newWidth", newWidth);

  const ratio = getAspectRatio(size.width, size.height);
  const newHeight = newWidth / ratio;

  return {
    width: round(newWidth),
    height: round(newHeight),
  };
}

export function scaleToHeight(
  size: Size,
  newHeight: number,
  round: RoundFn = Math.round,
): Size {
  assertPositiveFinite("size.width", size.width);
  assertPositiveFinite("size.height", size.height);
  assertPositiveFinite("newHeight", newHeight);

  const ratio = getAspectRatio(size.width, size.height);
  const newWidth = newHeight * ratio;

  return {
    width: round(newWidth),
    height: round(newHeight),
  };
}
