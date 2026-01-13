import { isDate } from "./isDate";

export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !Number.isNaN(value.getTime());
}
