import { isNumber, isString } from "@petr-ptacek/vue-core";

import type { SizeValue } from "../types";

export function sizeValueToPx(value: SizeValue, containerSize: number): number {
  if ( isNumber(value) ) {
    return value as number;
  }

  /* Size value is Percentage, we must compute percentage */
  if ( isString(value) && (value as string).endsWith("%") ) {
    const percent = parseFloat(value as string);
    return (percent / 100) * containerSize;
  }

  /*Size value is PX */
  if ( isString(value) && (value as string).endsWith("px") ) {
    return parseFloat(value as string);
  }

  return 0;
}
