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

export function zipArray<T, U, R>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
  mapper?: (a: T, b: U) => R,
) {
  const length = Math.min(arrayOne.length, arrayTwo.length);
  const result: unknown[] = [];

  for ( let i = 0; i < length; i++ ) {
    const a = arrayOne[i]!;
    const b = arrayTwo[i]!;

    result.push(
      isFunction(mapper) ? mapper(a, b) : [a, b],
    );
  }

  return result;
}
