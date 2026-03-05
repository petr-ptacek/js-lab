import type { AbortableFn, AbortableContext, WithAbortableOptions, WithAbortableReturn } from "./types";

/**
 * Wraps an asynchronous function with AbortController lifecycle management.
 *
 * This utility provides deterministic cancellation semantics for async tasks
 * (typically API calls) by automatically creating and controlling an
 * `AbortController` instance for each execution.
 *
 * By default, the previous execution is aborted before a new one starts
 * (`autoAbort: true`), enforcing a "latest execution wins" model.
 *
 * @param fn - An asynchronous function that receives a {@link AbortableContext}
 * containing an `AbortSignal`. The function MUST respect the provided signal
 * to ensure proper cancellation behavior.
 *
 * @param options - Optional configuration:
 * - `autoAbort` (default: `true`) — automatically aborts the previous execution
 *   before starting a new one.
 * - `timeoutMs` — automatically aborts the execution if it does not complete
 *   within the specified number of milliseconds.
 *
 * @returns An object containing:
 * - `execute(...args)` — executes the wrapped function.
 * - `abort()` — aborts the currently active execution.
 * - `signal` — the current `AbortSignal` or `null` if idle.
 * - `isRunning` — indicates whether an execution is currently in progress.
 *
 * @remarks
 * ### Cancellation contract
 *
 * The wrapped function MUST properly handle the provided `AbortSignal`.
 * If it ignores the signal, cancellation cannot be guaranteed.
 *
 * When an execution is aborted, the returned promise is expected to reject
 * (typically with a `DOMException` named `"AbortError"`).
 * Error handling is intentionally delegated to the consumer.
 *
 * ### Concurrency model
 *
 * With `autoAbort: true` (default):
 * - Starting a new execution aborts the previous one.
 * - Guarantees a single active execution at a time.
 *
 * With `autoAbort: false`:
 * - Multiple executions may run concurrently.
 * - Only the most recent execution can be aborted via `abort()`.
 *
 * ### Timeout behavior
 *
 * If `timeoutMs` is provided, the execution will be aborted automatically
 * after the specified duration. Timeout is implemented via `AbortController`
 * and does not introduce custom error types.
 *
 * @example
 * Basic usage with fetch:
 * ```ts
 * const getUser = withAbortable(
 *   async ({ signal }, id: string) => {
 *     const res = await fetch(`/api/users/${id}`, { signal });
 *     return res.json();
 *   }
 * );
 *
 * await getUser.execute("123");
 * ```
 *
 * @example
 * With timeout:
 * ```ts
 * const loadData = withAbortable(
 *   async ({ signal }) => fetch("/api/data", { signal }),
 *   { timeoutMs: 5000 }
 * );
 * ```
 *
 * @example
 * Manual abort:
 * ```ts
 * const task = withAbortable(async ({ signal }) => {
 *   return longRunningOperation(signal);
 * });
 *
 * const promise = task.execute();
 * task.abort(); // cancels the execution
 * ```
 */
export function withAbortable<Args extends unknown[], R>(
  fn: AbortableFn<Args, R>,
  options: WithAbortableOptions = {},
): WithAbortableReturn<Args, R> {
  const resolvedOptions: WithAbortableOptions = {
    autoAbort: true,
    ...options,
  };

  let controller: AbortController | null = null;
  let isRunning = false;

  function abort() {
    controller?.abort();
    controller = null;
    isRunning = false;
  }

  async function execute(...args: Args): Promise<R> {
    if (resolvedOptions.autoAbort) {
      abort();
    }

    controller = new AbortController();
    isRunning = true;

    const context: AbortableContext = {
      signal: controller.signal,
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (resolvedOptions.timeoutMs != null) {
      timeoutId = setTimeout(() => {
        abort();
      }, resolvedOptions.timeoutMs);
    }

    try {
      return await fn(context, ...args);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      isRunning = false;
      controller = null;
    }
  }

  return {
    execute,
    abort,
    get signal() {
      return controller?.signal ?? null;
    },
    get isRunning() {
      return isRunning;
    },
  };
}

// Usage example:

// const getMessage = withAbortable(
//   ({ signal }, message: string) => Promise.resolve(message),
// );
//
// const mathAdd = withAbortable(
//   ({ signal }, a: number, b: number) =>
//     new Promise<number>((resolve) => {
//       setTimeout(() => resolve(a + b), 1000);
//     }),
// );
//
// const mathSum = withAbortable(
//   ({ signal }, ...numbers: number[]) =>
//     new Promise<number>((resolve) => {
//       setTimeout(() => resolve(numbers.reduce((a, b) => a + b, 0)), 1000);
//     }),
// );
//
// getMessage.execute("Hello").then(console.log);
// mathAdd.execute(1, 2).then(console.log);
// mathSum.execute(1, 2, 3, 4, 5, 6).then(console.log);
