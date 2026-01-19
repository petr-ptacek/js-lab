/**
 * Checks whether the given value is `undefined`.
 *
 * Acts as a type guard and narrows the value to `undefined` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * isUndefined(undefined); // true
 * isUndefined(null);      // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = undefined;
 *
 * if (isUndefined(value)) {
 *   // value is undefined
 * }
 * ```
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}
