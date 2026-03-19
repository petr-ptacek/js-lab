import { describe, it, expect } from "vitest";
import { isNull } from "../isNull";

describe("isNull", () => {
  it("returns true for null", () => {
    expect(isNull(null)).toBe(true);
  });

  it("returns false for non-null values", () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull("")).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = null;

    if (isNull(value)) {
      expect(value === null).toBe(true);
    }
  });
});

