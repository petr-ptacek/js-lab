import { describe, it, expect, vi } from "vitest";
import { withTryCatch }             from "./withTryCatch";

describe("withTryCatch", () => {
  it("returns success result when fn resolves", async () => {
    const result = await withTryCatch({
      fn: () => Promise.resolve(42),
    });

    expect(result.ok).toBe(true);
    if ( result.ok ) {
      expect(result.data).toBe(42);
    }
  });

  it("returns failure result when fn throws", async () => {
    const error = new Error("fail");

    const result = await withTryCatch({
      fn: () => {
        throw error;
      },
    });

    expect(result.ok).toBe(false);
    if ( !result.ok ) {
      expect(result.error).toBe(error);
    }
  });

  it("uses fallback value when fn throws", async () => {
    const result = await withTryCatch<number | null>({
      fn: () => {
        throw new Error("fail");
      },
      fallback: null,
    });

    expect(result.ok).toBe(true);
    if ( result.ok ) {
      expect(result.data).toBeNull();
    }
  });

  it("uses fallback function when fn throws", async () => {
    const fallback = vi.fn(() => 100);

    const result = await withTryCatch<number>({
      fn: () => {
        throw new Error("fail");
      },
      fallback,
    });

    expect(fallback).toHaveBeenCalledOnce();
    expect(result.ok).toBe(true);
    if ( result.ok ) {
      expect(result.data).toBe(100);
    }
  });

  it("maps error using mapError", async () => {
    const result = await withTryCatch<number, string>({
      fn: () => {
        throw new Error("boom");
      },
      mapError: (e) => (e instanceof Error ? e.message : "unknown"),
    });

    expect(result.ok).toBe(false);
    if ( !result.ok ) {
      expect(result.error).toBe("boom");
    }
  });

  it("calls onSuccess when fn succeeds", async () => {
    const onSuccess = vi.fn();

    await withTryCatch({
      fn: () => 123,
      onSuccess,
    });

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess).toHaveBeenCalledWith(123);
  });

  it("calls onError when fn fails", async () => {
    const error = new Error("fail");
    const onError = vi.fn();

    await withTryCatch({
      fn: () => {
        throw error;
      },
      onError,
    });

    expect(onError).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("calls onFinally in success case", async () => {
    const onFinally = vi.fn();

    await withTryCatch({
      fn: () => 1,
      onFinally,
    });

    expect(onFinally).toHaveBeenCalledOnce();
  });

  it("calls onFinally in error case", async () => {
    const onFinally = vi.fn();

    await withTryCatch({
      fn: () => {
        throw new Error("fail");
      },
      onFinally,
    });

    expect(onFinally).toHaveBeenCalledOnce();
  });

  it("does not call onError when fallback produces success", async () => {
    const onError = vi.fn();

    const result = await withTryCatch({
      fn: () => {
        throw new Error("fail");
      },
      fallback: 10,
      onError,
    });

    expect(result.ok).toBe(true);
    expect(onError).not.toHaveBeenCalled();
  });
});
