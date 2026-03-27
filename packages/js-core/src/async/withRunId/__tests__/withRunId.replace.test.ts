import { describe, expect, it, vi } from "vitest";
import { withRunId } from "../withRunId";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("withRunId - replace", () => {
  it("should replace previous execution", async () => {
    const fn = async (_: any, value: number) => {
      await delay(50);
      return value;
    };

    const ctrl = withRunId(fn, { strategy: "replace" });

    const p1 = ctrl.execute(1);
    const p2 = ctrl.execute(2);

    const r1 = await p1;
    const r2 = await p2;

    expect(r1.status).toBe("replaced");
    expect(r2.status).toBe("success");
  });

  it("should only keep last result valid", async () => {
    const fn = async (_: any, value: number) => {
      await delay(30);
      return value;
    };

    const ctrl = withRunId(fn, { strategy: "replace" });

    const p1 = ctrl.execute(1);
    const p2 = ctrl.execute(2);
    const p3 = ctrl.execute(3);

    const r1 = await p1;
    const r2 = await p2;
    const r3 = await p3;

    expect(r1.status).toBe("replaced");
    expect(r2.status).toBe("replaced");
    expect(r3.status).toBe("success");
  });

  it("should not enforce sequential execution", async () => {
    let calls = 0;

    const fn = async () => {
      calls++;
      await delay(50);
      return calls;
    };

    const ctrl = withRunId(fn, { strategy: "replace" });

    const results = await Promise.all([ctrl.execute(), ctrl.execute(), ctrl.execute()]);

    const success = results.find((r) => r.status === "success");

    expect(success).toBeDefined();
  });

  it("should handle error in latest execution", async () => {
    const fn = vi.fn().mockResolvedValueOnce(1).mockRejectedValueOnce(new Error("fail"));

    const ctrl = withRunId(fn, { strategy: "replace" });

    const p1 = ctrl.execute();
    const p2 = ctrl.execute();

    const r1 = await p1;
    const r2 = await p2;

    expect(r1.status).toBe("replaced");
    expect(r2.status).toBe("error");
  });

  it("should cancel active execution", async () => {
    const fn = async () => {
      await delay(50);
      return 1;
    };

    const ctrl = withRunId(fn, { strategy: "replace" });

    const p1 = ctrl.execute();
    ctrl.cancel();

    const r1 = await p1;

    expect(["canceled", "replaced"]).toContain(r1.status);
  });
});
