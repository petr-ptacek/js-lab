import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadImage }                                   from "../loadImage";

describe("loadImage", () => {
  let originalImage: typeof Image;

  beforeEach(() => {
    originalImage = globalThis.Image;
  });

  afterEach(() => {
    globalThis.Image = originalImage;
  });

  it("resolves image on load", async () => {
    globalThis.Image = class {
      onload: (() => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;
      src = "";

      constructor() {
        setTimeout(() => {
          this.onload?.();
        }, 0);
      }
    } as typeof Image;

    const image = await loadImage("/test.png");

    expect(image).toBeInstanceOf(Image);
  });

  it("rejects when image fails to load", async () => {
    const error = new Error("Image load failed");

    globalThis.Image = class {
      onload: (() => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;
      src = "";

      constructor() {
        setTimeout(() => {
          this.onerror?.(error);
        }, 0);
      }
    } as typeof Image;

    await expect(loadImage("/broken.png")).rejects.toBe(error);
  });
});
