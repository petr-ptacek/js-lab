import { clamp, isUndefined, toPercentage } from "@petr-ptacek/vue-core";

import type { SizeValue } from "../types";
import { sizeValueToPx }  from "./sizeValueToPx.ts";

export type NormalizeSizeOptions = {
  minSize?: SizeValue;
  maxSize?: SizeValue;
}

export function normalizeSizeToPercent(
  value: SizeValue | undefined,
  containerSize: number,
  options: NormalizeSizeOptions = {},
): number {
  if ( !containerSize || containerSize <= 0 ) {
    return 0;
  }

  // baase value - px
  let sizePx = value ? sizeValueToPx(value, containerSize) : containerSize / 2;

  if ( !isUndefined(options.minSize) ) {
    const minPx = sizeValueToPx(options.minSize, containerSize);
    sizePx = Math.max(sizePx, minPx);
  }

  if ( !isUndefined(options.maxSize) ) {
    const maxPx = sizeValueToPx(options.maxSize, containerSize);
    sizePx = Math.min(sizePx, maxPx);
  }

  sizePx = clamp(sizePx, 0, containerSize);

  // convert to percent
  const percent = toPercentage(sizePx, containerSize);

  return clamp(percent, 0, 100);
}
