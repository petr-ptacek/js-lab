import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { shrinkImageElement } from "../shrinkImageElement";
import * as shrinkModule from "../shrinkImage";
import * as loadImageModule from "../../loadImage";

function createMockImage(): HTMLImageElement {
  return {} as HTMLImageElement;
}

describe("shrinkImageElement", () => {
  let shrinkImageSpy: ReturnType<typeof vi.spyOn>;
  let loadImageSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    shrinkImageSpy = vi
      .spyOn(shrinkModule, "shrinkImage")
      .mockResolvedValue(
        new Blob(["shrunk"], { type: "image/jpeg" }),
      );

    loadImageSpy = vi
      .spyOn(loadImageModule, "loadImage")
      .mockResolvedValue(
        createMockImage(),
      );

    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shrinks an image and returns a new HTMLImageElement", async () => {
    const source = createMockImage();

    const result = await shrinkImageElement(source, {
      maxWidth: 1000,
    });

    expect(result).toBeInstanceOf(Object);
  });

  it("delegates shrinking to shrinkImage", async () => {
    const source = createMockImage();

    await shrinkImageElement(source, { maxWidth: 800 });

    expect(shrinkImageSpy).toHaveBeenCalledOnce();
    expect(shrinkImageSpy).toHaveBeenCalledWith(
      source,
      { maxWidth: 800 },
    );
  });

  it("loads the resulting blob via loadImage", async () => {
    const source = createMockImage();

    await shrinkImageElement(source);

    expect(loadImageSpy).toHaveBeenCalledOnce();
    expect(loadImageSpy).toHaveBeenCalledWith("blob:test");
  });

  it("creates and revokes object URL", async () => {
    const source = createMockImage();

    await shrinkImageElement(source);

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test");
  });

  it("returns the image created by loadImage", async () => {
    const source = createMockImage();
    const loadedImage = createMockImage();

    loadImageSpy.mockResolvedValueOnce(loadedImage);

    const result = await shrinkImageElement(source);

    expect(result).toBe(loadedImage);
  });

  it("revokes object URL even if loadImage throws", async () => {
    const source = createMockImage();

    loadImageSpy.mockRejectedValueOnce(
      new Error("load failed"),
    );

    await expect(
      shrinkImageElement(source),
    ).rejects.toThrow("load failed");

    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test");
  });
});
