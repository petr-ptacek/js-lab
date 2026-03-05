/**
 * Checks whether the given value is a string.
 *
 * Acts as a type guard and narrows the value to `string` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is of type `string`, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isString("text");   // true
 * isString(123);      // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = "hello";
 *
 * if (isString(value)) {
 *   value.toUpperCase();
 * }
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
