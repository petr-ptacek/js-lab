import { isPlainObject } from "../../validation";
import type { DotPathKeys, DotPathValue } from "../../type";

export function get<T extends object, P extends DotPathKeys<T>>(obj: T, path: P): DotPathValue<T, P> | undefined;

export function get<T extends object, P extends DotPathKeys<T>, D>(
  obj: T,
  path: P,
  defaultValue: D
): Exclude<DotPathValue<T, P>, undefined> | D;

/**
 * Safely gets a nested value from a plain object using a dot-separated path.
 *
 * The path is strongly typed — only valid keys of the object (and its nested plain objects)
 * are accepted. Arrays, `Date`, `Map`, and other non-plain-object values are treated as leaves
 * and cannot be traversed further.
 *
 * If the resolved value is `undefined`, the provided default value is returned instead.
 *
 * @param obj - The plain object to read from.
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
 *     address: { city: "Prague" },
 *   },
 * };
 *
 * get(obj, "user.name");
 * // → "John"
 *
 * get(obj, "user.address.city");
 * // → "Prague"
 *
 * get(obj, "user.age", 30);
 * // → 30
 * ```
 *
 * @since 1.0.0
 */
export function get(obj: object, path: string, defaultValue?: unknown) {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (!isPlainObject(acc)) return undefined;
    return acc[key];
  }, obj);

  return typeof result === "undefined" ? defaultValue : result;
}
