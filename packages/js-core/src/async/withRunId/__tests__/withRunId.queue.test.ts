import { describe, expect, it, vi } from "vitest";
import { withRunId } from "../withRunId";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("withRunId - queue", () => {
  it("should execute calls sequentially (FIFO)", async () => {
    const order: number[] = [];

    const fn = async (_: any, n: number) => {
      await delay(20);
      order.push(n);
      return n;
    };

    const ctrl = withRunId(fn, { strategy: "queue" });

    const p1 = ctrl.execute(1);
    const p2 = ctrl.execute(2);
    const p3 = ctrl.execute(3);

    const r1 = await p1;
    const r2 = await p2;
    const r3 = await p3;

    expect(order).toEqual([1, 2, 3]);

    expect(r1.status).toBe("success");
    expect(r2.status).toBe("success");
    expect(r3.status).toBe("success");
  });

  it("should not run in parallel", async () => {
    let running = 0;
    let maxRunning = 0;

    const fn = async () => {
      running++;
      maxRunning = Math.max(maxRunning, running);

      await delay(30);

      running--;
      return 1;
    };

    const ctrl = withRunId(fn, { strategy: "queue" });

    await Promise.all([ctrl.execute(), ctrl.execute(), ctrl.execute()]);

    expect(maxRunning).toBe(1);
  });

  it("should cancel queued items", async () => {
    const fn = async () => {
      await delay(50);
      return 1;
    };

    const ctrl = withRunId(fn, { strategy: "queue" });

    const p1 = ctrl.execute();
    const p2 = ctrl.execute();
    const p3 = ctrl.execute();

    ctrl.cancel();

    const r1 = await p1;
    const r2 = await p2;
    const r3 = await p3;

    expect(r2.status).toBe("canceled");
    expect(r3.status).toBe("canceled");
    expect(["success", "replaced", "canceled"]).toContain(r1.status);
  });

  it("should propagate error in queue", async () => {
    const fn = vi.fn().mockResolvedValueOnce(1).mockRejectedValueOnce(new Error("fail"));

    const ctrl = withRunId(fn, { strategy: "queue" });

    const r1 = await ctrl.execute();
    const r2 = await ctrl.execute();

    expect(r1.status).toBe("success");
    expect(r2.status).toBe("error");
  });
});
