/**
 * Checks whether the given value is a `bigint`.
 *
 * Acts as a type guard and narrows the value to `bigint` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is a bigint, otherwise `false`.
 *
 * @example
 * ```ts
 * isBigint(10n);    // true
 * isBigint(10);     // false
 * isBigint("10");   // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = 42n;
 *
 * if (isBigint(value)) {
 *   value + 1n;
 * }
 * ```
 */
export function isBigint(value: unknown): value is bigint {
  return typeof value === "bigint";
}
