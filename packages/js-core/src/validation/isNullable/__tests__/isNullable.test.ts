import { describe, it, expect } from "vitest";
import { isNullable } from "../isNullable";

describe("isNullable", () => {
  it("returns true for null", () => {
    expect(isNullable(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isNullable(undefined)).toBe(true);
  });

  it("returns false for non-nullish values", () => {
    expect(isNullable(0)).toBe(false);
    expect(isNullable("")).toBe(false);
    expect(isNullable(false)).toBe(false);
    expect(isNullable([])).toBe(false);
    expect(isNullable({})).toBe(false);
    expect(isNullable(NaN)).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = null;

    if (isNullable(value)) {
      expect(value === null || value === undefined).toBe(true);
    }
  });
});

