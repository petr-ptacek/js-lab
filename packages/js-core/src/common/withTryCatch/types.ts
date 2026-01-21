export type FallbackValue<TResult, TError> = TResult | ((e: TError) => TResult);

export type WithTryCatchOptions<TResult, TError = unknown> = {
  fn: () => Promise<TResult> | TResult;
  onSuccess?: (result: TResult) => void;
  onError?: (e: TError) => void;
  onFinally?: () => void;
  fallback?: FallbackValue<TResult, TError>;
  mapError?: (e: unknown) => TError;
};

export type TryCatchResultSuccess<TResult> = {
  ok: true;
  data: TResult;
};

export type TryCatchResultFailure<TError = unknown> = {
  ok: false;
  error: TError;
};

export type TryCatchResult<TResult, TError = unknown> =
  | TryCatchResultSuccess<TResult>
  | TryCatchResultFailure<TError>;
