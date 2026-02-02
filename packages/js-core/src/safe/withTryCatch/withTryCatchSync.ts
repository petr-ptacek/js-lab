import { invokeCallbacks, resolveFailureResult } from "./helpers";
import type {
  TryCatchResult,
  WithTryCatchOptions,
  TryCatchResultSuccess,
  FallbackValue,
  TryCatchResultFailureWithData,
  TryCatchResultFailureNoData,
} from "./types";


export function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options: WithTryCatchOptions<TResult, TError> & { fallback: FallbackValue<TResult, TError> },
): TryCatchResultSuccess<TResult> | TryCatchResultFailureWithData<TResult, TError>;

export function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options?: WithTryCatchOptions<TResult, TError>,
): TryCatchResultSuccess<TResult> | TryCatchResultFailureNoData<TError>;

/**
 * Executes a synchronous function and returns its outcome
 * as a discriminated union.
 *
 * This utility is responsible only for:
 * - executing the provided synchronous function
 * - converting its outcome into a typed {@link TryCatchResult}
 *
 * The returned result is fully determined **before** any lifecycle
 * callbacks are invoked.
 *
 * ---
 *
 * ## Result semantics
 *
 * ### Success
 * - If `fn` completes successfully, the result is:
 *   `{ ok: true, data }`
 *
 * ### Failure
 * - If `fn` throws:
 *   - the thrown value is mapped using `mapError` (if provided)
 *   - the result is always considered a failure (`ok: false`)
 *
 * #### Failure without fallback
 * - If no `fallback` is provided, the result is:
 *   `{ ok: false, error }`
 *
 * #### Failure with fallback
 * - If a `fallback` is provided, the result is:
 *   `{ ok: false, error, data }`
 *
 * In this case, recovery data is available, but the operation
 * is still considered failed.
 *
 * ---
 *
 * ## Callbacks
 *
 * Lifecycle callbacks are invoked **after** the result has been resolved:
 *
 * - `onSuccess` is called only when `fn` succeeds
 * - `onError` is called whenever `fn` throws, even if a fallback is used
 * - `onFinally` is always called last
 *
 * Errors thrown inside callbacks are **not caught** and will propagate
 * to the caller.
 *
 * Callbacks do **not** influence the returned result.
 *
 * ---
 *
 * ## Overload behavior
 *
 * - When `fallback` is provided, the returned result is guaranteed
 *   to contain a `data` property
 * - When `fallback` is not provided, `data` exists only on success
 *
 *
 * @param fn Synchronous function to execute.
 * @param options Configuration object controlling error mapping,
 * fallback behavior, and lifecycle callbacks.
 *
 * @returns A {@link TryCatchResult} representing either success
 * or failure, depending on the outcome.
 *
 * @example
 * ```ts
 * const result = withTryCatchSync(
 *   () => {
 *     if (Math.random() < 0.5) throw new Error("fail")
 *     return 100
 *   },
 *   {
 *     fallback: null,
 *     onError: () => toast.error("Operation failed"),
 *   }
 * )
 *
 * if (result.ok) {
 *   console.log(result.data)
 * } else {
 *   // result.data is available because a fallback was provided
 *   console.log(result.data)
 * }
 * ```
 *
 * @since 1.0.0
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
    result = resolveFailureResult<TResult, TError>(e, options);
  }

  invokeCallbacks<TResult, TError>(result, options);

  return result;
}
