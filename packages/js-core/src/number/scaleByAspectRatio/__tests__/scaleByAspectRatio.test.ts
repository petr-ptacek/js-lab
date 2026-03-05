import { describe, expect, it } from "vitest";
import { scaleByAspectRatio } from "../scaleByAspectRatio";

describe("scaleByAspectRatio", () => {
  it("scales by width when target.width is provided", () => {
    const result = scaleByAspectRatio(
      { width: 400, height: 200 },
      { width: 200 },
    );

    expect(result).toEqual({
      width: 200,
      height: 100,
    });
  });

  it("scales by height when target.height is provided", () => {
    const result = scaleByAspectRatio(
      { width: 400, height: 200 },
      { height: 100 },
    );

    expect(result).toEqual({
      width: 200,
      height: 100,
    });
  });

  it("uses custom rounding function", () => {
    const floor = (v: number) => Math.floor(v);

    const result = scaleByAspectRatio(
      { width: 1000, height: 333 },
      { width: 500 },
      floor,
    );

    expect(result.width).toBe(500);
    expect(result.height).toBe(
      Math.floor(500 / (1000 / 333)),
    );
  });

  it("throws when both width and height are provided", () => {
    expect(() =>
      scaleByAspectRatio(
        { width: 400, height: 300 },
        { width: 200, height: 200 } as any,
      ),
    ).toThrow(
      "scaleTo requires exactly one of target.width or target.height",
    );
  });

  it("throws when neither width nor height is provided", () => {
    expect(() =>
      scaleByAspectRatio(
        { width: 400, height: 300 },
        {} as any,
      ),
    ).toThrow(
      "scaleTo requires exactly one of target.width or target.height",
    );
  });

  it("throws for invalid size values", () => {
    expect(() =>
      scaleByAspectRatio(
        { width: 0, height: 300 },
        { width: 100 },
      ),
    ).toThrow();

    expect(() =>
      scaleByAspectRatio(
        { width: 400, height: -1 },
        { height: 100 },
      ),
    ).toThrow();
  });

  it("throws for invalid target values", () => {
    expect(() =>
      scaleByAspectRatio(
        { width: 400, height: 300 },
        { width: 0 },
      ),
    ).toThrow();

    expect(() =>
      scaleByAspectRatio(
        { width: 400, height: 300 },
        { height: -50 },
      ),
    ).toThrow();
  });
});
