import { describe, it, expect } from "vitest";
import { isArray } from "../isArray";

describe("isArray", () => {
  it("returns true for arrays", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(["a", "b", "c"])).toBe(true);
    expect(isArray([{ key: "value" }])).toBe(true);
    expect(isArray([null, undefined])).toBe(true);
    expect(isArray(new Array(5))).toBe(true);
    expect(isArray(Array.from({ length: 3 }))).toBe(true);
  });

  it("returns false for non-arrays", () => {
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray("string")).toBe(false);
    expect(isArray(123)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray({ 0: "a", 1: "b", length: 2 })).toBe(false); // array-like object
    expect(isArray(new Set([1, 2, 3]))).toBe(false);
    expect(isArray(new Map())).toBe(false);
    expect(isArray(() => {})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = [1, 2, 3];

    if (isArray<number>(value)) {
      // TypeScript should infer value as number[]
      const sum = value.reduce((acc, num) => acc + num, 0);
      expect(sum).toBe(6);

      // These operations should be type-safe
      expect(value.length).toBe(3);
      expect(value.map(x => x * 2)).toEqual([2, 4, 6]);
    } else {
      // This should not be reached
      throw new Error("Type guard should have passed");
    }
  });

  it("works with different generic types", () => {
    const stringArray: unknown = ["hello", "world"];
    const numberArray: unknown = [1, 2, 3];
    const objectArray: unknown = [{ id: 1 }, { id: 2 }];

    expect(isArray<string>(stringArray)).toBe(true);
    expect(isArray<number>(numberArray)).toBe(true);
    expect(isArray<object>(objectArray)).toBe(true);

    // Generic type doesn't affect runtime behavior
    expect(isArray<string>(numberArray)).toBe(true); // still true, just wrong generic
    expect(isArray<number>("not array")).toBe(false);
  });

  it("handles edge cases", () => {
    expect(isArray(Array.prototype)).toBe(true); // Array.prototype is an array

    // Sparse arrays
    const sparse = new Array(3);
    sparse[1] = "value";
    expect(isArray(sparse)).toBe(true);

    // Subclassed arrays
    class CustomArray extends Array {
      constructor(...args: any[]) {
        super(...args);
      }
    }
    expect(isArray(new CustomArray(1, 2, 3))).toBe(true);

    // Cross-frame arrays (Array.isArray handles this)
    // This is tested implicitly since we use Array.isArray internally
  });

  it("matches Array.isArray behavior exactly", () => {
    const testCases = [
      [],
      [1, 2, 3],
      "string",
      123,
      { 0: "a", length: 1 },
      null,
      undefined,
      new Array(5),
      Array.prototype
    ];

    testCases.forEach(testCase => {
      expect(isArray(testCase)).toBe(Array.isArray(testCase));
    });
  });
});
