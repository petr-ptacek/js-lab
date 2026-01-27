import { isObject } from "./isObject";

/**
 * Checks whether a value is a plain object.
 *
 * A plain object is an object created by `{}` or `new Object()`,
 * or an object with a `null` prototype.
 *
 * This excludes arrays, class instances, and built-in objects
 * such as `Date`, `Map`, or `Set`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a plain object, otherwise `false`.
 *
 * @example
 * ```ts
 * isPlainObject({});                 // true
 * isPlainObject({ a: 1 });           // true
 * isPlainObject(Object.create(null)) // true
 *
 * isPlainObject([]);                 // false
 * isPlainObject(new Date());         // false
 * isPlainObject(null);               // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if ( !isObject(value) ) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || proto === null;
}
