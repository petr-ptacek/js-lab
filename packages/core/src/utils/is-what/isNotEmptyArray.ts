import { isArray } from "./isArray";

export function isNotEmptyArray<T = unknown>(value: unknown): value is [T, ...T[]] {
  return isArray(value) && value.length > 0;
}
