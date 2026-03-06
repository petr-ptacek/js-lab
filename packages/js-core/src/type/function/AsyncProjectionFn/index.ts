/**
 * Represents an asynchronous projection function.
 *
 * Similar to {@link ProjectionFn}, but returns a Promise.
 *
 * Useful when the projected value requires asynchronous computation.
 *
 * @example
 * ```ts
 * const loadProfile: AsyncProjectionFn<User, Profile> = async (user) => {
 *   return api.loadProfile(user.id);
 * };
 * ```
 */
export type AsyncProjectionFn<TInput, TOutput> =
  (value: TInput) => Promise<TOutput>;
