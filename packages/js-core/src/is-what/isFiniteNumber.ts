/**
 * Checks whether the given value is a finite number.
 *
 * Acts as a type guard and narrows the value to `number` when true.
 * This excludes `NaN`, `Infinity`, and `-Infinity`.
 *
 * @param value The value to test.
 * @returns `true` if the value is a finite number, otherwise `false`.
 *
 * @example
 * ```ts
 * isFiniteNumber(10);         // true
 * isFiniteNumber(NaN);        // false
 * isFiniteNumber(Infinity);  // false
 * isFiniteNumber("10");      // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = 42;
 *
 * if (isFiniteNumber(value)) {
 *   value.toFixed(2);
 * }
 * ```
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
