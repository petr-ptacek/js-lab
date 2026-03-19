/**
 * Checks whether the given value is an array.
 *
 * Acts as a type guard and narrows the value to `T[]` when true.
 *
 * @template T Type of array elements.
 * @param value The value to test.
 * @returns `true` if the value is an array, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isArray([1, 2, 3]); // true
 * isArray("text");   // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = ["a", "b"];
 *
 * if (isArray<string>(value)) {
 *   value.map(v => v.toUpperCase());
 * }
 * ```
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}
