import { describe, it, expect } from "vitest";
import { isDate } from "../isDate";

describe("isDate", () => {
  it("returns true for Date instances", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("2024-01-01"))).toBe(true);
    expect(isDate(new Date(0))).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(true);
  });

  it("returns false for non-dates", () => {
    expect(isDate("2024-01-01")).toBe(false);
    expect(isDate(1704067200000)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = new Date();

    if (isDate(value)) {
      expect(value instanceof Date).toBe(true);
    }
  });
});

