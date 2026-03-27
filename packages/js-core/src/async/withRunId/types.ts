/**
 * Strategy that defines how concurrent `run()` calls are handled
 * when a previous execution is still in progress.
 *
 * This directly controls concurrency behavior of the wrapped function.
 *
 * @remarks
 * The strategy only affects scheduling — it does NOT guarantee
 * cancellation of the underlying async operation unless explicitly handled by the consumer.
 */
export type WithRunIdStrategy =
  /**
   * Ignores the new invocation if a run is already in progress.
   *
   * @remarks
   * - No new execution is started
   * - The returned Promise resolves immediately with `undefined`
   * - Useful for idempotent triggers (e.g. button spam protection)
   */
  | "drop"

  /**
   * Enqueues the invocation and executes it after all previous runs complete.
   *
   * @remarks
   * - FIFO order is guaranteed
   * - Every invocation is executed
   * - Suitable for sequential processing (e.g. mutations, writes)
   */
  | "queue"

  /**
   * Starts a new run immediately and invalidates the previous one.
   *
   * @remarks
   * - Previous run is NOT physically cancelled
   * - Its result is ignored if it resolves later (stale result protection)
   * - Suitable for "latest wins" scenarios (e.g. search, fetch)
   */
  | "replace";

/**
 * Configuration options for {@link withRunId}.
 */
export interface WithRunIdOptions {
  /**
   * Concurrency strategy used when `run()` is invoked while another run is active.
   *
   * @defaultValue "drop"
   */
  strategy?: WithRunIdStrategy;

  /**
   * Optional external cancellation signal.
   *
   * @remarks
   * - Checked before execution starts
   * - Does NOT automatically cancel an already running async operation
   * - Can be combined with custom logic inside the wrapped function
   */
  signal?: AbortSignal;

  /**
   * Controls how errors thrown by the wrapped function are handled.
   *
   * @defaultValue false
   *
   * @remarks
   * - `false` (default): errors are captured and returned as
   *   `{ status: "error", error }` in the result.
   *   This allows handling all outcomes through a single, unified result type
   *   without using `try/catch`.
   *
   * - `true`: errors are re-thrown and the returned Promise is rejected.
   *   This enables standard exception-based flow using `try/catch`.
   *
   * @example
   * // result-based handling (default)
   * const res = await execute();
   * if (res.status === "error") {
   *   console.error(res.error);
   * }
   *
   * @example
   * // exception-based handling
   * const controller = withRunId(fn, { throwOnError: true });
   *
   * try {
   *   await controller.execute();
   * } catch (err) {
   *   console.error(err);
   * }
   */
  throwOnError?: boolean;
}

/**
 * Metadata associated with a single run execution.
 *
 * Can be used to implement advanced patterns such as:
 * - stale result guards
 * - request deduplication
 * - cooperative cancellation
 */
export interface WithRunIdContext {
  /**
   * Monotonically increasing identifier of the run.
   *
   * @remarks
   * - Unique within a single `withRunId` instance
   * - Can be used to detect stale executions
   */
  runId: number;
}

/**
 * Result of a single `execute()` call in {@link withRunId}.
 *
 * This type is a discriminated union that describes how the execution
 * was handled and whether it produced a usable result.
 *
 * @typeParam TResult - The successful result type returned by the wrapped function
 *
 * @remarks
 * Not every call to `execute()` results in an actual execution.
 * The `status` field explicitly indicates what happened.
 *
 * Possible states:
 * - `success` → the function was executed and returned a result
 * - `skipped` → execution was ignored (strategy: "drop")
 * - `replaced` → execution became stale and its result was ignored (strategy: "replace")
 * - `canceled` → execution was canceled (via `cancel()` or `AbortSignal`)
 */
export type WithRunIdResult<TResult> =
  /**
   * Execution completed successfully.
   *
   * @remarks
   * - The wrapped function was executed
   * - The result is valid and can be safely used
   */
  | {
      status: "success";
      result: TResult;
    }

  /**
   * Execution was skipped.
   *
   * @remarks
   * - Occurs when strategy is `"drop"` and a run is already active
   * - The function was NOT executed
   */
  | {
      status: "skipped";
    }

  /**
   * Execution was replaced by a newer call.
   *
   * @remarks
   * - Occurs when strategy is `"replace"`
   * - The function WAS executed, but its result is considered stale
   * - The result is intentionally ignored to prevent race conditions
   */
  | {
      status: "replaced";
    }

  /**
   * Execution was canceled.
   *
   * @remarks
   * - Triggered by calling `cancel()` or via an aborted `AbortSignal`
   * - Pending queued executions are also resolved with this status
   * - The underlying async operation may still be running,
   *   but its result is discarded
   */
  | {
      status: "canceled";
    }
  /**
   * Execution failed with an error thrown by the wrapped function.
   *
   * @remarks
   * - Occurs when the underlying function throws or returns a rejected Promise
   * - Returned only when `throwOnError` is set to `false` (default)
   * - If `throwOnError` is `true`, the error is re-thrown instead
   *   and this state is never returned
   *
   * @property error - The original error thrown by the wrapped function
   *
   * @example
   * const res = await execute();
   *
   * if (res.status === "error") {
   *   console.error(res.error);
   * }
   */
  | {
      status: "error";
      error: unknown;
    };

/**
 * Controller returned by {@link withRunId}.
 *
 * Provides imperative control over execution as well as runtime state inspection.
 *
 * @template TArgs Argument types of the wrapped function
 * @template TResult Result type of the wrapped function
 */
export interface WithRunIdReturn<TArgs extends unknown[], TResult> {
  /**
   * Executes the wrapped function according to the configured strategy.
   *
   * @param args - Arguments forwarded to the original function
   *
   * @returns
   * A Promise resolving to:
   * - `TResult` → when the execution completes successfully
   * - `undefined` → when the execution was skipped or invalidated
   *
   * @remarks
   * `undefined` can occur in these cases:
   * - strategy = "drop" and a run is already active
   * - strategy = "replace" and this run becomes stale
   * - execution is prevented by an aborted signal
   */
  execute: (...args: TArgs) => Promise<WithRunIdResult<TResult>>;

  /**
   * Cancels the current execution state.
   *
   * @remarks
   * - Clears the active run
   * - Empties the internal queue
   * - Pending queued Promises are resolved with `undefined`
   *
   * ⚠️ Does NOT cancel the underlying async function
   * unless it explicitly supports cancellation (e.g. via AbortSignal)
   */
  cancel: () => void;

  /**
   * Indicates whether a run is currently active.
   *
   * @remarks
   * - `true` → a run is in progress
   * - `false` → idle state (queue may still exist depending on implementation)
   */
  readonly isRunning: boolean;

  /**
   * Identifier of the currently active run.
   *
   * @remarks
   * - `null` (or equivalent) when no run is active
   * - Changes on every new execution
   * - Useful for debugging or advanced control flows
   */
  readonly currentRunId: number | null;
}
