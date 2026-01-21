import type {
  WithTryCatchOptions,
  TryCatchResult,
  FallbackValue,
}                                  from "./types";
import { isUndefined, isFunction } from "../../is-what";


function isFallbackFn<TResult, TError>(v: FallbackValue<TResult, TError>): v is (e: TError) => TResult {
  return isFunction(v);
}

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
