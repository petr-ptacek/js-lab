/**
 * Execution context provided to the wrapped function.
 *
 * Contains the {@link AbortSignal} associated with the current execution.
 * The wrapped function MUST respect this signal to support proper cancellation.
 *
 * @remarks
 * If the signal is aborted:
 * - The wrapped function should stop its work as soon as possible.
 * - The returned promise is expected to reject (typically with an `"AbortError"`).
 *
 * The context object is recreated for each execution.
 */
export type AbortableContext = {
  /**
   * Abort signal bound to the current execution.
   */
  signal: AbortSignal;
};

/**
 * Asynchronous function compatible with {@link withAbortable}.
 *
 * @typeParam Args - Tuple of argument types accepted by the function.
 * @typeParam R - Resolved return type of the function.
 *
 * @param context - Execution {@link AbortableContext} containing an `AbortSignal`.
 * @param args - Arguments forwarded from `execute(...)`.
 *
 * @returns A promise resolving to type `R`.
 *
 * @remarks
 * The function MUST properly handle the provided `AbortSignal`.
 * If it ignores the signal, cancellation guarantees are not enforced.
 */
export type AbortableFn<Args extends unknown[], R> =
  (context: AbortableContext, ...args: Args) => Promise<R>;

/**
 * Configuration options for {@link withAbortable}.
 */
export type WithAbortableOptions = {
  /**
   * If `true` (default), the previous execution is aborted before a new one starts.
   *
   * This enforces a single-active-execution model ("latest execution wins").
   *
   * If `false`, multiple executions may run concurrently.
   */
  autoAbort?: boolean;

  /**
   * Optional timeout in milliseconds.
   *
   * If specified, the execution will be automatically aborted after
   * the given duration if it has not yet completed.
   *
   * Timeout is implemented via `AbortController` and does not introduce
   * custom error types.
   */
  timeoutMs?: number;
}

/**
 * Return type of {@link withAbortable}.
 *
 * Provides execution control and lifecycle state access.
 */
export type WithAbortableReturn<Args extends unknown[], R> = {
  /**
   * Executes the wrapped function with the provided arguments.
   *
   * If `autoAbort` is enabled, any currently running execution
   * is aborted before starting a new one.
   *
   * @throws Will propagate any error thrown by the wrapped function,
   * including abort-related errors.
   */
  execute: (...args: Args) => Promise<R>;

  /**
   * Aborts the currently active execution, if any.
   *
   * If no execution is active, this method has no effect.
   */
  abort: () => void;

  /**
   * The `AbortSignal` of the currently active execution,
   * or `null` if no execution is in progress.
   */
  readonly signal: AbortSignal | null;

  /**
   * Indicates whether an execution is currently in progress.
   */
  readonly isRunning: boolean;
}
