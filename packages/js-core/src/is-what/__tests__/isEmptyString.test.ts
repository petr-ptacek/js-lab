import { describe, it, expect } from "vitest";
import { isEmptyString }        from "../isEmptyString";

describe("isEmptyString", () => {
  it("returns true for empty string", () => {
    expect(isEmptyString("")).toBe(true);
  });

  it("returns false for non-empty string", () => {
    expect(isEmptyString("a")).toBe(false);
    expect(isEmptyString(" ")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isEmptyString(null)).toBe(false);
    expect(isEmptyString(undefined)).toBe(false);
    expect(isEmptyString(0)).toBe(false);
  });
});
