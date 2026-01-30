/**
 * Represents a dictionary object with arbitrary keys and values.
 *
 * A semantic alias for TypeScript's `Record` utility type.
 *
 * @example
 * ```ts
 * Dict<string>
 * // Record<string, string>
 * ```
 *
 * @example
 * ```ts
 * Dict<number, "a" | "b">
 * // { a: number; b: number }
 * ```
 *
 * @since 1.0.0
 */
export type Dict<TValue = unknown, TKey extends string | number | symbol = string> = Record<TKey, TValue>;
