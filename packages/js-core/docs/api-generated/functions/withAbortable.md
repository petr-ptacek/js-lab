# Function: withAbortable()

> **withAbortable**\<`Args`, `R`\>(`fn`, `options`): [`WithAbortableReturn`](../type-aliases/WithAbortableReturn.md)\<`Args`, `R`\>

Wraps an asynchronous function with AbortController lifecycle management.

This utility provides deterministic cancellation semantics for async tasks
(typically API calls) by automatically creating and controlling an
`AbortController` instance for each execution.

By default, the previous execution is aborted before a new one starts
(`autoAbort: true`), enforcing a "latest execution wins" model.

## Type Parameters

### Args

`Args` *extends* `unknown`[]

### R

`R`

## Parameters

### fn

`AbortableFn`\<`Args`, `R`\>

An asynchronous function that receives a AbortableContext
containing an `AbortSignal`. The function MUST respect the provided signal
to ensure proper cancellation behavior.

### options

[`WithAbortableOptions`](../type-aliases/WithAbortableOptions.md) = `{}`

Optional configuration:
- `autoAbort` (default: `true`) — automatically aborts the previous execution
  before starting a new one.
- `timeoutMs` — automatically aborts the execution if it does not complete
  within the specified number of milliseconds.

## Returns

[`WithAbortableReturn`](../type-aliases/WithAbortableReturn.md)\<`Args`, `R`\>

An object containing:
- `execute(...args)` — executes the wrapped function.
- `abort()` — aborts the currently active execution.
- `signal` — the current `AbortSignal` or `null` if idle.
- `isRunning` — indicates whether an execution is currently in progress.

## Remarks

### Cancellation contract

The wrapped function MUST properly handle the provided `AbortSignal`.
If it ignores the signal, cancellation cannot be guaranteed.

When an execution is aborted, the returned promise is expected to reject
(typically with a `DOMException` named `"AbortError"`).
Error handling is intentionally delegated to the consumer.

### Concurrency model

With `autoAbort: true` (default):
- Starting a new execution aborts the previous one.
- Guarantees a single active execution at a time.

With `autoAbort: false`:
- Multiple executions may run concurrently.
- Only the most recent execution can be aborted via `abort()`.

### Timeout behavior

If `timeoutMs` is provided, the execution will be aborted automatically
after the specified duration. Timeout is implemented via `AbortController`
and does not introduce custom error types.

## Examples

Basic usage with fetch:
```ts
const getUser = withAbortable(
  async ({ signal }, id: string) => {
    const res = await fetch(`/api/users/${id}`, { signal });
    return res.json();
  }
);

await getUser.execute("123");
```

With timeout:
```ts
const loadData = withAbortable(
  async ({ signal }) => fetch("/api/data", { signal }),
  { timeoutMs: 5000 }
);
```

Manual abort:
```ts
const task = withAbortable(async ({ signal }) => {
  return longRunningOperation(signal);
});

const promise = task.execute();
task.abort(); // cancels the execution
```
