/**
 * Represents a value that may be `undefined`.
 *
 * @example
 * ```ts
 * const value: MaybeUndefined<string>;
 * // string | undefined
 * ```
 *
 * @since 1.0.0
 */
export type MaybeUndefined<T> = T | undefined;
