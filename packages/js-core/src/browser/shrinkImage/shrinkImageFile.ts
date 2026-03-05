import { loadImageFromFile } from "./helpers";
import { shrinkImage } from "./shrinkImage";
import type { ShrinkImageOptions } from "./types";

/**
 * Shrinks an image file before upload by limiting its maximum dimensions
 * and optionally reducing output quality.
 *
 * This is a **high-level convenience wrapper** around {@link shrinkImage}.
 * It accepts a `File`, performs all required loading internally,
 * and returns a new `File` ready for upload.
 *
 * The original file is not mutated.
 *
 * @param file - Source image file.
 * @param options - Shrinking options such as maximum dimensions and output quality.
 *
 * @returns A `Promise` that resolves to a new `File` containing the shrunk image.
 *
 * @throws
 * Throws if:
 * - the file cannot be loaded as an image
 * - shrinking fails
 *
 * @remarks
 * - Aspect ratio is always preserved
 * - The image is only scaled down, never up
 * - File name and `lastModified` are preserved
 *
 * @see shrinkImage
 *
 * @example
 * Shrink a file before upload:
 * ```ts
 * const file = input.files![0];
 *
 * const shrunk = await shrinkImageFile(file, {
 *   maxWidth: 1600,
 *   maxHeight: 1600,
 * });
 *
 * const formData = new FormData();
 * formData.append("file", shrunk);
 * ```
 *
 * @example
 * Reduce file size aggressively:
 * ```ts
 * const shrunk = await shrinkImageFile(file, {
 *   maxWidth: 1200,
 *   quality: 0.7,
 * });
 * ```
 *
 * @since 1.0.0
 */
export async function shrinkImageFile(file: File, options?: ShrinkImageOptions): Promise<File> {
  const image = await loadImageFromFile(file);
  const blob = await shrinkImage(image, options);

  return new File(
    [blob],
    file.name,
    {
      type: blob.type || file.type,
      lastModified: file.lastModified,
    },
  );
}
