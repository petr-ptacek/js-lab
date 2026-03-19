import { isArray } from "../isArray";
import { isNull } from "../isNull";

/**
 * Checks whether the given value is a plain object.
 *
 * Acts as a type guard and narrows the value to `Record<string, unknown>` when true.
 *
 * Note: This function returns `false` for arrays, `null`, and built-in objects
 * like `Date`, `Map`, or class instances.
 *
 * @param value The value to test.
 * @returns `true` if the value is a plain object, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isPlainObject({});        // true
 * isPlainObject({ a: 1 });  // true
 * isPlainObject([]);        // false
 * isPlainObject(null);      // false
 * isPlainObject(new Date()); // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = { user: "john" };
 *
 * if (isPlainObject(value)) {
 *   value.user;
 * }
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || isNull(value) || isArray(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

