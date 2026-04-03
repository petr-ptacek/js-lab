# withRunId

Wraps a function with controlled execution semantics based on a configurable concurrency strategy.

## Usage

```ts
import { withRunId } from "@petr-ptacek/js-core"

const fetchUser = withRunId(
  async (_ctx, id: string) => {
    const res = await fetch(`/api/users/${id}`)
    return res.json()
  },
  { strategy: "replace" }
)

const result = await fetchUser.execute("123")

if (result.status === "success") {
  console.log(result.result)
}
```

## Why This Utility Exists

Async functions are frequently triggered multiple times before the previous invocation completes — form submissions,
search inputs, data polling. Without a concurrency control mechanism, this leads to race conditions, stale results, or
redundant executions.

This utility solves the problem by assigning each execution a unique `runId` and applying a configurable strategy that
determines what happens to concurrent calls: ignore them, queue them, or replace the previous one.

### 🧠 Simple explanation

Imagine you press a button many times:

* Should it ignore extra clicks?
* Should it remember them and run later?
* Or should it stop the old work and only care about the newest click?

That is exactly what the strategies solve.

## Signature

```ts
function withRunId<TArgs extends unknown[], TResult>(
  fn: (ctx: WithRunIdContext, ...args: TArgs) => MaybePromise<TResult>,
  options?: WithRunIdOptions
): WithRunIdReturn<TArgs, TResult>
```

## Parameters

- `fn` (`(ctx: WithRunIdContext, ...args: TArgs) => MaybePromise<TResult>`): The function to wrap. Receives a
  `WithRunIdContext` as the first argument, which includes the unique `runId` for the current execution.
- `options` (`WithRunIdOptions`, optional): Configuration object.
  - `strategy` (`WithRunIdStrategy`, default `"drop"`): Controls how concurrent invocations are handled.
  - `signal` (`AbortSignal`, optional): External cancellation signal. Checked before each execution starts.
  - `throwOnError` (`boolean`, default `false`): When `true`, errors are re-thrown instead of being returned as
    `{ status: "error", error }`.

## Type Parameters

- `<TArgs extends unknown[]>`: Argument types of the wrapped function (excluding the leading `WithRunIdContext`).
- `<TResult>`: Return type of the wrapped function.

## Return Type

Returns a `WithRunIdReturn<TArgs, TResult>` controller object:

- `execute(...args)` — runs the function according to the configured strategy and returns a
  `Promise<WithRunIdResult<TResult>>`
- `cancel()` — clears the active execution and resolves all queued calls with `{ status: "canceled" }`
- `isRunning` — `true` when an execution is currently active
- `currentRunId` — identifier of the currently active run, or `null` when idle

## Type Declarations

```ts
type WithRunIdStrategy = "drop" | "queue" | "replace"

interface WithRunIdOptions {
  strategy?: WithRunIdStrategy;
  signal?: AbortSignal;
  throwOnError?: boolean;
}

interface WithRunIdContext {
  runId: number;
}

type WithRunIdResult<TResult> =
  | { status: "success"; result: TResult }
  | { status: "skipped" }
  | { status: "replaced" }
  | { status: "canceled" }
  | { status: "error"; error: unknown }

interface WithRunIdReturn<TArgs extends unknown[], TResult> {
  execute: (...args: TArgs) => Promise<WithRunIdResult<TResult>>;
  cancel: () => void;
  readonly isRunning: boolean;
  readonly currentRunId: number | null;
}
```

## Design Notes

## Strategies

### `"drop"`

👉 *“Ignore new calls if something is already running.”*

* First call → runs
* Next calls → ignored

Use this when:

* You want to prevent spam (e.g. button clicks)
* Only one execution matters

---

### `"queue"`

👉 *“Wait your turn.”*

* First call → runs
* Next calls → wait in line
* Everything runs one by one

Use this when:

* Order matters
* Nothing should be lost

---

### `"replace"`

👉 *“Only the latest call matters.”*

* First call → starts
* New call → replaces it
* Old result is ignored

⚠️ Important:

* Old function is **not stopped**
* Its result is just **ignored**

Use this when:

* You only care about the latest result (e.g. search input)

### Comparison

| Strategy | What happens with new calls? | Order guaranteed | Old result used? | Typical use case      |
|----------|------------------------------|------------------|------------------|-----------------------|
| drop     | Ignored                      | ❌                | ✔                | Prevent spam clicks   |
| queue    | Added to queue               | ✔                | ✔                | Sequential operations |
| replace  | Replaces current             | ❌                | ❌ (ignored)      | Search / latest wins  |

## Stale result protection

Each execution receives a unique, monotonically increasing `runId`. When a result is resolved, the implementation checks
whether `runId` still matches the active one. If not, the result is ignored and `{ status: "replaced" }` is returned.
This prevents outdated responses from overwriting newer data.

## Cancellation semantics

Calling `cancel()` clears the active run and resolves all pending queued calls with `{ status: "canceled" }`. It does *
*not** cancel the underlying async operation — it only discards its result. For actual cancellation, combine with
`AbortSignal` passed to the wrapped function.

## Error handling

Controlled by `throwOnError`:

- `false` (default): errors are captured and returned as `{ status: "error", error }` — no `try/catch` needed at the
  call site.
- `true`: errors are re-thrown — standard exception-based flow with `try/catch`.

## When To Use

Use `withRunId` when you need:

- protection against race conditions in repetitive async calls
- sequential execution of async operations (e.g. API mutations)
- "latest wins" semantics without managing `AbortController` manually
- explicit, typed execution outcomes for every invocation
- spam protection for async triggers

## When Not To Use

Avoid when:

- a single, one-off async call is sufficient
- you need real cancellation of the underlying operation (use `withAbortable` instead)
- parallel concurrent executions are intentional
- synchronous functions without concurrency concerns

## Summary

`withRunId` provides deterministic concurrency control for async functions via configurable strategies (`drop`, `queue`,
`replace`). Each execution returns an explicit typed result describing its outcome, eliminating the need for ad-hoc race
condition workarounds.
