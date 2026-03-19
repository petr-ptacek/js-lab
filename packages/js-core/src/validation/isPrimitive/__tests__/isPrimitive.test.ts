import { describe, it, expect } from "vitest";
import { isPrimitive } from "../isPrimitive";

describe("isPrimitive", () => {
  it("returns true for strings", () => {
    expect(isPrimitive("hello")).toBe(true);
    expect(isPrimitive("")).toBe(true);
  });

  it("returns true for numbers", () => {
    expect(isPrimitive(42)).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(-5)).toBe(true);
    expect(isPrimitive(NaN)).toBe(true);
    expect(isPrimitive(Infinity)).toBe(true);
  });

  it("returns true for booleans", () => {
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
  });

  it("returns true for null", () => {
    expect(isPrimitive(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isPrimitive(undefined)).toBe(true);
  });

  it("returns true for symbols", () => {
    expect(isPrimitive(Symbol("test"))).toBe(true);
    expect(isPrimitive(Symbol.iterator)).toBe(true);
  });

  it("returns true for bigints", () => {
    expect(isPrimitive(100n)).toBe(true);
    expect(isPrimitive(BigInt("999"))).toBe(true);
  });

  it("returns false for objects", () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    expect(isPrimitive(/regex/)).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = "text";

    if (isPrimitive(value)) {
      // value should be narrowed to PrimitiveValue
      expect(typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null || value === undefined || typeof value === "symbol" || typeof value === "bigint").toBe(true);
    }
  });
});

