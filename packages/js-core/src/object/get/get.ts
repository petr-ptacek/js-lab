import type { Path, PathValue } from "./types";
import { isArray, isObject }    from "../../validation";

export function get<
  T extends object,
  P extends Path<T>
>(
  obj: T,
  path: P,
): PathValue<T, P> | undefined;

export function get<
  T extends object,
  P extends Path<T>,
  D
>(
  obj: T,
  path: P,
  defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D;

/**
 * Safely gets a nested value from an object using a dot-separated path.
 *
 * The path is strongly typed and validated at compile time.
 * Supports nested objects and arrays via numeric indices.
 *
 * If the resolved value is `undefined`, the provided default value
 * is returned instead.
 *
 * @param obj - The object to read from.
 * @param path - Dot-separated path to the value.
 * @param defaultValue - Value returned when the resolved value is `undefined`.
 *
 * @returns The resolved value, the default value, or `undefined`.
 *
 * @remarks
 * The default value is only used when the resolved value is `undefined`.
 * If the resolved value is `null`, it is returned as-is.
 *
 * @example
 * ```ts
 * const obj = {
 *   user: {
 *     name: "John",
 *     roles: ["admin", "editor"],
 *   },
 * };
 *
 * get(obj, "user.name");
 * // → "John"
 *
 * get(obj, "user.roles.0");
 * // → "admin"
 *
 * get(obj, "user.age", 30);
 * // → 30
 * ```
 *
 * @since 1.0.0
 */
export function get(obj: object, path: string, defaultValue?: unknown) {
  const result = path
    .split(".")
    .reduce<unknown>((acc, key) => {
      if ( acc == null ) return undefined;

      if ( isArray(acc) ) {
        const index = Number(key);
        return Number.isInteger(index) ? acc[index] : undefined;
      }

      if ( isObject(acc) ) {
        return (acc as Record<string, unknown>)[key];
      }

      return undefined;
    }, obj);

  return typeof result === "undefined" ? defaultValue : result;
}
