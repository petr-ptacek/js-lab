import { describe, it, expect } from "vitest";
import { isValidDate }          from "../isValidDate";

describe("isValidDate", () => {
  it("returns true for a valid Date instance", () => {
    const date = new Date("2024-01-01");

    expect(isValidDate(date)).toBe(true);
  });

  it("returns false for an invalid Date (NaN time)", () => {
    const invalidDate = new Date("invalid-date");

    expect(isValidDate(invalidDate)).toBe(false);
  });

  it("returns false for non-Date values", () => {
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate("2024-01-01")).toBe(false);
    expect(isValidDate(1704067200000)).toBe(false);
    expect(isValidDate({})).toBe(false);
    expect(isValidDate([])).toBe(false);
  });

  it("acts as a proper type guard", () => {
    const value: unknown = new Date();

    if ( isValidDate(value) ) {
      // TypeScript by měl vědět, že value je Date
      value.getTime();
      expect(value instanceof Date).toBe(true);
    } else {
      throw new Error("Expected value to be a valid Date");
    }
  });
});
