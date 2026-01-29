import { describe, expect, it } from "vitest";
import { assertNonEmptyString } from "../assertNonEmptyString";

describe("assertNonEmptyString", () => {
  it("does not throw for non-empty strings", () => {
    expect(() =>
      assertNonEmptyString("value", "a"),
    ).not.toThrow();
  });

  it("throws for empty string", () => {
    expect(() =>
      assertNonEmptyString("value", ""),
    ).toThrow("a non-empty string");
  });

  it("throws for non-string values", () => {
    expect(() =>
      assertNonEmptyString("value", 123 as any),
    ).toThrow("a non-empty string");
  });
});
