/**
 * Checks whether the given value is `NaN` (Not-a-Number).
 *
 * Acts as a type guard and narrows the value to `number` when true.
 * This function only returns `true` for the numeric `NaN` value.
 *
 * @param value The value to test.
 * @returns `true` if the value is `NaN`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNaNNumber(NaN);        // true
 * isNaNNumber("NaN");     // false
 * isNaNNumber(undefined); // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = NaN;
 *
 * if (isNaNNumber(value)) {
 *   // value is number (NaN)
 * }
 * ```
 */
export function isNaNNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isNaN(value);
}
