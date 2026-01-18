/**
 * Shuffles an array using the Fisher–Yates algorithm.
 *
 * The original array is not mutated.
 *
 * @typeParam T - Type of array elements
 * @param array - The array to shuffle
 * @returns A new array with elements in random order
 *
 * @example
 * shuffleArray([1, 2, 3])
 * // → [2, 1, 3]
 */
export function shuffleArray<T = unknown>(array: readonly T[]): T[] {
  const result = [...array];

  for ( let i = result.length - 1; i > 0; i-- ) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j] as T, result[i] as T];
  }

  return result;
}
