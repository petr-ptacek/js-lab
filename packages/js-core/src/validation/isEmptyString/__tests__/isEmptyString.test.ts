import { describe, it, expect } from "vitest";
import { isEmptyString } from "../isEmptyString";

describe("isEmptyString", () => {
  it("returns true for the empty string", () => {
    expect(isEmptyString("")).toBe(true);
  });

  it("returns false for non-empty strings", () => {
    expect(isEmptyString("a")).toBe(false);
    expect(isEmptyString(" ")).toBe(false);
    expect(isEmptyString("text")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isEmptyString(null)).toBe(false);
    expect(isEmptyString(undefined)).toBe(false);
    expect(isEmptyString(0)).toBe(false);
    expect(isEmptyString([])).toBe(false);
  });

  it("serves as a type guard", () => {
    const value: unknown = "";
    if (isEmptyString(value)) {
      expect(value).toBe("");
      expect(value.length).toBe(0);
    } else {
      throw new Error("should have treated empty string as literal");
    }
  });
});
