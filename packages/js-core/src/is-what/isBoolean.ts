/**
 * Checks whether the given value is a `boolean`.
 *
 * Acts as a type guard and narrows the value to `boolean` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is a boolean, otherwise `false`.
 *
 * @example
 * ```ts
 * isBoolean(true);    // true
 * isBoolean(null);     // false
 * isBoolean("10");   // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = 42n;
 *
 * if (isBoolean(value)) {
 *   // logic
 * }
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}
