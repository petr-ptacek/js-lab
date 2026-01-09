import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

export function isNullable(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
