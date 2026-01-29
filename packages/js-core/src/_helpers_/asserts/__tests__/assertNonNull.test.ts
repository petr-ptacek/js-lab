import { describe, expect, it } from "vitest";
import { assertNonNull } from "../assertNonNull";

describe("assertNotNull", () => {
  it("does not throw for non-null values", () => {
    expect(() => assertNonNull("value", 0)).not.toThrow();
    expect(() => assertNonNull("value", undefined)).not.toThrow();
    expect(() => assertNonNull("value", "")).not.toThrow();
  });

  it("throws for null", () => {
    expect(() =>
      assertNonNull("value", null),
    ).toThrow("value must be not null");
  });
});
