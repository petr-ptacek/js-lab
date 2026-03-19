import { describe, expect, it } from "vitest";
import { assertNonUndefined } from "../assertNonUndefined";

describe("assertNotUndefined", () => {
  it("does not throw for defined values", () => {
    expect(() => assertNonUndefined("value", 0)).not.toThrow();
    expect(() => assertNonUndefined("value", null)).not.toThrow();
    expect(() => assertNonUndefined("value", "")).not.toThrow();
    expect(() => assertNonUndefined("value", false)).not.toThrow();
  });

  it("throws for undefined", () => {
    expect(() =>
      assertNonUndefined("value", undefined),
    ).toThrow("value must be not undefined");
  });
});
