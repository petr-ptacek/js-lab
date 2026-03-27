import type { MaybePromise } from "../../type";
import type {
  WithRunIdContext,
  WithRunIdOptions,
  WithRunIdResult,
  WithRunIdReturn,
  WithRunIdStrategy,
} from "./types";

/**
 * Wraps a function with controlled execution semantics based on a run identifier (`runId`).
 *
 * This utility ensures deterministic handling of concurrent calls by applying
 * a configurable strategy (`drop`, `queue`, or `replace`).
 *
 * It is designed to prevent race conditions and provide predictable behavior
 * when the same async operation is triggered multiple times.
 *
 * @param fn - Function to wrap. Receives a {@link WithRunIdContext} as the first argument.
 * The context contains a unique `runId` for each execution.
 *
 * @param options - Optional configuration:
 * - `strategy` — controls how concurrent executions are handled
 * - `signal` — optional external AbortSignal (checked before execution)
 * - `throwOnError` — controls whether errors are thrown or returned in the result
 *
 * @returns A controller object with:
 * - `execute(...args)` — runs the function according to the selected strategy
 * - `cancel()` — cancels current execution and clears queued calls
 * - `isRunning` — indicates if a run is currently active
 * - `currentRunId` — identifier of the currently active execution
 *
 * @remarks
 *
 * ## Concurrency model
 *
 * This utility guarantees that execution behavior is deterministic
 * even under rapid or concurrent invocations.
 *
 * Depending on the selected strategy:
 *
 * - `"drop"` → ignores new calls while a run is active
 * - `"queue"` → executes calls sequentially (FIFO)
 * - `"replace"` → invalidates the previous run and starts a new one
 *
 * ## Stale result protection
 *
 * Each execution is assigned a unique `runId`.
 * If a previous execution resolves after a newer one has started,
 * its result is considered **stale** and is ignored.
 *
 * This prevents race conditions such as outdated API responses overriding newer data.
 *
 * ## Cancellation
 *
 * Calling `cancel()`:
 * - clears the active execution
 * - resolves all queued executions with `{ status: "canceled" }`
 *
 * Note that this does NOT cancel the underlying async operation
 * unless it explicitly supports cancellation (e.g. via AbortSignal).
 *
 * ## Error handling
 *
 * Controlled by `throwOnError`:
 *
 * - `false` (default):
 *   - errors are returned as `{ status: "error", error }`
 *   - no need for `try/catch`
 *
 * - `true`:
 *   - errors are re-thrown
 *   - consumer must use `try/catch`
 *
 * ## Execution result
 *
 * The `execute()` method returns a {@link WithRunIdResult}, which describes
 * how the execution was handled:
 *
 * - `success` → execution completed successfully
 * - `skipped` → execution was ignored (`drop`)
 * - `replaced` → execution became stale (`replace`)
 * - `canceled` → execution was canceled
 * - `error` → execution failed
 *
 * ## Guarantees
 *
 * - No parallel execution (unless explicitly allowed by strategy design)
 * - Deterministic ordering (`queue`)
 * - Protection against stale results (`replace`)
 * - Explicit execution outcome via result type
 *
 * ## Non-goals
 *
 * - Does NOT cancel underlying async operations
 * - Does NOT manage side effects inside the wrapped function
 *
 * @example
 * Basic usage:
 * ```ts
 * const fetchUser = withRunId(
 *   async (_ctx, id: string) => {
 *     const res = await fetch(`/api/users/${id}`);
 *     return res.json();
 *   },
 *   { strategy: "replace" }
 * );
 *
 * const res = await fetchUser.execute("123");
 *
 * if (res.status === "success") {
 *   console.log(res.result);
 * }
 * ```
 *
 * @example
 * Queue execution:
 * ```ts
 * const save = withRunId(async (_ctx, data: any) => {
 *   await api.save(data);
 * }, { strategy: "queue" });
 *
 * await save.execute(a);
 * await save.execute(b);
 * // executed sequentially
 * ```
 *
 * @example
 * Drop strategy (prevent spam):
 * ```ts
 * const submit = withRunId(async () => {
 *   await api.submit();
 * }, { strategy: "drop" });
 *
 * submit.execute();
 * submit.execute(); // ignored
 * ```
 *
 * @example
 * Using runId for advanced control:
 * ```ts
 * const fn = withRunId(async ({ runId }) => {
 *   console.log("run:", runId);
 * });
 * ```
 */
export function withRunId<TArgs extends unknown[], TResult>(
  fn: (ctx: WithRunIdContext, ...args: TArgs) => MaybePromise<TResult>,
  options: WithRunIdOptions = {},
): WithRunIdReturn<TArgs, TResult> {
  const strategy: WithRunIdStrategy = options.strategy ?? "drop";
  const throwOnError = options.throwOnError ?? false;

  let runId = 0;
  let activeRunId: number | null = null;

  let queue: Array<{
    args: TArgs;
    resolve: (value: WithRunIdResult<TResult>) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  // register abort listener once
  if (options.signal) {
    options.signal.addEventListener("abort", cancel, { once: true });
  }

  function processQueue() {
    if (activeRunId !== null) return;
    if (queue.length === 0) return;

    const item = queue.shift()!;
    const nextId = ++runId;

    activeRunId = nextId;

    executeInternal(nextId, item.args).then(item.resolve).catch(item.reject);
  }

  async function executeInternal(
    runIdLocal: number,
    args: TArgs,
  ): Promise<WithRunIdResult<TResult>> {
    try {
      if (options.signal?.aborted) {
        return { status: "canceled" };
      }

      const result = await fn({ runId: runIdLocal }, ...args);

      // stale (replaced)
      if (activeRunId !== runIdLocal) {
        return { status: "replaced" };
      }

      return {
        status: "success",
        result,
      };
    } catch (error) {
      if (throwOnError) {
        throw error;
      }

      return {
        status: "error",
        error,
      };
    } finally {
      if (activeRunId === runIdLocal) {
        activeRunId = null;
        processQueue();
      }
    }
  }

  function execute(...args: TArgs): Promise<WithRunIdResult<TResult>> {
    if (options.signal?.aborted) {
      return Promise.resolve({ status: "canceled" });
    }

    const nextId = ++runId;

    if (activeRunId !== null) {
      switch (strategy) {
        case "drop":
          return Promise.resolve({ status: "skipped" });

        case "queue":
          return new Promise<WithRunIdResult<TResult>>((resolve, reject) => {
            queue.push({ args, resolve, reject });
          });

        case "replace":
          activeRunId = nextId;
          return executeInternal(nextId, args);
      }
    }

    activeRunId = nextId;
    return executeInternal(nextId, args);
  }

  function cancel() {
    activeRunId = null;

    for (const item of queue) {
      item.resolve({ status: "canceled" });
    }

    queue = [];
  }

  return {
    execute,
    cancel,

    get isRunning() {
      return activeRunId !== null;
    },

    get currentRunId() {
      return activeRunId;
    },
  };
}
