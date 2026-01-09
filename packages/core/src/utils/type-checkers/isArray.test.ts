import { describe, it, expect } from "vitest";

import { isArray } from "./isArray";

describe("isArray", () => {
  it("should return true if the value is []", () => {
    const testValue = [1, 2, 3];
    expect(isArray(testValue)).toBe(true);
  });

  it.each([
    {}, null, undefined, 1, "a", new Set, new Map,
  ])("should return false for %o", (testValue) => {
    expect(isArray(testValue)).toBe(false);
  });
});
