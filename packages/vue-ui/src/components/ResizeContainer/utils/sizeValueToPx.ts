import { isNumber, isString } from "@petr-ptacek/vue-core";

import type { SizeValue } from "../types";

export function sizeValueToPx(value: SizeValue, containerSize: number): number {
  if (isNumber(value)) {
    return value as number;
  }

  if (_isString(value)) {
    const percent = parseFloat(value as string);
    return (percent / 100) * containerSize;
  }

  if (_isString(value)) {
    return parseFloat(value as string);
  }

  return 0;
}

function _isString(value: SizeValue | string): value is string {
  return isString(value) && (value as string).endsWith("px");
}
