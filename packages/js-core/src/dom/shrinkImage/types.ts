/**
 * @since 1.0.0
 */
export type ShrinkImageOptions = {
  /**
   * Maximum allowed image width.
   * If the image is wider, it will be proportionally scaled down.
   */
  maxWidth?: number;

  /**
   * Maximum allowed image height.
   * If the image is taller, it will be proportionally scaled down.
   */
  maxHeight?: number;

  /**
   * Output image quality (0–1).
   * Applies only to lossy formats (e.g. JPEG, WebP).
   *
   * @default 0.8
   */
  quality?: number;

  /**
   * Output MIME type.
   *
   * @default "image/jpeg"
   */
  mimeType?: string;
};
