import { describe, expect, it } from "vitest";
import { getAspectRatio } from "../getAspectRatio";

describe("getAspectRatio", () => {
  it("returns correct aspect ratio", () => {
    const ratio = getAspectRatio(400, 200);
    expect(ratio).toBe(2);
  });

  it("returns decimal aspect ratio", () => {
    const ratio = getAspectRatio(1920, 1080);
    expect(ratio).toBeCloseTo(16 / 9);
  });

  it("throws for zero width", () => {
    expect(() =>
      getAspectRatio(0, 100),
    ).toThrow("width must be a positive finite number");
  });

  it("throws for zero height", () => {
    expect(() =>
      getAspectRatio(100, 0),
    ).toThrow("height must be a positive finite number");
  });

  it("throws for negative values", () => {
    expect(() =>
      getAspectRatio(-100, 100),
    ).toThrow("width must be a positive finite number");

    expect(() =>
      getAspectRatio(100, -100),
    ).toThrow("height must be a positive finite number");
  });

  it("throws for NaN and Infinity", () => {
    expect(() =>
      getAspectRatio(NaN, 100),
    ).toThrow("width must be a positive finite number");

    expect(() =>
      getAspectRatio(100, Infinity),
    ).toThrow("height must be a positive finite number");
  });
});
