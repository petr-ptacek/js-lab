import { isDate }      from "./isDate";
import { isNaNNumber } from "./isNaNNumber";

export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !isNaNNumber(value.getTime());
}
