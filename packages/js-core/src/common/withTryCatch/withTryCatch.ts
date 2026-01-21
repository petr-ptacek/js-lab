import type {
  WithTryCatchOptions,
  TryCatchResult,
  FallbackValue,
}                                  from "./types";
import { isUndefined, isFunction } from "../../is-what";


/**
 * Executes a function and returns its result as a discriminated union.
 *
 * This utility is focused solely on executing the provided `fn` and
 * converting its outcome into a {@link TryCatchResult}.
 *
 * - If `fn` succeeds, the result is `{ ok: true, data }`
 * - If `fn` throws:
 *   - `mapError` is applied (if provided)
 *   - `fallback` is used (if provided), producing `{ ok: true, data }`
 *   - otherwise `{ ok: false, error }` is returned
 *
 * Callback hooks (`onSuccess`, `onError`, `onFinally`) are invoked
 * **after** the result is determined and do not affect the returned value.
 *
 * @template TResult The successful result type.
 * @template TError The mapped error type (defaults to `unknown`).
 *
 * @param options Configuration object.
 *
 * @returns A {@link TryCatchResult} representing either success or failure.
 *
 * @example
 * ```ts
 * const result = await withTryCatch<number | null>({
 *   fn: async () => {
 *     if (Math.random() < 0.5) throw new Error("fail");
 *     return 100;
 *   },
 *   fallback: null,
 * });
 *
 * if (result.ok) {
 *   console.log(result.data);
 * }
 * ```
 */
export async function withTryCatch<TResult, TError = unknown>(
  options: WithTryCatchOptions<TResult, TError>,
): Promise<TryCatchResult<TResult, TError>> {
  let result: TryCatchResult<TResult, TError>;

  try {
    const data = await options.fn();
    result = { ok: true, data };
  } catch ( e: unknown ) {
    const error = options.mapError ? options.mapError(e) : (e as TError);

    if ( !isUndefined(options.fallback) ) {
      const data = isFallbackFn(options.fallback) ? options.fallback(error) : options.fallback;
      result = { ok: true, data };
    } else {
      result = { ok: false, error };
    }
  }

  if ( result.ok ) {
    options.onSuccess?.(result.data);
  } else {
    options.onError?.(result.error);
  }

  options.onFinally?.();

  return result;
}

function isFallbackFn<TResult, TError>(v: FallbackValue<TResult, TError>): v is (e: TError) => TResult {
  return isFunction(v);
}
