import { describe, it, expect } from "vitest";
import { isSymbol } from "../isSymbol";

describe("isSymbol", () => {
  it("returns true for symbols", () => {
    expect(isSymbol(Symbol("test"))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol(Symbol.hasInstance)).toBe(true);
  });

  it("returns false for non-symbols", () => {
    expect(isSymbol("symbol")).toBe(false);
    expect(isSymbol(42)).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = Symbol("test");

    if (isSymbol(value)) {
      expect(typeof value === "symbol").toBe(true);
    }
  });
});

