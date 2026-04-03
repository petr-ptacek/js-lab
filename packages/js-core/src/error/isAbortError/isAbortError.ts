/**
 * Checks whether the given value is a `DOMException` with `name === "AbortError"`.
 *
 * Acts as a type guard and narrows the value to `DOMException` when true.
 *
 * @param error - The value to test.
 * @returns `true` if the value is an `AbortError`, otherwise `false`.
 *
 * @since 1.1.0
 *
 * @example
 * ```ts
 * isAbortError(new DOMException("Aborted", "AbortError")); // true
 * isAbortError(new Error("Aborted"));                      // false
 * ```
 *
 * @example
 * ```ts
 * try {
 *   await fetch("/api/data", { signal });
 * } catch (error) {
 *   if (isAbortError(error)) {
 *     // error is narrowed to DOMException
 *     return;
 *   }
 *   throw error;
 * }
 * ```
 */
export function isAbortError(error: unknown): error is DOMException {
  return error instanceof DOMException && error.name === "AbortError";
}
