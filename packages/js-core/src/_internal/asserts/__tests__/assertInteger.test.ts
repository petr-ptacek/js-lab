import { describe, expect, it } from "vitest";
import { assertInteger } from "../assertInteger";

describe("assertInteger", () => {
  it("does not throw for integers", () => {
    expect(() => assertInteger("value", 0)).not.toThrow();
    expect(() => assertInteger("value", -5)).not.toThrow();
    expect(() => assertInteger("value", 10)).not.toThrow();
  });

  it("throws for non-integers", () => {
    expect(() =>
      assertInteger("value", 1.5),
    ).toThrow("an integer");

    expect(() =>
      assertInteger("value", NaN),
    ).toThrow("an integer");
  });
});
