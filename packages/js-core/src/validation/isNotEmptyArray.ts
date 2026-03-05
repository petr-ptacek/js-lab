import { isArray } from "./isArray";

/**
 * Checks whether the given value is a non-empty array.
 *
 * Acts as a type guard and narrows the value to a tuple type
 * with at least one element (`[T, ...T[]]`) when true.
 *
 * @template T Type of array elements.
 * @param value The value to test.
 * @returns `true` if the value is an array with at least one element,
 * otherwise `false`.
 *
 * @example
 * ```ts
 * isNotEmptyArray([1]);        // true
 * isNotEmptyArray([]);         // false
 * isNotEmptyArray("text");     // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = ["a", "b"];
 *
 * if (isNotEmptyArray<string>(value)) {
 *   const first = value[0]; // always defined
 * }
 * ```
 */
export function isNotEmptyArray<T = unknown>(value: unknown): value is [T, ...T[]] {
  return isArray(value) && value.length > 0;
}
