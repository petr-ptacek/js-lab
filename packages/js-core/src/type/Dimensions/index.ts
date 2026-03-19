/**
 * Represents a two-dimensional size defined by width and height.
 *
 * This type is domain-agnostic and is used across the library
 * for size, scaling, and aspect-ratio related calculations.
 *
 * @example
 * ```ts
 * const size: Dimensions = { width: 1920, height: 1080 };
 * ```
 *
 * @since 1.0.0
 */
export type Dimensions = {
  width: number;
  height: number;
};
