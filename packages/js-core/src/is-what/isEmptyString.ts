import { isString } from "./isString";

/**
 * Checks whether the given value is an empty string.
 *
 * Acts as a type guard and narrows the value to `string` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is a string with zero length, otherwise `false`.
 *
 * @example
 * ```ts
 * isEmptyString("");        // true
 * isEmptyString("text");    // false
 * isEmptyString(123);       // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = "";
 *
 * if (isEmptyString(value)) {
 *   value.length; // 0
 * }
 * ```
 */
export function isEmptyString(value: unknown): value is string {
  return isString(value) && value.length === 0;
}
