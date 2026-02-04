/**
 * Function used to round a numeric value.
 *
 * This function is applied to calculated values when scaling or
 * transforming numbers, allowing callers to control rounding behavior
 * (e.g. `Math.round`, `Math.floor`, `Math.ceil`, or a custom function).
 *
 * @param {number} value - The numeric value to be rounded
 * @returns The rounded numeric result
 *
 * @since 1.0.0
 */
export type RoundValueFn = (value: number) => number;


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
export type AsyncFn<TArgs extends unknown[] = unknown[], TResult = unknown> =
  (...args: TArgs) => Promise<TResult>;

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

/**
 * Represents a predicate function.
 *
 * A predicate is a synchronous function that evaluates a value
 * and returns a boolean result.
 *
 * Predicates are commonly used for filtering, validation,
 * conditional checks, and guard logic.
 *
 * @example
 * ```ts
 * const isPositive: Predicate<number> = (value) => value > 0;
 * ```
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Represents an asynchronous predicate function.
 *
 * Similar to {@link Predicate}, but returns a Promise<boolean>.
 *
 * Useful for validations that require asynchronous checks,
 * such as API calls or database lookups.
 *
 * @example
 * ```ts
 * const isUserAllowed: AsyncPredicate<User> = async (user) => {
 *   return await api.hasAccess(user.id);
 * };
 * ```
 */
export type AsyncPredicate<T> = (value: T) => Promise<boolean>;

/**
 * Represents a projection function.
 *
 * A projection function maps an input value to a derived value.
 * It is commonly used to extract or compute a specific property
 * from a complex structure.
 *
 * Typical use cases include mapping, grouping, sorting,
 * and key selection.
 *
 * @example
 * ```ts
 * const getId: ProjectionFn<User, string> = (user) => user.id;
 * ```
 */
export type ProjectionFn<TInput, TOutput> = (value: TInput) => TOutput;

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

/**
 * Represents a comparison function.
 *
 * A comparator compares two values of the same type and returns
 * a numeric result indicating their relative order.
 *
 * The returned value follows this convention:
 * - a negative number if `a` is less than `b`
 * - zero if `a` and `b` are considered equal
 * - a positive number if `a` is greater than `b`
 *
 * @example
 * ```ts
 * const compareNumbers: Comparator<number> = (a, b) => a - b;
 * ```
 */
export type Comparator<T> = (a: T, b: T) => number;
