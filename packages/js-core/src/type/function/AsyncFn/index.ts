/**
 * Represents an asynchronous function.
 *
 * A generic function type that accepts a tuple of arguments and
 * returns a `Promise` resolving to a result.
 *
 * This type is intended for reusable async contracts such as
 * data fetching, retries, caching, debouncing, or safe execution
 * utilities.
 *
 * @example
 * ```ts
 * const fetchUser: AsyncFn<[id: string], User> = async (id) => {
 *   return api.getUser(id);
 * };
 * ```
 *
 * @since 1.0.0
 */
export type AsyncFn<TArgs extends unknown[] = unknown[], TResult = unknown> = (
  ...args: TArgs
) => Promise<TResult>;
