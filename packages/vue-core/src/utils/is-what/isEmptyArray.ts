import { isArray } from "./isArray";

export function isEmptyArray<T = unknown>(value: unknown): value is T[] {
  return isArray(value) && value.length === 0;
}
