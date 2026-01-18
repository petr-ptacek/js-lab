import { describe, it, expect } from "vitest";

import { zipArray } from "../zipArray";

describe("zipArray", () => {
  it("zips two arrays into tuples", () => {
    const result = zipArray([1, 2, 3], ["a", "b", "c"]);

    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  it("uses the shorter array length", () => {
    const result = zipArray([1, 2, 3], ["a"]);

    expect(result).toEqual([[1, "a"]]);
  });

  it("returns empty array when one array is empty", () => {
    expect(zipArray([], [1, 2, 3])).toEqual([]);
    expect(zipArray([1, 2, 3], [])).toEqual([]);
  });

  it("does not mutate input arrays", () => {
    const a = [1, 2];
    const b = ["x", "y"];
    const aCopy = [...a];
    const bCopy = [...b];

    zipArray(a, b);

    expect(a).toEqual(aCopy);
    expect(b).toEqual(bCopy);
  });

  it("maps values when mapper is provided", () => {
    const result = zipArray(
      [1, 2, 3],
      [10, 20, 30],
      (a, b) => a + b,
    );

    expect(result).toEqual([11, 22, 33]);
  });

  it("passes correct values to mapper", () => {
    const calls: Array<[number, number]> = [];

    zipArray(
      [1, 2],
      [3, 4],
      (a, b) => {
        calls.push([a, b]);
        return a * b;
      },
    );

    expect(calls).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });
});
