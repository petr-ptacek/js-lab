export function rangeArray(stop: number): number[];
export function rangeArray(start: number, stop: number, step?: number): number[];

/**
 * Creates an array of numbers following the same semantics as Python's `range`.
 *
 * The generated sequence:
 * - starts at `start` (inclusive)
 * - ends before `stop` (exclusive)
 * - advances by `step`
 *
 * The direction of iteration is determined by the sign of `step`.
 * If the range cannot be iterated in the given direction, an empty array
 * is returned.
 *
 * ---
 *
 * ## Usage
 *
 * ```ts
 * rangeArray(5)            // [0, 1, 2, 3, 4]
 * rangeArray(2, 6)         // [2, 3, 4, 5]
 * rangeArray(0, 10, 2)     // [0, 2, 4, 6, 8]
 * rangeArray(5, 0, -1)     // [5, 4, 3, 2, 1]
 * rangeArray(0)            // []
 * ```
 *
 * ---
 *
 * ## Behavior notes
 *
 * - `start` is inclusive
 * - `stop` is exclusive
 * - `step` must not be `0`
 * - If `step` is positive and `start >= stop`, an empty array is returned
 * - If `step` is negative and `start <= stop`, an empty array is returned
 *
 * ---
 *
 * @overload
 * @param stop End of the range (exclusive). Start defaults to `0`.
 *
 * @overload
 * @param start Start of the range (inclusive).
 * @param stop End of the range (exclusive).
 * @param step Step value. Defaults to `1`.
 *
 * @throws Error If `step` is `0`.
 *
 * @returns An array of numbers representing the generated range.
 */
export function rangeArray(
  start: number,
  stop?: number,
  step: number = 1,
): number[] {
  const result: number[] = [];

  let _start: number;
  let end: number;

  if (stop === undefined) {
    _start = 0;
    end = start;
  } else {
    _start = start;
    end = stop;
  }

  if (step === 0) {
    throw new Error("rangeArray: step must not be 0");
  }

  const isForward = step > 0;

  if (isForward) {
    for (let i = _start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = _start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}
