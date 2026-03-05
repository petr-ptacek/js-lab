/**
 * Converts a numeric value to a percentage relative to a given base.
 *
 * @param {number} value - The value to convert into a percentage.
 * @param {number} base - The base value representing 100%. Must not be 0.
 * @returns {number} The calculated percentage value.
 *
 * @throws {Error} Throws an error if `base` is 0.
 *
 * @since 1.0.0
 *
 * @example
 * toPercentage(1, 4); // 25
 * toPercentage(2, 4); // 50
 * toPercentage(3, 4); // 75
 * toPercentage(4, 4); // 100
 */
export function toPercentage(value: number, base: number): number {
  if (base === 0) {
    throw new Error("toPercentage: base must not be 0");
  }

  return (value / base) * 100;
}
