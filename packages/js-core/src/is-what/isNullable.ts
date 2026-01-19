import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

/**
 * Checks whether the given value is `null` or `undefined`.
 *
 * Acts as a type guard and narrows the value to `null | undefined` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is `null` or `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNullable(null);        // true
 * isNullable(undefined);   // true
 * isNullable(0);           // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = undefined;
 *
 * if (isNullable(value)) {
 *   // value is null | undefined
 * }
 * ```
 */
export function isNullable(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
