import { describe, it, expect, vi } from "vitest";
import { withTryCatchSync } from "../withTryCatchSync";

describe("withTryCatchSync", () => {
  it("returns success result when fn succeeds", () => {
    const result = withTryCatchSync(
      () => 42,
      {},
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toBe(42);
    }
  });

  it("returns failure result when fn throws", () => {
    const error = new Error("fail");

    const result = withTryCatchSync(
      () => {
        throw error;
      },
      {},
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(error);
    }
  });

  it("uses fallback value when fn throws", () => {
    const result = withTryCatchSync<number | null>(
      () => {
        throw new Error("fail");
      },
      {
        fallback: null,
      },
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toBeNull();
    }
  });

  it("uses fallback function when fn throws", () => {
    const fallback = vi.fn(() => 100);

    const result = withTryCatchSync(
      () => {
        throw new Error("fail");
      },
      {
        fallback,
      },
    );

    expect(fallback).toHaveBeenCalledOnce();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toBe(100);
    }
  });

  it("maps error using mapError", () => {
    const result = withTryCatchSync<number, string>(
      () => {
        throw new Error("boom");
      },
      {
        mapError: (e) => (e instanceof Error ? e.message : "unknown"),
      },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("boom");
    }
  });

  it("calls onSuccess when fn succeeds", () => {
    const onSuccess = vi.fn();

    withTryCatchSync(
      () => 10,
      {
        onSuccess,
      },
    );

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess).toHaveBeenCalledWith(10);
  });

  it("calls onError when fn fails and no fallback is used", () => {
    const error = new Error("fail");
    const onError = vi.fn();

    withTryCatchSync(
      () => {
        throw error;
      },
      {
        onError,
      },
    );

    expect(onError).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("does not call onError when fallback converts failure to success", () => {
    const onError = vi.fn();

    const result = withTryCatchSync(
      () => {
        throw new Error("fail");
      },
      {
        fallback: 123,
        onError,
      },
    );

    expect(result.ok).toBe(true);
    expect(onError).not.toHaveBeenCalled();
  });

  it("calls onFinally on success", () => {
    const onFinally = vi.fn();

    withTryCatchSync(
      () => 1,
      {
        onFinally,
      },
    );

    expect(onFinally).toHaveBeenCalledOnce();
  });

  it("calls onFinally on failure", () => {
    const onFinally = vi.fn();

    withTryCatchSync(
      () => {
        throw new Error("fail");
      },
      {
        onFinally,
      },
    );

    expect(onFinally).toHaveBeenCalledOnce();
  });

  it("invokes callbacks after result is resolved", () => {
    const calls: string[] = [];

    const result = withTryCatchSync(
      () => {
        calls.push("fn");
        return 1;
      },
      {
        onSuccess: () => calls.push("onSuccess"),
        onFinally: () => calls.push("onFinally"),
      },
    );

    expect(result.ok).toBe(true);
    expect(calls).toEqual(["fn", "onSuccess", "onFinally"]);
  });
});
