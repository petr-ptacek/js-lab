import { isArray } from "./isArray";

/**
 * Checks whether the given value is an empty array.
 *
 * Acts as a type guard and narrows the value to an empty array of type `T[]`
 * when true.
 *
 * @template T Type of array elements.
 * @param value The value to test.
 * @returns `true` if the value is an array with zero length, otherwise `false`.
 *
 * @example
 * ```ts
 * isEmptyArray([]);        // true
 * isEmptyArray([1, 2]);   // false
 * isEmptyArray("text");   // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = [];
 *
 * if (isEmptyArray<string>(value)) {
 *   value.length; // 0
 * }
 * ```
 */
export function isEmptyArray<T = unknown>(value: unknown): value is T[] {
  return isArray(value) && value.length === 0;
}
