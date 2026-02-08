import { describe, it, expect }   from "vitest";
import { normalizeSizeToPercent } from "../normalizeSizeToPercent";

describe("normalizeSizeToPercent", () => {
  describe("invalid container size", () => {
    it.each([0, -100])(
      "returns 0 when containerSize is %o",
      (containerSize) => {
        expect(
          normalizeSizeToPercent(50, containerSize),
        ).toBe(0);
      },
    );
  });

  describe("px values", () => {
    it("converts px to percent", () => {
      expect(
        normalizeSizeToPercent(50, 200),
      ).toBe(25);
    });

    it("clamps px above container", () => {
      expect(
        normalizeSizeToPercent(500, 200),
      ).toBe(100);
    });

    it("clamps px below zero", () => {
      expect(
        normalizeSizeToPercent(-50, 200),
      ).toBe(0);
    });
  });

  describe("percentage values", () => {
    it("keeps percentage values", () => {
      expect(
        normalizeSizeToPercent("25%", 200),
      ).toBe(25);
    });

    it("clamps percentage above 100%", () => {
      expect(
        normalizeSizeToPercent("150%", 200),
      ).toBe(100);
    });

    it("clamps percentage below 0%", () => {
      expect(
        normalizeSizeToPercent("-50%", 200),
      ).toBe(0);
    });
  });

  describe("minSize option", () => {
    it("respects minSize in px", () => {
      expect(
        normalizeSizeToPercent(20, 200, { minSize: 50 }),
      ).toBe(25);
    });

    it("respects minSize in percent", () => {
      expect(
        normalizeSizeToPercent("10%", 200, { minSize: "30%" }),
      ).toBe(30);
    });
  });

  describe("maxSize option", () => {
    it("respects maxSize in px", () => {
      expect(
        normalizeSizeToPercent(150, 200, { maxSize: 100 }),
      ).toBe(50);
    });

    it("respects maxSize in percent", () => {
      expect(
        normalizeSizeToPercent("80%", 200, { maxSize: "60%" }),
      ).toBe(60);
    });
  });

  describe("min + max together", () => {
    it("clamps value between min and max", () => {
      expect(
        normalizeSizeToPercent(30, 200, {
          minSize: 50,
          maxSize: 100,
        }),
      ).toBe(25);
    });

    it("min wins when value is smaller than min", () => {
      expect(
        normalizeSizeToPercent(10, 200, {
          minSize: 80,
          maxSize: 120,
        }),
      ).toBe(40);
    });

    it("max wins when value is larger than max", () => {
      expect(
        normalizeSizeToPercent(180, 200, {
          minSize: 40,
          maxSize: 100,
        }),
      ).toBe(50);
    });
  });
});
