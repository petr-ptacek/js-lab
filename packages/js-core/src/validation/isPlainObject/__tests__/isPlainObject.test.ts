import { describe, expect, it } from "vitest";
import { isPlainObject } from "../isPlainObject";

describe("isPlainObject", () => {
  it("returns true for plain objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("returns false for arrays", () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it("returns false for null", () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it("returns false for special objects", () => {
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(/regex/)).toBe(false);
  });

  it("returns false for primitives", () => {
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject("string")).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });

  it("returns false for functions", () => {
    expect(isPlainObject(() => {})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = { name: "test" };

    if (isPlainObject(value)) {
      expect(typeof value === "object").toBe(true);
    }
  });
});
