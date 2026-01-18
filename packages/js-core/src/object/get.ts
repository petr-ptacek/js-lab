import { isArray, isObject }   from "../is-what";
import type { PrimitiveValue } from "../types";

export type Path<T> =
  T extends PrimitiveValue
  ? never
  : T extends readonly (infer U)[]
    ? `${number}` | `${number}.${Path<U>}`
    : {
      [K in keyof T & string]:
      T[K] extends PrimitiveValue
      ? K
      : K | `${K}.${Path<T[K]>}`;
    }[keyof T & string];

type PathValue<T, P extends string> =
  T extends readonly (infer U)[]
  ? P extends `${number}.${infer Rest}`
    ? PathValue<U, Rest>
    : P extends `${number}`
      ? U
      : never
  : P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

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
 * If the resolved value is `undefined`, the provided default value is returned instead.
 *
 * Supports:
 * - nested objects
 * - arrays via numeric indices
 *
 * @typeParam T - Object type
 * @typeParam P - Valid path into the object
 * @typeParam D - Default value type
 *
 * @param obj - The object to read from
 * @param path - Dot-separated path to the value
 * @param defaultValue - Optional default value returned when the path resolves to `undefined`
 *
 * @returns
 * - The resolved value at the given path
 * - `undefined` if the path does not exist and no default value is provided
 * - The default value if provided and the resolved value is `undefined`
 *
 * @example
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
 */
export function get(obj: object, path: string, defaultValue?: unknown) {
  function isIndex(key: string): boolean {
    return key !== "" && !Number.isNaN(Number(key));
  }

  const result = path
    .split(".")
    .reduce<unknown>(
      (acc, key) => {
        if ( !isObject(acc) || !(key in acc) ) {
          return undefined;
        }

        if ( isArray(acc) ) {
          if ( !isIndex(key) ) {
            return undefined;
          }

          return acc[Number(key)];
        }

        if ( !(key in acc) ) {
          return undefined;
        }

        return (acc as Record<string, unknown>)[key];
      },
      obj,
    );

  return typeof result === "undefined" ? defaultValue : result;
}
