import { describe, expect, it } from "vitest";
import { assertPositiveFinite } from "../assertPositiveFinite";

describe("assertPositiveFinite", () => {
  it("does not throw for positive finite numbers", () => {
    expect(() => assertPositiveFinite("value", 1)).not.toThrow();
    expect(() => assertPositiveFinite("value", 0.001)).not.toThrow();
  });

  it("throws for zero or negative numbers", () => {
    expect(() =>
      assertPositiveFinite("value", 0),
    ).toThrow("value must be a positive finite number");

    expect(() =>
      assertPositiveFinite("value", -1),
    ).toThrow("value must be a positive finite number");
  });

  it("throws for NaN or Infinity", () => {
    expect(() =>
      assertPositiveFinite("value", NaN),
    ).toThrow("value must be a positive finite number");

    expect(() =>
      assertPositiveFinite("value", Infinity),
    ).toThrow("value must be a positive finite number");
  });
});
