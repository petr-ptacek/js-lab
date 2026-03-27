import type { MaybePromise } from "../../type";
import type {
  WithRunIdContext,
  WithRunIdOptions,
  WithRunIdResult,
  WithRunIdReturn,
  WithRunIdStrategy,
} from "./types";

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
