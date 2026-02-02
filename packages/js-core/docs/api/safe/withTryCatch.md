# withTryCatch / withTryCatchSync

Utilities for executing functions and capturing their outcome as a typed, discriminated union instead of relying on
thrown errors.

These helpers provide a structured alternative to `try/catch`, making error handling explicit, composable, and
type-safe.

---

## What it solves

Traditional `try/catch` blocks:

- mix control flow with error handling
- are hard to compose
- make success and failure paths implicit

`withTryCatch` and `withTryCatchSync` convert execution results into explicit data structures that can be safely
inspected, logged, or transformed without throwing.

---

## What it does

- Executes a provided function (sync or async)
- Converts its outcome into a discriminated union result
- Preserves failure semantics even when fallback data is provided
- Supports lifecycle callbacks for side effects
- Allows error normalization via `mapError`

---

## What it does NOT do

- It does not swallow errors silently
- It does not convert failures into successes
- It does not catch errors thrown inside lifecycle callbacks
- It does not perform retries or control flow branching

---

## Basic usage (async)

```ts
import { withTryCatch } from "@petr-ptacek/js-core";

const result = await withTryCatch(async () => {
  if ( Math.random() < 0.5 ) throw new Error("fail");
  return 100;
});

if ( result.ok ) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

---

## Basic usage (sync)

```ts
import { withTryCatchSync } from "@petr-ptacek/js-core";

const result = withTryCatchSync(() => {
  if ( Math.random() < 0.5 ) throw new Error("fail");
  return 100;
});

if ( result.ok ) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

---

## Using a fallback

A fallback allows returning recovery data while still marking the operation as failed.

```ts
const result = await withTryCatch(
  () => JSON.parse("invalid"),
  {
    fallback: null,
    onError: () => console.warn("Parsing failed"),
  }
);

if ( !result.ok ) {
  // result.data is available because fallback was provided
  console.log(result.data); // null
}
```

Important: providing a fallback **does not** change `ok` to `true`.

---

## Result semantics

### Success

```ts
{
  ok: true, data
:
  TResult
}
```

Returned when the function completes without throwing.

### Failure without fallback

```ts
{
  ok: false, error
:
  TError
}
```

Returned when the function throws and no fallback is provided.

### Failure with fallback

```ts
{
  ok: false, error
:
  TError, data
:
  TResult
}
```

Returned when the function throws and a fallback is provided. The operation is still considered failed.

---

## Lifecycle callbacks

Callbacks are invoked **after** the result is fully resolved.

- `onSuccess(result)` — called only on success
- `onError(error)` — called on every failure, even with fallback
- `onFinally()` — always called last

Errors thrown inside callbacks are **not caught**.

Callbacks never influence the returned result.

---

## Types

### TryCatchResult

```ts
type TryCatchResult<TResult, TError> =
  | { ok: true; data: TResult }
  | { ok: false; error: TError; data?: TResult };
```

Discriminated union representing either success or failure.

---

### WithTryCatchOptions

```ts
type WithTryCatchOptions<TResult, TError> = {
  onSuccess?: (result: TResult) => void;
  onError?: (error: TError) => void;
  onFinally?: () => void;
  fallback?: TResult | ((e: TError) => TResult);
  mapError?: (e: unknown) => TError;
};
```

Configuration object controlling callbacks, error mapping, and fallback behavior.

---

## When to use

- You want explicit, typed error handling
- You need to compose success/failure logic
- You want to avoid thrown errors in application flow
- You want predictable control over recovery behavior

---

## When NOT to use

- You rely on exception-based control flow
- You need stack traces propagated automatically
- You want failures to interrupt execution immediately

---

## Design notes

- Errors are data, not control flow
- Failures remain failures even with recovery data
- Side effects are isolated via callbacks
- The API favors explicitness over convenience

---

## Summary

`withTryCatch` and `withTryCatchSync` provide a disciplined, type-safe alternative to `try/catch`. They are designed for
core usage where correctness, composability, and explicit control over failure semantics matter more than syntactic
brevity.

## More - withTryCatch

[➡️ Read more →](/api-generated/functions/withTryCatch)

## More - withTryCatchSync

[➡️ Read more →](/api-generated/functions/withTryCatchSync)
