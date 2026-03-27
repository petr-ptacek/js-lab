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

JavaScript's native AbortController requires manual lifecycle management and cleanup. This utility provides deterministic cancellation semantics for async tasks by automatically creating and controlling AbortController instances. It enforces a "latest execution wins" model by default, preventing race conditions in UI applications.

## Signature

```ts
function withAbortable<Args extends unknown[], R>(
  fn: AbortableFn<Args, R>,
  options?: WithAbortableOptions
): WithAbortableReturn<Args, R>
```

## Parameters

- `fn` (`AbortableFn<Args, R>`): An asynchronous function that receives an AbortableContext containing an AbortSignal. The function MUST respect the provided signal to ensure proper cancellation behavior.
- `options` (`WithAbortableOptions`, optional): Configuration options.
  - `autoAbort` (`boolean`, default `true`): Automatically aborts the previous execution before starting a new one.
  - `timeoutMs` (`number`, optional): Automatically aborts the execution if it does not complete within the specified milliseconds.

## Type Parameters

- `<Args extends unknown[]>`: The argument types of the wrapped function.
- `<R>`: The return type of the wrapped function.

## Return Type

Returns an object containing:
- `execute(...args)` — executes the wrapped function with the provided arguments.
- `abort()` — aborts the currently active execution.
- `signal` — the current AbortSignal or null if idle.
- `isRunning` — indicates whether an execution is currently in progress.

## Type Declarations

The utility exports several TypeScript types for proper integration:

```ts
type AbortableContext = {
  signal: AbortSignal;
}

type AbortableFn<Args extends unknown[], R> = 
  (context: AbortableContext, ...args: Args) => Promise<R>

type WithAbortableOptions = {
  autoAbort?: boolean;
  timeoutMs?: number;
}

type WithAbortableReturn<Args extends unknown[], R> = {
  execute: (...args: Args) => Promise<R>;
  abort: () => void;
  readonly signal: AbortSignal | null;
  readonly isRunning: boolean;
}
```

These types enable proper TypeScript integration and ensure type safety when using the utility.

## Design Notes


The implementation uses a "latest execution wins" model by default. When `autoAbort: true`, starting a new execution automatically aborts the previous one, guaranteeing a single active execution at a time.

### Race condition prevention

The implementation uses an internal token (runId) to ensure that only the latest execution can update state and perform cleanup. This prevents race conditions where a slower, earlier promise could otherwise overwrite the state of a newer execution. All state changes and cleanup are performed only if the execution is still current.

The wrapped function MUST properly handle the provided AbortSignal. If it ignores the signal, cancellation cannot be guaranteed. When an execution is aborted, the returned promise typically rejects with a DOMException named "AbortError".

Timeout functionality is implemented via AbortController without introducing custom error types, maintaining consistency with native cancellation patterns.

## When To Use

Use `withAbortable` when you need:

- deterministic cancellation for async operations (especially API calls)
- automatic cleanup of previous requests when starting new ones
- timeout handling for long-running operations
- race condition prevention in UI components

## When Not To Use

Avoid when:

- the wrapped function doesn't support AbortSignal
- you need multiple concurrent executions without cancellation
- simple Promise-based operations without cancellation needs
- synchronous operations

## Summary

`withAbortable` provides robust AbortController lifecycle management with automatic cleanup, timeout support, and deterministic cancellation semantics for async functions.
