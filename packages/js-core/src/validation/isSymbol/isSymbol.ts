/**
 * Checks whether the given value is a `symbol`.
 *
 * Acts as a type guard and narrows the value to `symbol` when true.
 *
 * @param value The value to test.
 * @returns `true` if the value is of type `symbol`, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isSymbol(Symbol("id")); // true
 * isSymbol("id");        // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = Symbol.iterator;
 *
 * if (isSymbol(value)) {
 *   value.toString();
 * }
 * ```
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}
