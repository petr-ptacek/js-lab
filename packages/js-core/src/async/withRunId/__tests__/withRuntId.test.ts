import { describe, expect, it } from "vitest";
import { withRunId } from "../withRunId";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("withRunId - stress test", () => {
  it("queue: should process 100 calls sequentially without parallelism", async () => {
    let running = 0;
    let maxRunning = 0;

    const fn = async (_: any, i: number) => {
      running++;
      maxRunning = Math.max(maxRunning, running);

      await delay(2);

      running--;
      return i;
    };

    const ctrl = withRunId(fn, { strategy: "queue" });

    const promises = Array.from({ length: 100 }, (_, i) => ctrl.execute(i));

    const results = await Promise.all(promises);

    expect(maxRunning).toBe(1);

    results.forEach((res, i) => {
      expect(res.status).toBe("success");
      if (res.status === "success") {
        expect(res.result).toBe(i);
      }
    });
  });

  it("replace: only last result should be valid", async () => {
    const fn = async (_: any, i: number) => {
      await delay(5);
      return i;
    };

    const ctrl = withRunId(fn, { strategy: "replace" });

    const promises = Array.from({ length: 50 }, (_, i) => ctrl.execute(i));

    const results = await Promise.all(promises);

    const successResults = results.filter((r) => r.status === "success");

    expect(successResults.length).toBe(1);

    const last = successResults[0];
    if (last?.status === "success") {
      expect(last.result).toBe(49);
    }

    const replacedCount = results.filter((r) => r.status === "replaced").length;

    expect(replacedCount).toBeGreaterThan(0);
  });

  it("drop: should skip most calls under load", async () => {
    const fn = async () => {
      await delay(5);
      return 1;
    };

    const ctrl = withRunId(fn, { strategy: "drop" });

    const promises = Array.from({ length: 50 }, () => ctrl.execute());

    const results = await Promise.all(promises);

    const successCount = results.filter((r) => r.status === "success").length;

    const skippedCount = results.filter((r) => r.status === "skipped").length;

    expect(successCount).toBe(1);
    expect(skippedCount).toBeGreaterThan(0);
  });

  it("should remain stable under mixed timing conditions", async () => {
    const fn = async (_: any, i: number) => {
      await delay(Math.random() * 5);
      return i;
    };

    const ctrl = withRunId(fn, { strategy: "queue" });

    const promises = Array.from({ length: 100 }, (_, i) => ctrl.execute(i));

    const results = await Promise.all(promises);

    results.forEach((r) => {
      expect(r.status).toBe("success");
    });
  });

  it("should not leak state after many runs", async () => {
    const fn = async () => 1;

    const ctrl = withRunId(fn, { strategy: "queue" });

    for (let i = 0; i < 100; i++) {
      await ctrl.execute();
    }

    expect(ctrl.isRunning).toBe(false);
    expect(ctrl.currentRunId).toBe(null);
  });
});
