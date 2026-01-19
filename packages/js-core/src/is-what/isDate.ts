/**
 * Checks whether the given value is a `Date` instance.
 *
 * Acts as a type guard and narrows the value to `Date` when true.
 *
 * Note: This function does **not** verify whether the date is valid
 * (i.e. `new Date("invalid")` is still a `Date` instance).
 *
 * @param value The value to test.
 * @returns `true` if the value is a `Date` instance, otherwise `false`.
 *
 * @example
 * ```ts
 * isDate(new Date());          // true
 * isDate("2024-01-01");        // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = new Date();
 *
 * if (isDate(value)) {
 *   value.getTime();
 * }
 * ```
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}
