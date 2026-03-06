/**
 * Represents a getter function.
 *
 * A getter is a function that returns a value of type TResult.
 *
 * @example
 * ```ts
 * const getValue: Getter<number> = () => 42;
 * ```
 *
 * @since 1.0.0
 */
export type Getter<TResult> = () => TResult;
