import { describe, it, expect }   from "vitest";
import { clampPercentWithLimits } from "./clampPercentWithLimits";

describe("clampPercentWithLimits", () => {
  describe("base percent clamp", () => {
    it.each([
      [-50, 200, 0],
      [0, 200, 0],
      [50, 200, 50],
      [150, 200, 100],
    ])(
      "clamps percent %o to %o",
      (percent, containerSize, expected) => {
        expect(
          clampPercentWithLimits(percent, containerSize, {}),
        ).toBe(expected);
      },
    );
  });

  describe("invalid container size", () => {
    it.each([0, -100])(
      "returns clamped percent when containerSize is %o",
      (containerSize) => {
        expect(
          clampPercentWithLimits(150, containerSize, {
            minSize: 50,
            maxSize: 100,
          }),
        ).toBe(100);
      },
    );
  });

  describe("minSize", () => {
    it("respects minSize in px", () => {
      expect(
        clampPercentWithLimits(10, 200, { minSize: 50 }),
      ).toBe(25);
    });

    it("respects minSize in percent", () => {
      expect(
        clampPercentWithLimits(10, 200, { minSize: "30%" }),
      ).toBe(30);
    });

    it("does not exceed 100%", () => {
      expect(
        clampPercentWithLimits(90, 200, { minSize: 300 }),
      ).toBe(100);
    });
  });

  describe("maxSize", () => {
    it("respects maxSize in px", () => {
      expect(
        clampPercentWithLimits(80, 200, { maxSize: 100 }),
      ).toBe(50);
    });

    it("respects maxSize in percent", () => {
      expect(
        clampPercentWithLimits(80, 200, { maxSize: "60%" }),
      ).toBe(60);
    });

    it("does not go below 0%", () => {
      expect(
        clampPercentWithLimits(10, 200, { maxSize: -50 }),
      ).toBe(0);
    });
  });

  describe("min + max together", () => {
    it("clamps between min and max", () => {
      expect(
        clampPercentWithLimits(20, 200, {
          minSize: 50,
          maxSize: 120,
        }),
      ).toBe(25);
    });

    it("min wins when percent is too small", () => {
      expect(
        clampPercentWithLimits(5, 200, {
          minSize: 60,
          maxSize: 160,
        }),
      ).toBe(30);
    });

    it("max wins when percent is too large", () => {
      expect(
        clampPercentWithLimits(90, 200, {
          minSize: 40,
          maxSize: 80,
        }),
      ).toBe(40);
    });
  });
});
