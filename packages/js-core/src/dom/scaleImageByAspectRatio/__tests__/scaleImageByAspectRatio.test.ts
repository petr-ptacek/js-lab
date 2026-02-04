import { describe, it, expect } from "vitest";
import { scaleImageByAspectRatio } from "../scaleImageByAspectRatio";

function createImage(
  naturalWidth: number,
  naturalHeight: number,
  src = "test.png",
): HTMLImageElement {
  const img = new Image();

  Object.defineProperty(img, "naturalWidth", {
    value: naturalWidth,
    configurable: true,
  });

  Object.defineProperty(img, "naturalHeight", {
    value: naturalHeight,
    configurable: true,
  });

  img.src = src;

  return img;
}

describe("scaleImageByAspectRatio", () => {
  it("scales image by width while preserving aspect ratio", () => {
    const img = createImage(400, 200);

    const result = scaleImageByAspectRatio(img, { width: 200 });

    expect(result).not.toBe(img);
    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
    expect(result.src).toBe(img.src);
  });

  it("scales image by height while preserving aspect ratio", () => {
    const img = createImage(400, 200);

    const result = scaleImageByAspectRatio(img, { height: 100 });

    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
  });

  it("uses custom rounding function", () => {
    const img = createImage(333, 200);

    const result = scaleImageByAspectRatio(
      img,
      { width: 100 },
      Math.floor,
    );

    // 333 → 200 => ratio ≈ 0.6006
    // height ≈ 60.06 → floor → 60
    expect(result.height).toBe(60);
  });

  it("does not mutate the original image", () => {
    const img = createImage(400, 200);

    const result = scaleImageByAspectRatio(img, { width: 200 });

    expect(img.width).toBe(0);  // default Image width
    expect(img.height).toBe(0);
    expect(result).not.toBe(img);
  });

  it("throws if both width and height are provided", () => {
    const img = createImage(400, 200);

    expect(() =>
      scaleImageByAspectRatio(img, { width: 200, height: 100 } as any),
    ).toThrow();
  });

  it("throws if neither width nor height is provided", () => {
    const img = createImage(400, 200);

    expect(() =>
      scaleImageByAspectRatio(img, {} as any),
    ).toThrow();
  });

  it("throws if image has invalid natural dimensions", () => {
    const img = createImage(0, 200);

    expect(() =>
      scaleImageByAspectRatio(img, { width: 100 }),
    ).toThrow();
  });
});
