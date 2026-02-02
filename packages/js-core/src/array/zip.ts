import { isFunction } from "../is-what";

export function zip<T, U>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
): [T, U][];

export function zip<T, U, R>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
  mapper: (a: T, b: U) => R,
): R[];

/**
 * Zips two arrays element-wise.
 *
 * The resulting array length is determined by the shorter input array.
 * The input arrays are not mutated.
 *
 * @param arrayOne - First array.
 * @param arrayTwo - Second array.
 * @param mapper - Optional function to transform each pair.
 *
 * @returns A new array containing paired or mapped values.
 *
 * @since 1.0.0
 *
 * @example
 * zip([1, 2], ["a", "b"])
 * // → [[1, "a"], [2, "b"]]
 *
 * @example
 * zip([1, 2], [10, 20], (a, b) => a + b)
 * // → [11, 22]
 */
export function zip<T, U, R>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
  mapper?: (a: T, b: U) => R,
): [T, U][] | R[] {
  const length = Math.min(arrayOne.length, arrayTwo.length);

  if (isFunction(mapper)) {
    const result: R[] = [];

    for (let i = 0; i < length; i++) {
      result.push(mapper(arrayOne[i]!, arrayTwo[i]!));
    }

    return result;
  }

  const result: [T, U][] = [];

  for (let i = 0; i < length; i++) {
    result.push([arrayOne[i]!, arrayTwo[i]!]);
  }

  return result;
}
