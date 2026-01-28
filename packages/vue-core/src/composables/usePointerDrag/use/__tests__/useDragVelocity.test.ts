import { describe, it, expect } from "vitest";

import { useDragVelocity } from "../useDragVelocity";

describe("useDragVelocity", () => {
  it("starts with zero velocity", () => {
    const { vx, vy } = useDragVelocity();

    expect(vx.value).toBe(0);
    expect(vy.value).toBe(0);
  });

  it("does not produce velocity on first update", () => {
    const { vx, vy, update } = useDragVelocity();

    update(10, 20, 1000);

    expect(vx.value).toBe(0);
    expect(vy.value).toBe(0);
  });

  it("computes velocity from delta difference over time", () => {
    const { vx, vy, update } = useDragVelocity();

    update(0, 0, 1000);
    update(10, 20, 1010); // dt = 10

    expect(vx.value).toBe(1);  // (10 - 0) / 10
    expect(vy.value).toBe(2);  // (20 - 0) / 10
  });

  it("updates velocity on subsequent updates", () => {
    const { vx, vy, update } = useDragVelocity();

    update(0, 0, 1000);
    update(10, 10, 1010);
    update(30, 25, 1020); // dt = 10

    expect(vx.value).toBe(2);   // (30 - 10) / 10
    expect(vy.value).toBe(1.5); // (25 - 10) / 10
  });

  it("ignores updates with non-positive dt", () => {
    const { vx, vy, update } = useDragVelocity();

    update(0, 0, 1000);
    update(10, 10, 1000); // dt = 0 → ignored

    expect(vx.value).toBe(0);
    expect(vy.value).toBe(0);
  });

  it("keeps previous velocity when dt <= 0", () => {
    const { vx, vy, update } = useDragVelocity();

    update(0, 0, 1000);
    update(10, 10, 1010);

    expect(vx.value).toBe(1);
    expect(vy.value).toBe(1);

    update(20, 20, 1010); // dt = 0 → ignored

    expect(vx.value).toBe(1);
    expect(vy.value).toBe(1);
  });

  it("can be reset", () => {
    const { vx, vy, update, reset } = useDragVelocity();

    update(0, 0, 1000);
    update(10, 10, 1010);

    expect(vx.value).toBe(1);
    expect(vy.value).toBe(1);

    reset();

    expect(vx.value).toBe(0);
    expect(vy.value).toBe(0);

    // po resetu se chová jako nový instance
    update(5, 5, 2000);
    expect(vx.value).toBe(0);
    expect(vy.value).toBe(0);
  });
});
