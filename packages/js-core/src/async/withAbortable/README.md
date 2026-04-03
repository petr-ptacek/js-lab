# withAbortable

Wraps an asynchronous function with AbortController lifecycle management.

## Usage

```ts
import { withAbortable } from "@petr-ptacek/js-core"

const getUser = withAbortable(
  async ({ signal }, id: string) => {
    const res = await fetch(`/api/users/${id}`, { signal });
    return res.json();
  }
);

const user = await getUser.execute("123");
```

## Why This Utility Exists

JavaScript's native AbortController requires manual lifecycle management and cleanup. This utility provides
deterministic cancellation semantics for async tasks by automatically creating and controlling AbortController
instances. It enforces a "latest execution wins" model, preventing race conditions in UI applications.

## Signature

```ts
function withAbortable<Args extends unknown[], R>(
  fn: AbortableFn<Args, R>,
  options?: WithAbortableOptions
): WithAbortableReturn<Args, R>
```

## Parameters

- `fn` (`AbortableFn<Args, R>`): An asynchronous function that receives an `AbortableContext` containing an
  `AbortSignal`. The function MUST respect the provided signal to ensure proper cancellation behavior.
- `options` (`WithAbortableOptions`, optional): Configuration options.
  - `timeoutMs` (`number`, optional): Automatically aborts the execution if it does not complete within the specified
    milliseconds.

## Type Parameters

- `<Args extends unknown[]>`: The argument types of the wrapped function.
- `<R>`: The return type of the wrapped function.

## Return Type

Returns an object containing:

- `execute(...args)` — executes the wrapped function with the provided arguments.
- `cancel()` — aborts the currently active execution.
- `signal` — the current `AbortSignal` or `null` if idle.
- `isRunning` — indicates whether an execution is currently in progress.

## Type Declarations

```ts
type AbortableContext = {
  signal: AbortSignal;
}

type AbortableFn<Args extends unknown[], R> =
  (context: AbortableContext, ...args: Args) => Promise<R>

type WithAbortableOptions = {
  timeoutMs?: number;
}

type WithAbortableReturn<Args extends unknown[], R> = {
  execute: (...args: Args) => Promise<R>;
  cancel: () => void;
  readonly signal: AbortSignal | null;
  readonly isRunning: boolean;
}
```

## Design Notes

Starting a new execution always aborts the previous one — this behavior is fixed and not configurable. Only one
execution can be active at a time.

### Stale result protection

The implementation uses [`withRunId`](../withRunId) internally with `strategy: "replace"`. This ensures that only the
latest execution can resolve and perform cleanup. If a previous execution somehow completes after being replaced, its
result is discarded and the promise rejects with `AbortError`.

### Cancellation contract

The wrapped function MUST properly handle the provided `AbortSignal`. If it ignores the signal, cancellation cannot be
guaranteed. When an execution is aborted, the returned promise is expected to reject (typically with a `DOMException`
named `"AbortError"`).

Timeout functionality is implemented via `AbortController` without introducing custom error types, maintaining
consistency with native cancellation patterns.

## When To Use

Use `withAbortable` when you need:

- deterministic cancellation for async operations (especially API calls)
- automatic cleanup of previous requests when starting new ones
- timeout handling for long-running operations
- race condition prevention in UI components

## When Not To Use

Avoid when:

- the wrapped function doesn't support `AbortSignal`
- you need multiple concurrent executions (use separate instances instead)
- simple Promise-based operations without cancellation needs
- synchronous operations

## Summary

`withAbortable` provides robust `AbortController` lifecycle management with automatic cleanup, optional timeout support,
and deterministic "latest wins" cancellation semantics for async functions.
