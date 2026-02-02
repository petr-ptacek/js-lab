export function range(stop: number): number[];
export function range(start: number, stop: number): number[];
export function range(start: number, stop: number, step: number): number[];

/**
 * Creates an array of numbers following the same semantics as Python's `range`.
 *
 * @param start - Start of the range (inclusive), or `stop` if only one argument is provided.
 * @param stop - End of the range (exclusive).
 * @param step - Step value. Defaults to `1`.
 *
 * @throws Error If `step` is `0`.
 *
 * @returns An array of numbers representing the generated range.
 *
 * @since 1.0.0
 *
 * @example
 * range(5)            // [0, 1, 2, 3, 4]
 * range(2, 6)         // [2, 3, 4, 5]
 * range(0, 10, 2)     // [0, 2, 4, 6, 8]
 * range(5, 0, -1)     // [5, 4, 3, 2, 1]
 * range(0)            // []
 */
export function range(
  start: number,
  stop?: number,
  step: number = 1,
): number[] {
  const result: number[] = [];

  const startValue = stop === undefined ? 0 : start;
  const endValue = stop === undefined ? start : stop;

  if (step === 0) {
    throw new Error("range: step must not be 0");
  }

  const isForward = step > 0;

  if (isForward) {
    for (let i = startValue; i < endValue; i += step) {
      result.push(i);
    }
  } else {
    for (let i = startValue; i > endValue; i += step) {
      result.push(i);
    }
  }

  return result;
}
