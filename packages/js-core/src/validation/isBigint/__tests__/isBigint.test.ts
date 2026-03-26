import { describe, expect, it } from "vitest";
import { isBigint } from "../isBigint";

describe("isBigint", () => {
  it("returns true for bigints", () => {
    expect(isBigint(100n)).toBe(true);
    expect(isBigint(0n)).toBe(true);
    expect(isBigint(-5n)).toBe(true);
    expect(isBigint(BigInt("999"))).toBe(true);
  });

  it("returns false for non-bigints", () => {
    expect(isBigint(100)).toBe(false);
    expect(isBigint("100n")).toBe(false);
    expect(isBigint(true)).toBe(false);
    expect(isBigint(null)).toBe(false);
    expect(isBigint(undefined)).toBe(false);
    expect(isBigint([])).toBe(false);
    expect(isBigint({})).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = 42n;

    if (isBigint(value)) {
      expect(typeof value === "bigint").toBe(true);
    }
  });
});
