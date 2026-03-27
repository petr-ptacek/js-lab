import { describe, expect, it } from "vitest";
import { isBoolean } from "../isBoolean";

describe("isBoolean", () => {
  it("returns true for booleans", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it("returns false for non-booleans", () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean("true")).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = true;

    if (isBoolean(value)) {
      expect(typeof value === "boolean").toBe(true);
    }
  });
});
