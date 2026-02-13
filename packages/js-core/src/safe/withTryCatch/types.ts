import type { ValueOrFactory } from "../../types";

/**
 * Configuration options for {@link withTryCatch}.
 *
 * These options control:
 * - lifecycle callbacks
 * - error mapping
 * - optional fallback recovery behavior
 *
 * Providing a `fallback` does **not** convert failure into success.
 * Instead, it allows returning recovery data while preserving
 * the failure state (`ok: false`).
 *
 * @template TResult Type of the successful (or fallback) result.
 * @template TError Type of the mapped error.
 * @since 1.0.0
 */
export type WithTryCatchOptions<TResult, TError = unknown> = {
  /**
   * Called when the operation succeeds.
   *
   * Invoked after the result is resolved.
   * Not called when a fallback is used.
   */
  onSuccess?: (result: TResult) => void;

  /**
   * Called when the operation fails.
   *
   * Invoked even if a fallback value is provided.
   * Useful for side effects such as logging, reporting,
   * or user notifications.
   */
  onError?: (e: TError) => void;

  /**
   * Called after success or failure.
   *
   * Invoked after all other lifecycle callbacks.
   */
  onFinally?: () => void;

  /**
   * Fallback value or function used when `fn` throws.
   *
   * When provided:
   * - the returned result will contain `data`
   * - the operation is still considered failed (`ok: false`)
   *
   * This enables error recovery without hiding failures.
   */
  fallback?: ValueOrFactory<TResult, [TError]>;

  /**
   * Maps an unknown thrown value to a typed error.
   *
   * Useful for normalizing errors coming from different sources.
   */
  mapError?: (e: unknown) => TError;
};

/**
 * Successful result of {@link withTryCatch}.
 *
 * Indicates that the operation completed successfully.
 * The `data` property always contains the returned value.
 *
 * @template TResult Type of the successful result.
 */
export type TryCatchResultSuccess<TResult> = {
  ok: true;
  data: TResult;
};

/**
 * Failed result of {@link withTryCatch}.
 *
 * This result is returned when the operation throws.
 * Depending on whether a fallback is provided, `data`
 * may or may not be present.
 *
 * @template TResult Type of the fallback result.
 * @template TError Type of the mapped error.
 */
export type TryCatchResultFailure<TResult, TError = unknown> =
  | TryCatchResultFailureWithData<TResult, TError>
  | TryCatchResultFailureNoData<TError>;

/**
 * Failed result without fallback data.
 *
 * Returned when the operation throws and no fallback is provided.
 *
 * @template TError Type of the mapped error.
 */
export type TryCatchResultFailureNoData<TError = unknown> = {
  ok: false;
  error: TError;
  data?: never;
};

/**
 * Failed result with fallback data.
 *
 * Returned when the operation throws and a fallback is provided.
 * The operation is still considered failed (`ok: false`),
 * but recovery data is available.
 *
 * @template TResult Type of the fallback result.
 * @template TError Type of the mapped error.
 */
export type TryCatchResultFailureWithData<TResult, TError = unknown> = {
  ok: false;
  error: TError,
  data: TResult;
}

/**
 * Discriminated union representing the result of {@link withTryCatch}.
 *
 * - `ok: true` indicates a successful operation and always includes `data`
 * - `ok: false` indicates a failure and always includes `error`
 * - `data` may still be present on failure if a fallback was used
 *
 * @template TResult Type of the successful (or fallback) result.
 * @template TError Type of the mapped error.
 */
export type TryCatchResult<TResult, TError = unknown> =
  | TryCatchResultSuccess<TResult>
  | TryCatchResultFailure<TResult, TError>;
