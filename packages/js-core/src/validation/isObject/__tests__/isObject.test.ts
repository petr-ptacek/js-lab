import { describe, it, expect } from "vitest";
import { isObject } from "../isObject";

describe("isObject", () => {
  it("returns true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it("returns true for arrays", () => {
    expect(isObject([])).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
  });

  it("returns true for special objects", () => {
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Map())).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(/regex/)).toBe(true);
  });

  it("returns false for null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("returns false for primitives", () => {
    expect(isObject(42)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(Symbol("test"))).toBe(false);
    expect(isObject(100n)).toBe(false);
  });

  it("returns false for functions", () => {
    expect(isObject(() => {})).toBe(false);
    expect(isObject(function() {})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = { id: 1 };

    if (isObject(value)) {
      expect(typeof value === "object").toBe(true);
    }
  });
});

