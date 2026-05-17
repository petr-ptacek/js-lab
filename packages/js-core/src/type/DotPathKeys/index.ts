type IsPrimitive<T> = T extends string | number | boolean | symbol | bigint | null | undefined ? true : false;

type IsPlainObject<T> =
  IsPrimitive<T> extends true
    ? false
    : T extends
          | readonly any[]
          | ((...args: any[]) => any)
          | Date
          | RegExp
          | Map<any, any>
          | Set<any>
          | WeakMap<any, any>
          | WeakSet<any>
          | Promise<any>
          | Error
      ? false
      : T extends object
        ? true
        : false;

/**
 * Generates a union of all valid dot-separated key paths for a plain object type.
 *
 * Only traverses plain objects — arrays, `Date`, `RegExp`, `Map`, `Set`, functions, and other
 * built-in object types are treated as leaves and are not recursed into.
 * Optional fields are handled via `NonNullable` so paths through `T[K] | undefined` resolve correctly.
 *
 * @example
 * ```ts
 * type Config = {
 *   host: string;
 *   db: {
 *     port: number;
 *     name: string;
 *   };
 * };
 *
 * type Paths = DotPathKeys<Config>;
 * // "host" | "db" | "db.port" | "db.name"
 * ```
 *
 * @since 2.0.0
 */
export type DotPathKeys<T> =
  IsPlainObject<T> extends true
    ? {
        [K in keyof T & string]: IsPlainObject<NonNullable<T[K]>> extends true
          ? K | `${K}.${DotPathKeys<NonNullable<T[K]>>}`
          : K;
      }[keyof T & string]
    : never;
