import { describe, expect, it } from "vitest";
import { scaleToHeight } from "../helpers";

describe("scaleToHeight", () => {
  it("scales width based on height and aspect ratio", () => {
    const result = scaleToHeight(
      { width: 400, height: 200 },
      100,
    );

    expect(result).toEqual({
      width: 200,
      height: 100,
    });
  });

  it("uses custom rounding function", () => {
    const floor = (v: number) => Math.floor(v);

    const result = scaleToHeight(
      { width: 1000, height: 333 },
      500,
      floor,
    );

    expect(result.height).toBe(500);
    expect(result.width).toBe(
      Math.floor(500 * (1000 / 333)),
    );
  });

  it("throws for invalid input", () => {
    expect(() =>
      scaleToHeight(
        { width: 0, height: 100 },
        50,
      ),
    ).toThrow();

    expect(() =>
      scaleToHeight(
        { width: 100, height: 100 },
        0,
      ),
    ).toThrow();
  });
});
