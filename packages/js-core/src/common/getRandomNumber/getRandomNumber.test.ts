import { describe, it, expect, vi } from "vitest";
import { getRandomNumber } from "./getRandomNumber";

describe("getRandomNumber", () => {
  it("returns a number within range", () => {
    const from = 0;
    const to = 20;

    for (let i = 0; i < 1_000; i++) {
      const value = getRandomNumber(from, to);

      expect(value).toBeGreaterThanOrEqual(from);
      expect(value).toBeLessThanOrEqual(to);
    }
  });

  it("can return both min and max", () => {
    const from = 0;
    const to = 1;

    const results = new Set<number>();

    for (let i = 0; i < 1_000; i++) {
      results.add(getRandomNumber(from, to));
    }

    expect(results.has(0)).toBe(true);
    expect(results.has(1)).toBe(true);
  });

  it("throws if from is greater than to", () => {
    expect(() => getRandomNumber(10, 5)).toThrow();
  });

  it("uses Math.random correctly", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(getRandomNumber(10, 20)).toBe(10);

    vi.spyOn(Math, "random").mockReturnValue(0.999999);

    expect(getRandomNumber(10, 20)).toBe(20);

    vi.restoreAllMocks();
  });
});
