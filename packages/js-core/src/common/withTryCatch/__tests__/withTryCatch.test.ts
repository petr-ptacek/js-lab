import { describe, it, expect, vi } from "vitest";
import { withTryCatch } from "../withTryCatch";

describe("withTryCatch (async)", () => {
  it("returns success result when fn resolves", async () => {
    const result = await withTryCatch(async () => 42);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toBe(42);
    }
  });

  it("returns failure result when fn throws and no fallback is provided", async () => {
    const error = new Error("fail");

    const result = await withTryCatch(async () => {
      throw error;
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(error);
      expect("data" in result).toBe(false);
    }
  });

  it("returns failure result with data when fallback value is provided", async () => {
    const result = await withTryCatch<number | null>(
      async () => {
        throw new Error("fail");
      },
      {
        fallback: null,
      },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.data).toBeNull();
    }
  });

  it("uses fallback function when fn throws", async () => {
    const error = new Error("fail");
    const fallback = vi.fn(() => 100);

    const result = await withTryCatch(
      async () => {
        throw error;
      },
      {
        fallback,
      },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.data).toBe(100);
      expect(result.error).toBe(error);
    }

    expect(fallback).toHaveBeenCalledOnce();
    expect(fallback).toHaveBeenCalledWith(error);
  });

  it("maps error using mapError", async () => {
    const result = await withTryCatch<number, string>(
      async () => {
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

  it("calls onSuccess when fn succeeds", async () => {
    const onSuccess = vi.fn();

    await withTryCatch(async () => 10, {
      onSuccess,
    });

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess).toHaveBeenCalledWith(10);
  });

  it("calls onError when fn fails without fallback", async () => {
    const error = new Error("fail");
    const onError = vi.fn();

    await withTryCatch(async () => {
      throw error;
    }, {
      onError,
    });

    expect(onError).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("calls onError when fn fails even if fallback is provided", async () => {
    const error = new Error("fail");
    const onError = vi.fn();

    const result = await withTryCatch(
      async () => {
        throw error;
      },
      {
        fallback: 123,
        onError,
      },
    );

    expect(result.ok).toBe(false);
    expect(onError).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("calls onFinally on success", async () => {
    const onFinally = vi.fn();

    await withTryCatch(async () => 1, {
      onFinally,
    });

    expect(onFinally).toHaveBeenCalledOnce();
  });

  it("calls onFinally on failure", async () => {
    const onFinally = vi.fn();

    await withTryCatch(async () => {
      throw new Error("fail");
    }, {
      onFinally,
    });

    expect(onFinally).toHaveBeenCalledOnce();
  });

  it("invokes callbacks after result is resolved", async () => {
    const calls: string[] = [];

    const result = await withTryCatch(
      async () => {
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
