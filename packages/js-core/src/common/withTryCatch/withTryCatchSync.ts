import { invokeCallbacks, resolveErrorResult } from "./helpers";
import type { TryCatchResult, WithTryCatchOptions, TryCatchResultSuccess, FallbackValue } from "./types";


export function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options: WithTryCatchOptions<TResult, TError> & { fallback: FallbackValue<TResult, TError> },
): TryCatchResultSuccess<TResult>;

export function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options?: WithTryCatchOptions<TResult, TError>,
): TryCatchResult<TResult, TError>;

/**
 * Executes a synchronous function and returns its outcome
 * as a discriminated union.
 *
 * This utility is responsible only for:
 * - executing the provided synchronous function
 * - converting its result into a {@link TryCatchResult}
 *
 * The returned result is fully determined **before** any callbacks are invoked.
 *
 * ### Result semantics
 * - If `fn` succeeds, `{ ok: true, data }` is returned
 * - If `fn` throws:
 *   - the error is mapped using `mapError` (if provided)
 *   - if `fallback` is defined, failure is converted into success
 *     and `{ ok: true, data }` is returned
 *   - otherwise `{ ok: false, error }` is returned
 *
 * ### Callbacks
 * Lifecycle callbacks (`onSuccess`, `onError`, `onFinally`) are invoked
 * **after** the result has been resolved.
 *
 * Callback errors are **not caught** and will propagate to the caller.
 * Callbacks do **not** influence the returned result.
 *
 * @template TResult The successful result type.
 * @template TError The mapped error type (defaults to `unknown`).
 *
 * @param fn Synchronous function to execute.
 * @param options Configuration object controlling error mapping,
 * fallback behavior and lifecycle callbacks.
 *
 * @returns A {@link TryCatchResult} representing either success or failure.
 *
 * @example
 * ```ts
 * const result = withTryCatchSync<number | null>(
 *   () => {
 *     if (Math.random() < 0.5) throw new Error("fail");
 *     return 100;
 *   },
 *   { fallback: null }
 * );
 *
 * if (result.ok) {
 *   console.log(result.data);
 * }
 * ```
 */
export function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options: WithTryCatchOptions<TResult, TError> = {},
): TryCatchResult<TResult, TError> {
  let result: TryCatchResult<TResult, TError>;

  try {
    const data = fn();
    result = { ok: true, data };
  } catch (e: unknown) {
    result = resolveErrorResult<TResult, TError>(e, options);
  }

  invokeCallbacks<TResult, TError>(result, options);

  return result;
}
