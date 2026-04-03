import { withRunId } from "../withRunId";
import type {
  AbortableContext,
  AbortableFn,
  WithAbortableOptions,
  WithAbortableReturn,
} from "./types";

/**
 * Wraps an asynchronous function with AbortController lifecycle management.
 *
 * This utility provides deterministic cancellation semantics for async tasks
 * (typically API calls) by automatically creating and controlling an
 * `AbortController` instance for each execution.
 *
 * Starting a new execution always aborts the previous one ("latest execution wins"),
 * guaranteeing a single active execution at a time.
 *
 * @param fn - An asynchronous function that receives a {@link AbortableContext}
 * containing an `AbortSignal`. The function MUST respect the provided signal
 * to ensure proper cancellation behavior.
 *
 * @param options - Optional configuration:
 * - `timeoutMs` — automatically aborts the execution if it does not complete
 *   within the specified number of milliseconds.
 *
 * @returns An object containing:
 * - `execute(...args)` — executes the wrapped function.
 * - `cancel()` — aborts the currently active execution.
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
 * Starting a new execution always aborts the previous one.
 * This guarantees a single active execution at a time.
 *
 * Stale result protection is handled internally via {@link withRunId} with
 * `strategy: "replace"`, ensuring that only the latest execution can resolve.
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
 * Manual cancel:
 * ```ts
 * const task = withAbortable(async ({ signal }) => {
 *   return longRunningOperation(signal);
 * });
 *
 * const promise = task.execute();
 * task.cancel(); // aborts the execution
 * ```
 */
export function withAbortable<Args extends unknown[], TResult>(
  fn: AbortableFn<Args, TResult>,
  options: WithAbortableOptions = {},
): WithAbortableReturn<Args, TResult> {
  // Holds the AbortController of the currently active execution.
  // Managed inside the wrapped fn and cleared on completion or cancellation.
  let controller: AbortController | null = null;

  // Internal runner delegates concurrency control and stale result protection
  // to withRunId. "replace" strategy ensures only the latest execution is active.
  // throwOnError: true propagates errors directly as Promise rejections.
  const runner = withRunId(
    async (_ctx, ...args: Args): Promise<TResult> => {
      const currentController = new AbortController();
      controller = currentController;

      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      if (options.timeoutMs != null) {
        timeoutId = setTimeout(() => {
          currentController.abort();
        }, options.timeoutMs);
      }

      const context: AbortableContext = { signal: currentController.signal };

      try {
        return await fn(context, ...args);
      } finally {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        // Only clear the outer reference if this execution is still current.
        // A newer execution may have already replaced the controller.
        if (controller === currentController) {
          controller = null;
        }
      }
    },
    { strategy: "replace", throwOnError: true },
  );

  function cancel(): void {
    controller?.abort();
    controller = null;
    runner.cancel();
  }

  async function execute(...args: Args): Promise<TResult> {
    // Always abort the previous execution before starting a new one.
    controller?.abort();

    const result = await runner.execute(...args);

    if (result.status === "success") {
      return result.result;
    }

    // "replaced" — execution was superseded by a newer call; treat as aborted.
    throw new DOMException("Aborted", "AbortError");
  }

  return {
    execute,
    cancel,
    get signal() {
      return controller?.signal ?? null;
    },
    get isRunning() {
      return runner.isRunning;
    },
  };
}
