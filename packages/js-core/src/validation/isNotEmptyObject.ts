import { isPlainObject } from "./isPlainObject";

/**
 * Checks whether a value is a non-empty plain object.
 *
 * Returns `true` only if the value is a plain object
 * and has at least one own enumerable property.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a non-empty plain object,
 * otherwise `false`.
 *
 * @example
 * ```ts
 * isNotEmptyObject({ a: 1 }); // true
 * isNotEmptyObject({});      // false
 * isNotEmptyObject([]);      // false
 * isNotEmptyObject(null);    // false
 * ```
 */
export function isNotEmptyObject(value: unknown): value is Record<string, unknown> {
  if ( !isPlainObject(value) ) {
    return false;
  }

  return Object.keys(value).length > 0;
}
