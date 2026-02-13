import type { TryCatchResult, TryCatchResultFailure, WithTryCatchOptions } from "./types";
import { isFunction } from "../../is-what";
import type { ValueOrFactory } from "../../types";

/**
 * @internal
 */
export function isFallbackFn<TResult, TError>(v: ValueOrFactory<TResult, [TError]>): v is (e: TError) => TResult {
  return isFunction(v);
}

/**
 * @internal
 */
export function resolveFailureResult<TResult, TError = unknown>(
  e: unknown,
  options: WithTryCatchOptions<TResult, TError>,
): TryCatchResultFailure<TResult, TError> {
  const error = options.mapError ? options.mapError(e) : (e as TError);

  if (Object.hasOwn(options, "fallback")) {
    const fallback = options.fallback as ValueOrFactory<TResult, [TError]>;
    const data = isFallbackFn(fallback) ? fallback(error) : fallback;

    return {
      ok: false,
      error,
      data,
    };
  }

  return {
    ok: false,
    error: error,
  };
}

/**
 * @internal
 * Invokes lifecycle callbacks for the resolved result.
 *
 * Note: Errors thrown inside callbacks are NOT caught
 * and will propagate to the caller.
 */
export function invokeCallbacks<TResult, TError = unknown>(
  result: TryCatchResult<TResult, TError>,
  options: WithTryCatchOptions<TResult, TError>,
) {
  if (result.ok) {
    options.onSuccess?.(result.data);
  } else {
    options.onError?.(result.error);
  }

  options.onFinally?.();
}
