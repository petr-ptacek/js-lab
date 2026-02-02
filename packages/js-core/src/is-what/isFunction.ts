/**
 * Checks whether the given value is a function.
 *
 * Acts as a type guard and narrows the value to `Function` when true.
 *
 * Note: The `Function` type is intentionally used here to allow
 * any callable value without constraining its arguments or return type.
 *
 * @param value The value to test.
 * @returns `true` if the value is a function, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isFunction(() => {});    // true
 * isFunction(class {});   // true
 * isFunction(123);        // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = () => "hello";
 *
 * if (isFunction(value)) {
 *   value();
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}
