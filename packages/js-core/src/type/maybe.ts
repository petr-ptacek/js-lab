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
