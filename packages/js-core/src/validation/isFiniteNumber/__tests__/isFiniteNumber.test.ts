import { describe, it, expect } from "vitest";
import { isFiniteNumber } from "../isFiniteNumber";

describe("isFiniteNumber", () => {
  it("returns true for finite numbers", () => {
    expect(isFiniteNumber(42)).toBe(true);
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-5)).toBe(true);
    expect(isFiniteNumber(3.14)).toBe(true);
  });

  it("returns false for NaN", () => {
    expect(isFiniteNumber(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(-Infinity)).toBe(false);
  });

  it("returns false for non-numbers", () => {
    expect(isFiniteNumber("42")).toBe(false);
    expect(isFiniteNumber(true)).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);
    expect(isFiniteNumber(undefined)).toBe(false);
    expect(isFiniteNumber([])).toBe(false);
    expect(isFiniteNumber({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = 42;

    if (isFiniteNumber(value)) {
      expect(typeof value === "number").toBe(true);
    }
  });
});

