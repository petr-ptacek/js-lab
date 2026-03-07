/**
 * Checks whether the given value is a finite number.
 *
 * Acts as a type guard and narrows the value to `number` when true.
 * This excludes `NaN`, `Infinity`, and `-Infinity`.
 *
 * @param value The value to test.
 * @returns `true` if the value is a finite number, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isFiniteNumber(42);        // true
 * isFiniteNumber(NaN);       // false
 * isFiniteNumber(Infinity);  // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = 3.14;
 *
 * if (isFiniteNumber(value)) {
 *   value * 2;
 * }
 * ```
 */
export function isFiniteNumber(value: unknown): value is number {
  return Number.isFinite(value);
}

