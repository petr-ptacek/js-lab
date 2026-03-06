/**
 * Represents a value that may be `null` or `undefined`.
 *
 * @example
 * ```ts
 * const value: MaybeNullable<string>;
 * // null | undefined | string
 * ```
 *
 * @since 1.0.0
 */
export type MaybeNullable<T> = T | null | undefined;
