import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { shrinkImageFile } from "../shrinkImageFile";
import * as shrinkModule from "../shrinkImage";

function createMockImage(): HTMLImageElement {
  let onload: ((ev: Event) => void) | null = null;
  let onerror: ((ev: Event) => void) | null = null;

  return {
    get onload() {
      return onload;
    },
    set onload(fn) {
      onload = fn;
    },

    get onerror() {
      return onerror;
    },
    set onerror(fn) {
      onerror = fn;
    },

    set src(_v: string) {
      // noop
    },
  } as unknown as HTMLImageElement;
}

describe("shrinkImageFile", () => {
  let shrinkImageSpy: ReturnType<typeof vi.spyOn>;
  let imageInstance: HTMLImageElement;

  beforeEach(() => {
    imageInstance = createMockImage();

    vi.stubGlobal(
      "Image",
      function ImageMock(this: HTMLImageElement) {
        return imageInstance;
      } as unknown as typeof Image,
    );

    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {
    });

    shrinkImageSpy = vi
      .spyOn(shrinkModule, "shrinkImage")
      .mockResolvedValue(
        new Blob(["shrunk"], { type: "image/jpeg" }),
      );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shrinks a file and returns a new File", async () => {
    const file = new File(["original"], "photo.jpg", {
      type: "image/jpeg",
      lastModified: 123,
    });

    const promise = shrinkImageFile(file, { maxWidth: 1000 });

    // simulate successful image load
    imageInstance.onload?.(new Event("load"));

    const result = await promise;

    expect(result).toBeInstanceOf(File);
    expect(result).not.toBe(file);
  });

  it("preserves file name and lastModified", async () => {
    const file = new File(["original"], "avatar.png", {
      type: "image/png",
      lastModified: 999,
    });

    const promise = shrinkImageFile(file);

    // simulate successful image load
    imageInstance.onload?.(new Event("load"));

    const result = await promise;

    expect(result.name).toBe("avatar.png");
    expect(result.lastModified).toBe(999);
  });

  it("uses blob type from shrinkImage result", async () => {
    const file = new File(["original"], "photo.jpg", {
      type: "image/jpeg",
    });

    shrinkImageSpy.mockResolvedValueOnce(
      new Blob(["shrunk"], { type: "image/webp" }),
    );

    const promise = shrinkImageFile(file);

    // simulate successful image load
    imageInstance.onload?.(new Event("load"));

    const result = await promise;

    expect(result.type).toBe("image/webp");
  });

  it("falls back to original file type if blob type is missing", async () => {
    const file = new File(["original"], "photo.jpg", {
      type: "image/jpeg",
    });

    shrinkImageSpy.mockResolvedValueOnce(
      new Blob(["shrunk"]),
    );

    const promise = shrinkImageFile(file);

    // simulate successful image load
    imageInstance.onload?.(new Event("load"));

    const result = await promise;

    expect(result.type).toBe("image/jpeg");
  });

  it("delegates shrinking to shrinkImage", async () => {
    const file = new File(["original"], "photo.jpg", {
      type: "image/jpeg",
    });

    const promise = shrinkImageFile(file, { maxWidth: 800 });

    // simulate successful image load
    imageInstance.onload?.(new Event("load"));

    await promise;

    expect(shrinkImageSpy).toHaveBeenCalledOnce();
    expect(shrinkImageSpy).toHaveBeenCalledWith(
      imageInstance,
      { maxWidth: 800 },
    );
  });

  it("revokes object URL after image load", async () => {
    const file = new File(["original"], "photo.jpg");

    const promise = shrinkImageFile(file);

    // simulate successful image load
    imageInstance.onload?.(new Event("load"));

    await promise;

    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test");
  });
});
