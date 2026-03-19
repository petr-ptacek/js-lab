/**
 * Represents an identity function.
 *
 * An identity function returns the input value unchanged.
 * It is commonly used as a default projection or passthrough
 * in higher-order utilities.
 *
 * @example
 * ```ts
 * const identity: Identity<number> = (value) => value;
 * ```
 *
 * @since 1.0.0
 */
export type Identity<T> = (value: T) => T;
