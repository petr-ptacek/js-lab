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
