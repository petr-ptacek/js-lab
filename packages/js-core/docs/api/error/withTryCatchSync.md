---
title: withTryCatchSync
category: error
tags:
  - error
  - try-catch
  - sync
  - result
  - union
  - handling
since: 1.0.0
---


> **Category:** error
> **Since:** 1.0.0
> **Tags:** error, try-catch, sync, result, union, handling


# withTryCatchSync

Executes a synchronous function and returns its outcome as a discriminated union.

## Usage

```ts
import { withTryCatchSync } from "@petr-ptacek/js-core"

const result = withTryCatchSync(() => {
  const data = JSON.parse(jsonString)
  return data
})

if (result.ok) {
  console.log(result.data)
} else {
  console.error(result.error)
}
```

## Why This Utility Exists

This is the synchronous variant of `withTryCatch`. While the async version handles both sync and async functions, `withTryCatchSync` is specifically designed for synchronous operations, providing the same structured error handling without Promise overhead. It converts exceptions into typed discriminated unions, enabling predictable result processing without try-catch blocks.

## Signature

```ts
function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options: WithTryCatchOptions<TResult, TError> & { fallback: ValueOrFactory<TResult, [TError]> }
): TryCatchResultSuccess<TResult> | TryCatchResultFailureWithData<TResult, TError>

function withTryCatchSync<TResult, TError = unknown>(
  fn: () => TResult,
  options?: WithTryCatchOptions<TResult, TError>
): TryCatchResultSuccess<TResult> | TryCatchResultFailureNoData<TError>
```

## Parameters

- `fn` (`() => TResult`): Synchronous function to execute. Must return a value directly (no Promise).
- `options` (`WithTryCatchOptions<TResult, TError>`, optional): Configuration object controlling error mapping, fallback behavior, and lifecycle callbacks.

## Type Parameters

- `<TResult>`: The type of the successful result value.
- `<TError>`: The type of the mapped error (defaults to `unknown`).

## Return Type

Returns a `TryCatchResult<TResult, TError>` discriminated union (synchronously):

- **Success**: `{ ok: true, data: TResult }` when the function completes successfully
- **Failure without fallback**: `{ ok: false, error: TError }` when the function throws and no fallback is provided
- **Failure with fallback**: `{ ok: false, error: TError, data: TResult }` when the function throws but a fallback value is available

## Type Declarations

This utility uses the same type definitions as `withTryCatch`:

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

The utility follows the same design principles as `withTryCatch`:

1. **Execution phase**: Runs the provided function and captures success/failure
2. **Result resolution**: Converts outcomes into typed discriminated unions
3. **Callback invocation**: Executes lifecycle callbacks after result determination

The key difference is that `withTryCatchSync` operates purely synchronously - no Promise handling or await is involved. Callbacks are still invoked **after** the result is determined and do not influence the returned value.

When a `fallback` is provided, the operation is still considered failed (`ok: false`) but includes recovery data, preserving failure semantics while enabling graceful degradation.

## When To Use

Use `withTryCatchSync` when you need:

- structured error handling for **synchronous** operations
- to avoid try-catch blocks in sync code
- the same result patterns as `withTryCatch` but without Promise overhead
- lifecycle callbacks for logging or notifications in sync operations
- graceful error recovery with fallback values for sync functions

## When Not To Use

Avoid when:

- the function returns a Promise (use `withTryCatch` instead)
- you need traditional synchronous error throwing behavior
- simple try-catch blocks are sufficient
- the function should never fail (use assertions instead)

## Summary

`withTryCatchSync` is the synchronous variant of `withTryCatch`, providing structured error handling by converting synchronous function execution outcomes into discriminated unions with optional recovery mechanisms and lifecycle callbacks.


## Snippets

### basic.ts

```ts
import { withTryCatchSync } from "@petr-ptacek/js-core";

// basic synchronous error handling
const jsonString = '{"name": "Alice", "age": 30}';

const result = withTryCatchSync(() => {
  return JSON.parse(jsonString);
});

if (result.ok) {
  console.log("Parsed successfully:", result.data);
} else {
  console.error("Parse failed:", result.error);
}

```

### math-operations.ts

```ts
import { withTryCatchSync } from "@petr-ptacek/js-core";

// mathematical operations with error handling
function safeDivision(a: number, b: number) {
  return withTryCatchSync(
    () => {
      if (b === 0) {
        throw new Error("Division by zero");
      }
      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error("Invalid numbers provided");
      }
      return a / b;
    },
    {
      mapError: (e) => {
        if (e instanceof Error) {
          return { code: "MATH_ERROR", message: e.message };
        }
        return { code: "UNKNOWN", message: String(e) };
      }
    }
  );
}

// Usage examples
const result1 = safeDivision(10, 2);
if (result1.ok) {
  console.log("10 / 2 =", result1.data); // 5
}

const result2 = safeDivision(10, 0);
if (!result2.ok) {
  console.error("Error:", result2.error); // { code: "MATH_ERROR", message: "Division by zero" }
}

```

### with-fallback.ts

```ts
import { withTryCatchSync } from "@petr-ptacek/js-core";

// with fallback and error mapping
const result = withTryCatchSync(
  () => {
    const config = JSON.parse(configString);
    validateConfig(config);
    return config;
  },
  {
    fallback: { theme: "default", language: "en" },
    onSuccess: (_config) => {
      console.log("Configuration loaded successfully");
    },
    onError: (error) => {
      console.error("Using default config due to error:", error);
      // Could send to error tracking service
    },
    mapError: (e) => {
      if (e instanceof SyntaxError) {
        return { type: "PARSE_ERROR", message: "Invalid JSON format" };
      }
      if (e instanceof ValidationError) {
        return { type: "VALIDATION_ERROR", message: e.message };
      }
      return { type: "UNKNOWN_ERROR", message: String(e) };
    }
  }
);

// Result always has data due to fallback
console.log("Using config:", result.data);

if (!result.ok) {
  console.log("Fallback was used due to:", result.error);
}

// Helper functions
const configString = '{"theme": "dark", "language": "cs"}';

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateConfig(config: any) {
  if (!config.theme || !config.language) {
    throw new ValidationError("Missing required config fields");
  }
}

```




