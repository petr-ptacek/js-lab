import { describe, it, expect } from "vitest";
import { toPercentage } from "./toPercentage";

describe("toPercentage", () => {
  it.each([
    [50, 100, 50],
    [1, 4, 25],
    [2, 8, 25],
    [0, 10, 0],
  ])(
    "returns %i%% for value %i and base %i",
    (value, base, expected) => {
      expect(toPercentage(value, base)).toBe(expected);
    },
  );

  it("throws when base is 0", () => {
    expect(() => toPercentage(1, 0)).toThrow();
  });
});
