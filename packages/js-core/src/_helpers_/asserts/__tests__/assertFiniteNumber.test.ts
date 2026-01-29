import { describe, expect, it } from "vitest";
import { assertFiniteNumber } from "../assertFiniteNumber";

describe("assertFiniteNumber", () => {
  it("does not throw for finite numbers", () => {
    expect(() => assertFiniteNumber("value", 0)).not.toThrow();
    expect(() => assertFiniteNumber("value", -10)).not.toThrow();
    expect(() => assertFiniteNumber("value", 1.5)).not.toThrow();
  });

  it("throws for NaN or Infinity", () => {
    expect(() =>
      assertFiniteNumber("value", NaN),
    ).toThrow("a finite number");

    expect(() =>
      assertFiniteNumber("value", Infinity),
    ).toThrow("a finite number");
  });
});
