/**
 * Determines whether the provided value is exactly an empty string.
 *
 * Acts as a type guard that narrows the value to the `""` literal when true.
 *
 * @param value The value to inspect.
 * @returns `true` when the value is the empty string, otherwise `false`.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * isEmptyString("");        // true
 * isEmptyString("text");    // false
 * isEmptyString(null);        // false
 * ```
 */
export function isEmptyString(value: unknown): value is "" {
  return value === "";
}

