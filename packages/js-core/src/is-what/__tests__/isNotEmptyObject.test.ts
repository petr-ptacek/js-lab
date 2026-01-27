import { describe, expect, it } from "vitest";
import { isNotEmptyObject }     from "../isNotEmptyObject";

describe("isNotEmptyObject", () => {
  it("returns true for non-empty plain object", () => {
    expect(isNotEmptyObject({ a: 1 })).toBe(true);
  });

  it("returns false for empty object", () => {
    expect(isNotEmptyObject({})).toBe(false);
  });

  it("returns false for non-plain objects", () => {
    expect(isNotEmptyObject([])).toBe(false);
    expect(isNotEmptyObject(null)).toBe(false);
    expect(isNotEmptyObject(new Date())).toBe(false);
  });
});
