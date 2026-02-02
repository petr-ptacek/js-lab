/**
 * Clamps a numeric value between a minimum and maximum boundary.
 *
 * The function assumes `min` and `max` define a valid range.
 * If `min` is greater than `max`, the function throws an error.
 *
 * @param value - The value to clamp.
 * @param min - The lower bound (inclusive).
 * @param max - The upper bound (inclusive).
 *
 * @returns The clamped value within the `[min, max]` range.
 *
 * @throws {Error} If `min` is greater than `max`.
 *
 * @since 1.0.0
 *
 * @example
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(20, 0, 10); // 10
 */
export function clamp(value: number, min: number, max: number) {
  if (min > max) {
    throw new Error("clamp: min must be <= max");
  }

  return Math.min(Math.max(value, min), max);
}
