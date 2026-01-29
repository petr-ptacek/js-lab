import { describe, expect, it } from "vitest";
import { scaleToWidth } from "../helpers";

describe("scaleToWidth", () => {
  it("scales height based on width and aspect ratio", () => {
    const result = scaleToWidth(
      { width: 400, height: 200 },
      200,
    );

    expect(result).toEqual({
      width: 200,
      height: 100,
    });
  });

  it("uses custom rounding function", () => {
    const floor = (v: number) => Math.floor(v);

    const result = scaleToWidth(
      { width: 1000, height: 333 },
      500,
      floor,
    );

    expect(result.width).toBe(500);
    expect(result.height).toBe(
      Math.floor(500 / (1000 / 333)),
    );
  });

  it("throws for invalid input", () => {
    expect(() =>
      scaleToWidth(
        { width: 0, height: 100 },
        50,
      ),
    ).toThrow();

    expect(() =>
      scaleToWidth(
        { width: 100, height: 100 },
        0,
      ),
    ).toThrow();
  });
});
