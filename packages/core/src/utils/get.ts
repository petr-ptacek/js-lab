import type { PrimitiveValue } from "../types";
import { isArray, isObject }   from "./is-what";

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

// bez defaultu
export function get<
  T extends object,
  P extends Path<T>
>(
  obj: T,
  path: P,
): PathValue<T, P> | undefined;
// s defaultem
export function get<
  T extends object,
  P extends Path<T>,
  D
>(
  obj: T,
  path: P,
  defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D;
export function get(obj: object, path: string, defaultValue?: unknown) {
  const result = path
    .split(".")
    .reduce<unknown>(
      (acc, key) => {
        if ( !isObject(acc) || !(key in acc) ) {
          return undefined;
        }

        if ( isArray(acc) ) {
          if ( isIndex(key) ) {
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


/* Helpers */

function isIndex(key: string): boolean {
  return key !== "" && !Number.isNaN(Number(key));
}
