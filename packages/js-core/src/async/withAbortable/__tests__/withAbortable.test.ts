import { describe, it, expect, vi, beforeEach } from "vitest";
import { withAbortable } from "../withAbortable";

describe("withAbortable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("basic functionality", () => {
    it("executes the wrapped function with provided arguments", async () => {
      const mockFn = vi.fn().mockResolvedValue("result");
      const abortable = withAbortable(mockFn);

      const result = await abortable.execute("arg1", 42);

      expect(result).toBe("result");
      expect(mockFn).toHaveBeenCalledOnce();
      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
        "arg1",
        42,
      );
    });

    it("provides AbortSignal in context", async () => {
      let capturedSignal: AbortSignal | undefined;

      const mockFn = vi.fn().mockImplementation(({ signal }: { signal: AbortSignal }) => {
        capturedSignal = signal;
        return Promise.resolve();
      });

      const abortable = withAbortable(mockFn);
      await abortable.execute();

      expect(capturedSignal).toBeInstanceOf(AbortSignal);
      expect(capturedSignal?.aborted).toBe(false);
    });

    it("updates isRunning state correctly", async () => {
      let resolvePromise: (() => void) | undefined;
      const mockFn = vi.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          resolvePromise = resolve;
        });
      });

      const abortable = withAbortable(mockFn);

      expect(abortable.isRunning).toBe(false);

      const promise = abortable.execute();
      expect(abortable.isRunning).toBe(true);

      resolvePromise?.();
      await promise;

      expect(abortable.isRunning).toBe(false);
    });

    it("provides current signal when running", async () => {
      let resolvePromise: (() => void) | undefined;
      const mockFn = vi.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          resolvePromise = resolve;
        });
      });

      const abortable = withAbortable(mockFn);

      expect(abortable.signal).toBe(null);

      const promise = abortable.execute();
      expect(abortable.signal).toBeInstanceOf(AbortSignal);

      resolvePromise?.();
      await promise;

      expect(abortable.signal).toBe(null);
    });
  });

  describe("auto abort behavior", () => {
    it("aborts previous execution when starting new one (default behavior)", async () => {
      let firstSignal: AbortSignal | undefined;
      let secondSignal: AbortSignal | undefined;

      const mockFn = vi.fn().mockImplementation(({ signal }: { signal: AbortSignal }) => {
        return new Promise<string>((resolve, reject) => {
          if (firstSignal === undefined) {
            firstSignal = signal;
          } else {
            secondSignal = signal;
          }

          signal.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });

          setTimeout(() => resolve("completed"), 100);
        });
      });

      const abortable = withAbortable(mockFn);

      const firstPromise = abortable.execute();
      const secondPromise = abortable.execute();

      expect(firstSignal?.aborted).toBe(true);
      expect(secondSignal?.aborted).toBe(false);

      await expect(firstPromise).rejects.toThrow("Aborted");
      await expect(secondPromise).resolves.toBe("completed");
    });

    it("allows concurrent executions when autoAbort is false", async () => {
      let firstSignal: AbortSignal | undefined;
      let secondSignal: AbortSignal | undefined;

      const mockFn = vi.fn().mockImplementation(({ signal }: { signal: AbortSignal }) => {
        return new Promise<string>((resolve) => {
          if (firstSignal === undefined) {
            firstSignal = signal;
          } else {
            secondSignal = signal;
          }

          setTimeout(() => resolve("completed"), 50);
        });
      });

      const abortable = withAbortable(mockFn, { autoAbort: false });

      const firstPromise = abortable.execute();
      const secondPromise = abortable.execute();

      expect(firstSignal?.aborted).toBe(false);
      expect(secondSignal?.aborted).toBe(false);

      await expect(firstPromise).resolves.toBe("completed");
      await expect(secondPromise).resolves.toBe("completed");
    });
  });

  describe("manual abort", () => {
    it("aborts current execution", async () => {
      let capturedSignal: AbortSignal | undefined;

      const mockFn = vi.fn().mockImplementation(({ signal }: { signal: AbortSignal }) => {
        capturedSignal = signal;
        return new Promise<string>((resolve, reject) => {
          signal.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
          setTimeout(() => resolve("completed"), 100);
        });
      });

      const abortable = withAbortable(mockFn);
      const promise = abortable.execute();

      expect(capturedSignal?.aborted).toBe(false);

      abortable.abort();

      expect(capturedSignal?.aborted).toBe(true);
      expect(abortable.isRunning).toBe(false);
      expect(abortable.signal).toBe(null);

      await expect(promise).rejects.toThrow("Aborted");
    });

    it("has no effect when no execution is active", () => {
      const mockFn = vi.fn().mockResolvedValue("result");
      const abortable = withAbortable(mockFn);

      expect(() => abortable.abort()).not.toThrow();
      expect(abortable.isRunning).toBe(false);
      expect(abortable.signal).toBe(null);
    });
  });

  describe("timeout functionality", () => {
    it("aborts execution after timeout", async () => {
      let capturedSignal: AbortSignal | undefined;

      const mockFn = vi.fn().mockImplementation(({ signal }: { signal: AbortSignal }) => {
        capturedSignal = signal;
        return new Promise<string>((resolve, reject) => {
          signal.addEventListener("abort", () => {
            reject(new DOMException("Timeout", "AbortError"));
          });
          setTimeout(() => resolve("completed"), 200);
        });
      });

      const abortable = withAbortable(mockFn, { timeoutMs: 50 });
      const promise = abortable.execute();

      await expect(promise).rejects.toThrow("Timeout");
      expect(capturedSignal?.aborted).toBe(true);
      expect(abortable.isRunning).toBe(false);
    });

    it("completes successfully when execution finishes before timeout", async () => {
      const mockFn = vi.fn().mockImplementation(({ signal: _ }: { signal: AbortSignal }) => {
        return new Promise<string>((resolve) => {
          setTimeout(() => resolve("completed"), 10);
        });
      });

      const abortable = withAbortable(mockFn, { timeoutMs: 100 });

      await expect(abortable.execute()).resolves.toBe("completed");
    });
  });

  describe("error handling", () => {
    it("propagates errors from wrapped function", async () => {
      const error = new Error("Test error");
      const mockFn = vi.fn().mockRejectedValue(error);

      const abortable = withAbortable(mockFn);

      await expect(abortable.execute()).rejects.toThrow("Test error");
      expect(abortable.isRunning).toBe(false);
      expect(abortable.signal).toBe(null);
    });

    it("cleans up state on error", async () => {
      const mockFn = vi.fn().mockImplementation(() => {
        throw new Error("Sync error");
      });

      const abortable = withAbortable(mockFn);

      await expect(abortable.execute()).rejects.toThrow("Sync error");
      expect(abortable.isRunning).toBe(false);
      expect(abortable.signal).toBe(null);
    });
  });

  describe("edge cases", () => {
    it("handles function with no arguments", async () => {
      const mockFn = vi.fn().mockResolvedValue("no-args");
      const abortable = withAbortable(mockFn);

      const result = await abortable.execute();

      expect(result).toBe("no-args");
      expect(mockFn).toHaveBeenCalledOnce();
      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    it("handles function with multiple executions in sequence", async () => {
      const mockFn = vi.fn()
        .mockResolvedValueOnce("first")
        .mockResolvedValueOnce("second");

      const abortable = withAbortable(mockFn);

      const firstResult = await abortable.execute();
      const secondResult = await abortable.execute();

      expect(firstResult).toBe("first");
      expect(secondResult).toBe("second");
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("works with different return types", async () => {
      const numberFn = withAbortable(async ({ signal: _ }) => 42);
      const objectFn = withAbortable(async ({ signal: _ }) => ({ key: "value" }));
      const arrayFn = withAbortable(async ({ signal: _ }) => [1, 2, 3]);

      await expect(numberFn.execute()).resolves.toBe(42);
      await expect(objectFn.execute()).resolves.toEqual({ key: "value" });
      await expect(arrayFn.execute()).resolves.toEqual([1, 2, 3]);
    });
  });
});
