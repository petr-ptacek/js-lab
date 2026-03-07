import { describe, it, expect } from "vitest";
import { isNumber } from "../isNumber";

describe("isNumber", () => {
  it("returns true for numbers", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-5)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(1e10)).toBe(true);
  });

  it("returns true for NaN", () => {
    expect(isNumber(NaN)).toBe(true);
  });

  it("returns true for Infinity", () => {
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
  });

  it("returns false for non-numbers", () => {
    expect(isNumber("42")).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(Symbol("test"))).toBe(false);
    expect(isNumber(100n)).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = 42;

    if (isNumber(value)) {
      expect(typeof value === "number").toBe(true);
    }
  });
});

