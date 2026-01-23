/**
 * Returns a random integer within the given inclusive range.
 *
 * The returned value is always an integer between `from` and `to`,
 * including both boundary values.
 *
 * @param from - Lower bound (inclusive). Defaults to `0`.
 * @param to - Upper bound (inclusive). Defaults to `Number.MAX_SAFE_INTEGER`.
 *
 * @returns A random integer between `from` and `to` (inclusive).
 *
 * @throws Error If `from` is greater than `to`.
 *
 * @example
 * ```ts
 * getRandomNumber(0, 20) // → 0, 5, 20, ...
 * ```
 *
 * @example
 * ```ts
 * getRandomNumber(5, 5) // → 5
 * ```
 *
 * @example
 * ```ts
 * getRandomNumber(-10, 10)
 * ```
 */
export function getRandomNumber(from = 0, to = Number.MAX_SAFE_INTEGER) {
  if (from > to) throw new Error(`getRandomNumber: from: (${from}) must be <= (${to})`);

  return Math.floor(Math.random() * (to - from + 1)) + from;
}
