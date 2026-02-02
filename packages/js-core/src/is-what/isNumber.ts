/**
 * Checks whether the given value is a number.
 *
 * Acts as a type guard and narrows the value to `number` when true.
 * This includes `NaN`, `Infinity`, and `-Infinity`.
 *
 * @param value The value to test.
 * @returns `true` if the value is of type `number`, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isNumber(42);        // true
 * isNumber(NaN);       // true
 * isNumber(Infinity);  // true
 * isNumber("42");      // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = 3.14;
 *
 * if (isNumber(value)) {
 *   value.toFixed(2);
 * }
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
