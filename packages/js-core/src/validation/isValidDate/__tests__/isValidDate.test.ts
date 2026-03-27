import { describe, expect, it } from "vitest";
import { isValidDate } from "../isValidDate";

describe("isValidDate", () => {
  it("returns true for valid dates", () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date("2024-01-01"))).toBe(true);
    expect(isValidDate(new Date(0))).toBe(true);
  });

  it("returns false for invalid dates", () => {
    expect(isValidDate(new Date("invalid"))).toBe(false);
    expect(isValidDate(new Date(NaN))).toBe(false);
  });

  it("returns false for non-dates", () => {
    expect(isValidDate("2024-01-01")).toBe(false);
    expect(isValidDate(1704067200000)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = new Date();

    if (isValidDate(value)) {
      expect(value instanceof Date).toBe(true);
    }
  });
});
