import { describe, it, expect } from "vitest";
import { isEmptyObject }        from "../isEmptyObject";

describe("isEmptyObject", () => {
  it("returns true for empty plain object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("returns false for non-empty object", () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });

  it("returns false for non-plain objects", () => {
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
    expect(isEmptyObject(new Date())).toBe(false);
  });
});
