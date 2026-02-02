/**
 * Represents a two-dimensional size defined by width and height.
 *
 * This type is domain-agnostic and is used across the library
 * for size, scaling, and aspect-ratio related calculations.
 *
 * @example
 * ```ts
 * const dimensions: Dimensions = {
 *   width: 100,
 *   height: 100
 * }
 * ```
 *
 * @since 1.0.0
 */
export type Dimensions = {
  width: number;
  height: number;
};
