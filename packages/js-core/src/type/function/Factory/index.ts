/**
 * Represents a factory function.
 *
 * A factory is a function that accepts arguments and returns a value of type TResult.
 *
 * @example
 * ```ts
 * const createUser: Factory<User, [name: string, age: number]> = (name, age) => ({ name, age });
 * ```
 *
 * @since 1.0.0
 */
export type Factory<TResult, TArgs extends unknown[] = []> = (...args: TArgs) => TResult;
