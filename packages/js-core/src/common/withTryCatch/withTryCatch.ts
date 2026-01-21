import type {
  WithTryCatchOptions,
  TryCatchResult,
  FallbackValue,
} from "./types";

function isFallbackFn<TResult, TError>(v: FallbackValue<TResult, TError>): v is (e: TError) => TResult {
  return typeof v === "function";
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

    if ( options.fallback !== undefined ) {
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
