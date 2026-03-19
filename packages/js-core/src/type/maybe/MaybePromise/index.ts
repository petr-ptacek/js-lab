/**
 * Represents a value that may be returned synchronously or as a Promise.
 *
 * @example
 * ```ts
 * const value: MaybePromise<string>;
 * // string | Promise<string>
 * ```
 *
 * @since 1.0.0
 */
export type MaybePromise<T> = T | Promise<T>;
