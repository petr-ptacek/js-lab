import { isNumber, isString } from "@petr-ptacek/vue-core";

import type { SizeValue }     from "../types";

export function sizeValueToPx(value: SizeValue, containerSize: number): number {
  if ( isNumber(value) ) {
    return value;
  }

  if ( isString(value) && value.endsWith("%") ) {
    const percent = parseFloat(value);
    return (percent / 100) * containerSize;
  }

  if ( isString(value) && value.endsWith("px") ) {
    return parseFloat(value);
  }

  return 0;
}
