import { describe, it, expect } from "vitest";
import { sizeValueToPx }        from "../sizeValueToPx";

describe("sizeValueToPx", () => {
  describe("number values", () => {
    it.each([
      [0, 200, 0],
      [50, 200, 50],
      [-20, 200, -20],
      [150.5, 200, 150.5],
    ])(
      "returns %o when value is number %o",
      (value, containerSize, expected) => {
        expect(sizeValueToPx(value, containerSize)).toBe(expected);
      },
    );
  });

  describe("percentage values", () => {
    it.each([
      ["0%", 200, 0],
      ["25%", 200, 50],
      ["50%", 200, 100],
      ["100%", 200, 200],
      ["150%", 200, 300],
      ["-50%", 200, -100],
    ])(
      "converts %o to px",
      (value, containerSize, expected) => {
        expect(sizeValueToPx(value as any, containerSize)).toBe(expected);
      },
    );
  });

  describe("px values", () => {
    it.each([
      ["0px", 200, 0],
      ["25px", 200, 25],
      ["100px", 200, 100],
      ["150.5px", 200, 150.5],
      ["-20px", 200, -20],
    ])(
      "parses %o to px",
      (value, containerSize, expected) => {
        expect(sizeValueToPx(value as any, containerSize)).toBe(expected);
      },
    );
  });

  describe("containerSize edge cases", () => {
    it.each([
      ["50%", 0, 0],
      ["50%", -100, -50],
    ])(
      "handles containerSize %o",
      (value, containerSize, expected) => {
        expect(sizeValueToPx(value as any, containerSize)).toBe(expected);
      },
    );
  });
});
