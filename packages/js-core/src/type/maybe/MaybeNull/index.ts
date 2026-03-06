/**
 * Represents a value that may be `null`.
 *
 * @example
 * ```ts
 * const value: MaybeNull<string>;
 * // null | string
 * ```
 *
 * @since 1.0.0
 */
export type MaybeNull<T> = T | null;
