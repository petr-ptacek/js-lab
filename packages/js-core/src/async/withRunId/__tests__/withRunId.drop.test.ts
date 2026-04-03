import { describe, expect, it, vi } from "vitest";
import { withRunId } from "../withRunId";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("withRunId - drop", () => {
  it("should execute first call and skip next while running", async () => {
    const fn = vi.fn(async () => {
      await delay(50);
      return 1;
    });

    const ctrl = withRunId(fn, { strategy: "drop" });

    const p1 = ctrl.execute();
    const p2 = ctrl.execute();

    const r1 = await p1;
    const r2 = await p2;

    expect(r1.status).toBe("success");
    expect(r2.status).toBe("skipped");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should allow next call after previous finishes", async () => {
    const fn = vi.fn(async () => 1);

    const ctrl = withRunId(fn, { strategy: "drop" });

    const r1 = await ctrl.execute();
    const r2 = await ctrl.execute();

    expect(r1.status).toBe("success");
    expect(r2.status).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should return canceled if aborted before execution", async () => {
    const ac = new AbortController();
    ac.abort();

    const ctrl = withRunId(async () => 1, {
      strategy: "drop",
      signal: ac.signal,
    });

    const res = await ctrl.execute();

    expect(res.status).toBe("canceled");
  });

  it("should handle error (default mode)", async () => {
    const ctrl = withRunId(async () => {
      throw new Error("fail");
    });

    const res = await ctrl.execute();

    expect(res.status).toBe("error");
  });

  it("should throw error when throwOnError = true", async () => {
    const ctrl = withRunId(
      async () => {
        throw new Error("fail");
      },
      { throwOnError: true },
    );

    await expect(ctrl.execute()).rejects.toThrow("fail");
  });
});
