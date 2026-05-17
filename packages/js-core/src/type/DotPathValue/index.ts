import type { DotPathKeys } from "../DotPathKeys";

/**
 * Resolves the type of the value at a given dot-separated path `P` in a plain object type `T`.
 *
 * The second type parameter accepts `DotPathKeys<T>` for full type safety and autocomplete,
 * or `string & {}` for runtime-generated paths that are not statically known.
 * Optional fields are unwrapped via `NonNullable` during traversal so the resolved type
 * reflects the actual value type rather than `T[K] | undefined`.
 *
 * @example
 * ```ts
 * type Config = {
 *   host: string;
 *   db: { port: number; name: string };
 * };
 *
 * type A = DotPathValue<Config, "host">;     // string
 * type B = DotPathValue<Config, "db.port">;  // number
 * ```
 *
 * @since 2.0.0
 */
export type DotPathValue<T, P extends DotPathKeys<T> | (string & {})> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? DotPathValue<NonNullable<T[K]>, Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;
