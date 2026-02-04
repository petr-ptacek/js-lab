import { loadImage } from "../loadImage";
import { shrinkImage } from "./shrinkImage";
import type { ShrinkImageOptions } from "./types";

/**
 * Shrinks an image element and returns a new `HTMLImageElement`.
 *
 * This is a **convenience wrapper** around {@link shrinkImage} designed
 * for cases where a DOM image element is the desired output.
 *
 * Unlike {@link shrinkImage}, which returns a `Blob`, this utility follows
 * the intuitive **"image in → image out"** mental model and is therefore
 * better suited for direct use in UI code.
 *
 * Internally, the image is resized using a canvas, converted to a `Blob`,
 * and then loaded back into a new `HTMLImageElement`.
 *
 * The original image element is not mutated.
 *
 * @param image - Source image element. Must have valid `naturalWidth`
 * and `naturalHeight`.
 * @param options - Shrinking options such as maximum dimensions and output quality.
 *
 * @returns A `Promise` that resolves to a new `HTMLImageElement`
 * containing the shrunk image.
 *
 * @throws
 * Throws if:
 * - the source image has invalid natural dimensions
 * - shrinking fails
 * - the resulting image cannot be loaded
 *
 * @remarks
 * - Aspect ratio is always preserved
 * - The image is only scaled down, never up
 * - A new image element is always created
 * - This utility is intended for UI usage, not direct file uploads
 *
 * @see shrinkImage
 * @see shrinkImageFile
 *
 * @example
 * Shrink an image element for display:
 * ```ts
 * const img = document.querySelector("img")!;
 *
 * const resized = await shrinkImageElement(img, {
 *   maxWidth: 1200,
 *   maxHeight: 1200,
 * });
 *
 * document.body.appendChild(resized);
 * ```
 *
 * @example
 * Replace an existing image after resizing:
 * ```ts
 * const resized = await shrinkImageElement(img, { maxWidth: 800 });
 * img.replaceWith(resized);
 * ```
 *
 * @since 1.0.0
 */
export async function shrinkImageElement(
  image: HTMLImageElement,
  options?: ShrinkImageOptions,
): Promise<HTMLImageElement> {
  const blob = await shrinkImage(image, options);

  const url = URL.createObjectURL(blob);

  try {
    return await loadImage(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}
