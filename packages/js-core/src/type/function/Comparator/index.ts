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
