/**
 * Checks whether the given value is `null`.
 *
 * Acts as a type guard and narrows the value to `null` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is `null`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNull(null);       // true
 * isNull(undefined); // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = null;
 *
 * if (isNull(value)) {
 *   // value is null
 * }
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
