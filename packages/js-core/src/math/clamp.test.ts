import { describe, expect, it } from "vitest";
import { clamp } from "./clamp";

describe("clamp", () => {
  it("returns value when it is within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("returns min when value is below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("returns max when value is above range", () => {
    expect(clamp(20, 0, 10)).toBe(10);
  });

  it("allows value equal to min or max", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("throws when min is greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow();
  });
});
