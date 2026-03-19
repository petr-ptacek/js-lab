import { describe, it, expect } from "vitest";
import { isNaNValue } from "../isNaNValue";

describe("isNaNValue", () => {
  it("returns true for NaN", () => {
    expect(isNaNValue(NaN)).toBe(true);
    expect(isNaNValue(0 / 0)).toBe(true);
  });

  it("returns false for non-NaN numbers", () => {
    expect(isNaNValue(42)).toBe(false);
    expect(isNaNValue(0)).toBe(false);
    expect(isNaNValue(Infinity)).toBe(false);
    expect(isNaNValue(-Infinity)).toBe(false);
  });

  it("returns false for non-numbers", () => {
    expect(isNaNValue("NaN")).toBe(false);
    expect(isNaNValue(null)).toBe(false);
    expect(isNaNValue(undefined)).toBe(false);
    expect(isNaNValue([])).toBe(false);
    expect(isNaNValue({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = NaN;

    if (isNaNValue(value)) {
      expect(typeof value === "number").toBe(true);
    }
  });
});

