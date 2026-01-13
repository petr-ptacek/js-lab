import { describe, it, expect } from "vitest";
import { useDragDirection } from "./useDragDirection";

describe("useDragDirection", () => {
  it("sets direction to right for positive dx", () => {
    const dir = useDragDirection();

    dir.update(10, 5);

    expect(dir.direction.value).toBe("right");
  });

  it("sets direction to left for negative dx", () => {
    const dir = useDragDirection();

    dir.update(-10, 20);

    expect(dir.direction.value).toBe("left");
  });

  it("sets direction to bottom when dx is zero and dy is positive", () => {
    const dir = useDragDirection();

    dir.update(0, 15);

    expect(dir.direction.value).toBe("bottom");
  });

  it("sets direction to top when dx is zero and dy is negative", () => {
    const dir = useDragDirection();

    dir.update(0, -15);

    expect(dir.direction.value).toBe("top");
  });

  it("prioritizes horizontal movement over vertical", () => {
    const dir = useDragDirection();

    dir.update(-5, 100);

    expect(dir.direction.value).toBe("left");
  });

  it("sets direction to null when both deltas are zero", () => {
    const dir = useDragDirection();

    dir.update(0, 0);

    expect(dir.direction.value).toBeNull();
  });

  it("resets direction to null", () => {
    const dir = useDragDirection();

    dir.update(10, 0);
    dir.reset();

    expect(dir.direction.value).toBeNull();
  });
});
