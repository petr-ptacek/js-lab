import { isFunction } from "../is-what";

export function zipArray<T, U>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
): Array<[T, U]>;

export function zipArray<T, U, R>(
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
 * @typeParam T Type of elements in the first array.
 * @typeParam U Type of elements in the second array.
 * @typeParam R Result type produced by the mapper.
 *
 * @param arrayOne First array.
 * @param arrayTwo Second array.
 * @param mapper Optional function to transform each pair.
 *
 * @example
 * ```ts
 * zipArray([1, 2], ["a", "b"]);
 * // → [[1, "a"], [2, "b"]]
 * ```
 *
 * @example
 * ```ts
 * zipArray([1, 2], [10, 20], (a, b) => a + b);
 * // → [11, 22]
 * ```
 */
export function zipArray<T, U, R>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
  mapper?: (a: T, b: U) => R,
): Array<[T, U]> | R[] {
  const length = Math.min(arrayOne.length, arrayTwo.length);
  const result: Array<[T, U]> | R[] = [];

  for ( let i = 0; i < length; i++ ) {
    const a = arrayOne[i]!;
    const b = arrayTwo[i]!;

    (result as unknown[]).push(
      isFunction(mapper) ? mapper(a, b) : [a, b],
    );
  }

  return result;
}
