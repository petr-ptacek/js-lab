import { describe, it, expect } from "vitest";
import { rangeArray } from "../rangeArray";

describe("rangeArray", () => {
  it("creates range from 0 to stop (exclusive)", () => {
    expect(rangeArray(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("creates range from start to stop (exclusive)", () => {
    expect(rangeArray(2, 6)).toEqual([2, 3, 4, 5]);
  });

  it("supports positive step", () => {
    expect(rangeArray(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  it("supports negative step", () => {
    expect(rangeArray(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  it("returns empty array when stop equals start", () => {
    expect(rangeArray(0, 0)).toEqual([]);
    expect(rangeArray(5, 5)).toEqual([]);
  });

  it("returns empty array when step direction is invalid (positive step)", () => {
    expect(rangeArray(5, 0, 1)).toEqual([]);
  });

  it("returns empty array when step direction is invalid (negative step)", () => {
    expect(rangeArray(0, 5, -1)).toEqual([]);
  });

  it("throws error when step is 0", () => {
    expect(() => rangeArray(0, 10, 0)).toThrow(
      "rangeArray: step must not be 0",
    );
  });

  it("works with negative start and stop", () => {
    expect(rangeArray(-5, 0)).toEqual([-5, -4, -3, -2, -1]);
  });

  it("works with negative values and negative step", () => {
    expect(rangeArray(0, -5, -1)).toEqual([0, -1, -2, -3, -4]);
  });

  it("matches Python behavior for single-element range", () => {
    expect(rangeArray(1, 2)).toEqual([1]);
    expect(rangeArray(2, 1)).toEqual([]);
  });

  it("returns empty array for rangeArray(0)", () => {
    expect(rangeArray(0)).toEqual([]);
  });

  it("does not mutate inputs or reuse array", () => {
    const a = rangeArray(3);
    const b = rangeArray(3);

    expect(a).toEqual([0, 1, 2]);
    expect(b).toEqual([0, 1, 2]);
    expect(a).not.toBe(b);
  });
});
