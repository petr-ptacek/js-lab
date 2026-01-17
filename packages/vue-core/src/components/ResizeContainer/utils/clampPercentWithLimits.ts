import { clamp, isUndefined, toPercentage } from "@petr-ptacek/js-core";

import type { SizeValue } from "../types";
import { sizeValueToPx }  from "./sizeValueToPx";

export function clampPercentWithLimits(
  percent: number,
  containerSize: number,
  options: {
    minSize?: SizeValue;
    maxSize?: SizeValue;
  },
): number {
  let value = clamp(percent, 0, 100);

  if ( !containerSize || containerSize <= 0 ) {
    return value;
  }

  if ( !isUndefined(options.minSize) ) {
    const minPx = sizeValueToPx(options.minSize, containerSize);
    const minPercent = toPercentage(minPx, containerSize);
    value = Math.max(value, minPercent);
  }

  if ( !isUndefined(options.maxSize) ) {
    const maxPx = sizeValueToPx(options.maxSize, containerSize);
    const maxPercent = toPercentage(maxPx, containerSize);
    value = Math.min(value, maxPercent);
  }

  return clamp(value, 0, 100);
}
