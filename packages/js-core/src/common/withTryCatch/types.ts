export type FallbackValue<TResult, TError> = TResult | ((e: TError) => TResult);

/**
 * Configuration options for {@link withTryCatch}.
 */
export type WithTryCatchOptions<TResult, TError = unknown> = {
  /**
   * Called when the operation succeeds.
   * Invoked after the result is determined.
   */
  onSuccess?: (result: TResult) => void;

  /**
   * Called when the operation fails and no fallback is used.
   * Invoked after the result is determined.
   */
  onError?: (e: TError) => void;

  /**
   * Called after success or failure.
   * Invoked after all other callbacks.
   */
  onFinally?: () => void;

  /**
   * Fallback value or function used when `fn` throws.
   * If provided, failure is converted into success.
   */
  fallback?: FallbackValue<TResult, TError>;

  /**
   * Maps an unknown thrown value to a typed error.
   */
  mapError?: (e: unknown) => TError;
};

/**
 * Successful result of {@link withTryCatch}.
 */
export type TryCatchResultSuccess<TResult> = {
  ok: true;
  data: TResult;
};

/**
 * Failed result of {@link withTryCatch}.
 */
export type TryCatchResultFailure<TError = unknown> = {
  ok: false;
  error: TError;
};

/**
 * Discriminated union representing the result of {@link withTryCatch}.
 */
export type TryCatchResult<TResult, TError = unknown> =
  | TryCatchResultSuccess<TResult>
  | TryCatchResultFailure<TError>;
