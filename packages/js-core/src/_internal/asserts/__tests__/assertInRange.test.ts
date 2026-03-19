import { describe, expect, it } from "vitest";
import { assertInRange } from "../assertInRange";

describe("assertInRange", () => {
  it("does not throw when value is in range", () => {
    expect(() =>
      assertInRange("value", 5, 0, 10),
    ).not.toThrow();
  });

  it("throws when value is out of range", () => {
    expect(() =>
      assertInRange("value", -1, 0, 10),
    ).toThrow("value must be in range 0..10");

    expect(() =>
      assertInRange("value", 11, 0, 10),
    ).toThrow("value must be in range 0..10");
  });

  it("throws for NaN or Infinity", () => {
    expect(() =>
      assertInRange("value", NaN, 0, 10),
    ).toThrow("value must be in range 0..10");
  });
});
