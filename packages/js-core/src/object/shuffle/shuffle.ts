/**
 * Returns a new array with elements shuffled in random order.
 *
 * Uses the Fisher–Yates shuffle algorithm.
 * The original array is not mutated.
 *
 * @param array - The array to shuffle.
 * @returns A new array with elements in random order.
 *
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle/ Fisher–Yates shuffle}
 *
 * @since 1.0.0
 *
 * @example
 * shuffle([1, 2, 3])
 * // → e.g. [2, 1, 3]
 */
export function shuffle<T = unknown>(array: readonly T[]): T[] {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }

  return result;
}
