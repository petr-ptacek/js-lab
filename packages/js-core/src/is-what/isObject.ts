import { isNull } from "./isNull";

/**
 * Checks whether the given value is an object.
 *
 * Acts as a type guard and narrows the value to `Record<string, unknown>` when true.
 *
 * Note: This function returns `true` for plain objects, arrays, and other
 * non-null objects (e.g. `Date`, `Map`).
 *
 * @param value The value to test.
 * @returns `true` if the value is a non-null object, otherwise `false`.
 *
 * @example
 * ```ts
 * isObject({});        // true
 * isObject([]);        // true
 * isObject(null);      // false
 * isObject("text");   // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = { a: 1 };
 *
 * if (isObject(value)) {
 *   value["a"];
 * }
 * ```
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && !isNull(value);
}
