import { isString } from "./isString";

export function isEmptyString(value: unknown): value is "" {
  return isString(value) && value.length === 0;
}
