import { assertPositiveFinite } from "../../_helpers_";

/**
 * Computes the aspect ratio from given dimensions.
 *
 * The aspect ratio is defined as `width / height`.
 * Both values must be positive finite numbers.
 *
 * @param width - Original width
 * @param height - Original height
 *
 * @returns Aspect ratio (`width / height`)
 *
 * @throws {Error}
 * Throws if `width` or `height` is not a positive finite number.
 *
 * @example
 * ```ts
 * getAspectRatio(1920, 1080); // 1.777...
 * getAspectRatio(400, 200);  // 2
 * ```
 */
export function getAspectRatio(width: number, height: number): number {
  assertPositiveFinite("width", width);
  assertPositiveFinite("height", height);
  return width / height;
}
