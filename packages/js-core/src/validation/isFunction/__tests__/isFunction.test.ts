import { describe, expect, it } from "vitest";
import { isFunction } from "../isFunction";

describe("isFunction", () => {
  it("returns true for functions", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(class MyClass {})).toBe(true);
    expect(isFunction(Math.max)).toBe(true);
  });

  it("returns false for non-functions", () => {
    expect(isFunction(42)).toBe(false);
    expect(isFunction("function")).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = () => "test";

    if (isFunction(value)) {
      expect(typeof value === "function").toBe(true);
    }
  });
});
