import { isPlainObject } from "./isPlainObject";

/**
 * Checks whether a value is an empty plain object.
 *
 * Returns `true` only if the value is a plain object
 * and has no own enumerable properties.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is an empty plain object,
 * otherwise `false`.
 *
 * @example
 * ```ts
 * isEmptyObject({});                 // true
 * isEmptyObject(Object.create(null)) // true
 *
 * isEmptyObject({ a: 1 });           // false
 * isEmptyObject([]);                 // false
 * isEmptyObject(null);               // false
 * ```
 */
export function isEmptyObject(value: unknown): value is Record<string, never> {
  if ( !isPlainObject(value) ) {
    return false;
  }

  return Object.keys(value).length === 0;
}
