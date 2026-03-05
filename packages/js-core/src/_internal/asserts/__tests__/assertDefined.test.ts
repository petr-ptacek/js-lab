import { describe, expect, it } from "vitest";
import { assertDefined } from "../assertDefined";

describe("assertDefined", () => {
  it("does not throw for defined values", () => {
    expect(() => assertDefined("value", 0)).not.toThrow();
    expect(() => assertDefined("value", "")).not.toThrow();
    expect(() => assertDefined("value", false)).not.toThrow();
    expect(() => assertDefined("value", {})).not.toThrow();
  });

  it("throws for undefined", () => {
    expect(() =>
      assertDefined("value", undefined),
    ).toThrow("value must be defined");
  });

  it("throws for null", () => {
    expect(() =>
      assertDefined("value", null),
    ).toThrow("value must be defined");
  });
});
