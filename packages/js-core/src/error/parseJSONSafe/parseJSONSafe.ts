import type { WithTryCatchOptions } from "../withTryCatch";
import { withTryCatchSync } from "../withTryCatchSync";

/* -------------------------------------------------- */
/* Overloads */

/* -------------------------------------------------- */

export function parseJSONSafe<T>(value: string, fallback: T): T;
export function parseJSONSafe<T>(value: string): T | undefined;


/* -------------------------------------------------- */
/* Implementation */

/* -------------------------------------------------- */

/**
 * Safely parses a JSON string and returns the parsed value.
 *
 * If parsing fails (invalid JSON), the provided `fallback` value is returned instead.
 * When no fallback is provided, `undefined` is returned.
 *
 * @param value - JSON string to parse.
 * @param fallback - Fallback value returned when parsing fails.
 *
 * @returns Parsed JSON value or fallback.
 *
 * @example
 * ```ts
 * parseJSONSafe<{ foo: string }>('{"foo":"bar"}');
 * // => { foo: "bar" }
 *
 * parseJSONSafe('invalid json', { foo: "fallback" });
 * // => { foo: "fallback" }
 *
 * parseJSONSafe<number>('123');
 * // => 123
 *
 * parseJSONSafe('invalid');
 * // => undefined
 * ```
 *
 * @since 1.0.0
 */
export function parseJSONSafe<T>(
  value: string,
  fallback?: WithTryCatchOptions<T>["fallback"],
): T | undefined {
  const result = withTryCatchSync<T | undefined>(
    () => JSON.parse(value) as T,
    { fallback },
  );

  return result.data;
}
