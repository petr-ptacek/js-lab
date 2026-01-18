import { describe, it, expect } from "vitest";
import { isFunction }           from "./isFunction";

describe("isFunction", () => {
  it("returns true for functions", () => {
    expect(isFunction(() => {
    })).toBe(true);
    expect(isFunction(function() {
    })).toBe(true);
    expect(isFunction(async () => {
    })).toBe(true);
    expect(isFunction(function* () {
    })).toBe(true);
  });

  it("returns true for classes (JS runtime behavior)", () => {
    class TestClass {
    }

    expect(isFunction(TestClass)).toBe(true);
  });

  it("returns false for non-function values", () => {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(123)).toBe(false);
    expect(isFunction("test")).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(new Date())).toBe(false);
  });

  it("acts as a proper type guard", () => {
    const value: unknown = () => 42;

    if ( isFunction(value) ) {
      // TypeScript ví, že value je Function
      expect(typeof value).toBe("function");
    } else {
      throw new Error("Expected value to be a function");
    }
  });
});
