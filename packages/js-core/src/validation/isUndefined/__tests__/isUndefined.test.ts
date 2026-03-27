import { describe, expect, it } from "vitest";
import { isUndefined } from "../isUndefined";

describe("isUndefined", () => {
  it("returns true for undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it("returns false for non-undefined values", () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = undefined;

    if (isUndefined(value)) {
      expect(value === undefined).toBe(true);
    }
  });
});
