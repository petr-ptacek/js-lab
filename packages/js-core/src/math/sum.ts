/**
 * Calculates the sum of all provided numbers.
 *
 * @param numbers A list of numbers to sum.
 * @returns The sum of all provided numbers. Returns `0` if no numbers are given.
 *
 * @example
 * ```ts
 * sum(1, 2, 3); // 6
 * sum();        // 0
 * ```
 */
export function sum(...numbers: number[]): number {
  return numbers.reduce((acc, number) => acc + number, 0);
}
