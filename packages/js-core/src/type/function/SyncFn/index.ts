/**
 * Represents a synchronous function.
 *
 * A generic function type that accepts a tuple of arguments and
 * returns a value immediately.
 *
 * This type is intended for reusable synchronous contracts such as
 * mappers, predicates, comparators, and other pure computation helpers.
 *
 * @example
 * ```ts
 * const sum: SyncFn<[a: number, b: number], number> = (a, b) => a + b;
 * ```
 *
 * @since 1.0.0
 */
export type SyncFn<TArgs extends unknown[] = unknown[], TResult = unknown> =
  (...args: TArgs) => TResult;
