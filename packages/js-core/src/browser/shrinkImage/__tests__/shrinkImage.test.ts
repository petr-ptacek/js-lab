import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { shrinkImage } from "../shrinkImage";

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

describe("shrinkImage", () => {
  const originalCreateElement = document.createElement.bind(document);

  let lastCanvas: {
    width: number;
    height: number;
    getContext: () => { drawImage: ReturnType<typeof vi.fn> };
    toBlob: (
      // eslint-disable-next-line no-undef
      cb: BlobCallback,
      type?: string,
      quality?: number,
    ) => void;
  };

  beforeEach(() => {
    vi.spyOn(document, "createElement").mockImplementation(tag => {
      if (tag !== "canvas") {
        return originalCreateElement(tag);
      }

      lastCanvas = {
        width: 0,
        height: 0,
        getContext: () => ({
          drawImage: vi.fn(),
        }),
        toBlob: vi.fn((cb, type) => {
          cb(new Blob(["x"], { type }));
        }),
      };

      return lastCanvas as any;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shrinks image by maxWidth while preserving aspect ratio", async () => {
    const img = createImage(4000, 2000);

    const blob = await shrinkImage(img, { maxWidth: 2000 });

    expect(blob).toBeInstanceOf(Blob);
    expect(lastCanvas.width).toBe(2000);
    expect(lastCanvas.height).toBe(1000);
  });

  it("shrinks image by maxHeight while preserving aspect ratio", async () => {
    const img = createImage(2000, 4000);

    await shrinkImage(img, { maxHeight: 1000 });

    expect(lastCanvas.width).toBe(500);
    expect(lastCanvas.height).toBe(1000);
  });

  it("fits image inside maxWidth and maxHeight", async () => {
    const img = createImage(4000, 3000);

    await shrinkImage(img, {
      maxWidth: 1600,
      maxHeight: 1200,
    });

    expect(lastCanvas.width).toBe(1600);
    expect(lastCanvas.height).toBe(1200);
  });

  it("does not upscale image smaller than constraints", async () => {
    const img = createImage(800, 600);

    await shrinkImage(img, {
      maxWidth: 1600,
      maxHeight: 1200,
    });

    expect(lastCanvas.width).toBe(800);
    expect(lastCanvas.height).toBe(600);
  });

  it("uses provided quality and mimeType", async () => {
    const img = createImage(2000, 1000);

    await shrinkImage(img, {
      maxWidth: 1000,
      quality: 0.5,
      mimeType: "image/webp",
    });

    expect(lastCanvas.toBlob).toHaveBeenCalledWith(
      expect.any(Function),
      "image/webp",
      0.5,
    );
  });

  it("does not mutate the original image", async () => {
    const img = createImage(4000, 2000);

    await shrinkImage(img, { maxWidth: 1000 });

    expect(img.width).toBe(0);
    expect(img.height).toBe(0);
  });

  it("throws for invalid image dimensions", () => {
    const img = createImage(0, 1000);

    expect(() =>
      shrinkImage(img, { maxWidth: 500 }),
    ).toThrow(
      "image.naturalWidth must be a positive finite number",
    );
  });
});
