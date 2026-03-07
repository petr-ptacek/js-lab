import type { Path } from "../get/types";

/**
 * Checks whether a nested path exists in an object using own-property existence checks.
 *
 * Each segment of the dot-separated path is tested with {@link Object.hasOwn},
 * not by inspecting the value. A key explicitly set to `undefined` is therefore
 * considered **existing**.
 *
 * The path is strongly typed and validated at compile time.
 * Supports nested objects and arrays via numeric indices.
 *
 * @param obj - The object to check.
 * @param path - Dot-separated path to check.
 *
 * @returns `true` if every key in the path exists as an own property, `false` otherwise.
 *
 * @remarks
 * Existence is determined by {@link Object.hasOwn}, not by value.
 * A key set to `undefined`, `null`, `0`, `false`, or `""` all return `true`.
 * A key that is not present on the object returns `false`.
 *
 * @example
 * ```ts
 * const obj = {
 *   user: {
 *     name: "John",
 *     age: 0,
 *     active: false,
 *     nickname: null,
 *     note: undefined,
 *   },
 * };
 *
 * has(obj, "user.name");
 * // → true
 *
 * has(obj, "user.note");
 * // → true  (key exists even though value is undefined)
 *
 * has(obj, "user.email" as any);
 * // → false  (key does not exist)
 * ```
 *
 * @since 1.0.0
 */
export function has<T extends object, P extends Path<T>>(
  obj: T,
  path: P,
): boolean {
  const keys = (path as string).split(".");
  let current: unknown = obj;

  for ( const key of keys ) {
    if ( current === null || typeof current !== "object" ) return false;
    if ( !Object.hasOwn(current as object, key) ) return false;
    current = (current as Record<string, unknown>)[key];
  }

  return true;
}

