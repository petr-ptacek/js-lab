# withTryCatch

Executes a function and returns its outcome as a discriminated union.

## Usage

```ts
import { withTryCatch } from "@petr-ptacek/js-core"

const result = await withTryCatch(async () => {
  const response = await fetch("/api/data")
  return response.json()
})

if (result.ok) {
  console.log(result.data)
} else {
  console.error(result.error)
}
```

## Why This Utility Exists

Error handling in JavaScript requires consistent try-catch patterns that can become verbose and error-prone. `withTryCatch` provides a structured approach to error handling by converting exceptions into typed discriminated unions, enabling predictable result processing without nested try-catch blocks.

## Signature

```ts
function withTryCatch<TResult, TError = unknown>(
  fn: () => Promise<TResult> | TResult,
  options: WithTryCatchOptions<TResult, TError> & { fallback: ValueOrFactory<TResult, [TError]> }
): Promise<
  | TryCatchResultSuccess<TResult>
  | TryCatchResultFailureWithData<TResult, TError>
>

function withTryCatch<TResult, TError = unknown>(
  fn: () => Promise<TResult> | TResult,
  options?: WithTryCatchOptions<TResult, TError>
): Promise<
  | TryCatchResultSuccess<TResult>
  | TryCatchResultFailureNoData<TError>
>
```

## Parameters

- `fn` (`() => Promise<TResult> | TResult`): Function to execute. May return a value synchronously or a Promise.
- `options` (`WithTryCatchOptions<TResult, TError>`, optional): Configuration object controlling error mapping, fallback behavior, and lifecycle callbacks.

## Type Parameters

- `<TResult>`: The type of the successful result value.
- `<TError>`: The type of the mapped error (defaults to `unknown`).

## Return Type

Returns a `Promise<TryCatchResult<TResult, TError>>` discriminated union:

- **Success**: `{ ok: true, data: TResult }` when the function completes successfully
- **Failure without fallback**: `{ ok: false, error: TError }` when the function throws and no fallback is provided
- **Failure with fallback**: `{ ok: false, error: TError, data: TResult }` when the function throws but a fallback value is available

## Type Declarations

```ts
type WithTryCatchOptions<TResult, TError = unknown> = {
  onSuccess?: (result: TResult) => void;
  onError?: (e: TError) => void;
  onFinally?: () => void;
  fallback?: ValueOrFactory<TResult, [TError]>;
  mapError?: (e: unknown) => TError;
}

type TryCatchResult<TResult, TError = unknown> =
  | TryCatchResultSuccess<TResult>
  | TryCatchResultFailure<TResult, TError>

type TryCatchResultSuccess<TResult> = {
  ok: true;
  data: TResult;
}

type TryCatchResultFailure<TResult, TError = unknown> =
  | TryCatchResultFailureWithData<TResult, TError>
  | TryCatchResultFailureNoData<TError>

type TryCatchResultFailureNoData<TError = unknown> = {
  ok: false;
  error: TError;
  data?: never;
}

type TryCatchResultFailureWithData<TResult, TError = unknown> = {
  ok: false;
  error: TError;
  data: TResult;
}
```

## Design Notes

The utility follows a clear separation of concerns:

1. **Execution phase**: Runs the provided function and captures success/failure
2. **Result resolution**: Converts outcomes into typed discriminated unions
3. **Callback invocation**: Executes lifecycle callbacks after result determination

Callbacks are invoked **after** the result is determined and do not influence the returned value. Errors in callbacks propagate to the caller.

When a `fallback` is provided, the operation is still considered failed (`ok: false`) but includes recovery data. This preserves failure semantics while enabling graceful degradation.

## When To Use

Use `withTryCatch` when you need:

- structured error handling with typed results
- to avoid nested try-catch blocks
- lifecycle callbacks for logging, reporting, or notifications
- graceful error recovery with fallback values
- consistent async/sync function handling

## When Not To Use

Avoid when:

- you need synchronous error throwing behavior
- simple try-catch blocks are sufficient
- the function should never fail (use assertions instead)
- you need custom error propagation logic

## Summary

`withTryCatch` provides structured error handling by converting function execution outcomes into discriminated unions, enabling predictable result processing with optional recovery mechanisms and lifecycle callbacks.
