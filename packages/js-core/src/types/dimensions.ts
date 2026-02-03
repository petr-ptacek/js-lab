/**
 * Represents a two-dimensional size defined by width and height.
 *
 * This type is domain-agnostic and is used across the library
 * for size, scaling, and aspect-ratio related calculations.
 *
 * @since 1.0.0
 */
export type Dimensions = {
  width: number;
  height: number;
};

/**
 * Defines a target dimension using a single axis.
 *
 * Exactly one property must be provided:
 * - `width` to target the horizontal dimension
 * - `height` to target the vertical dimension
 *
 * This type enforces an exclusive choice between dimensions and
 * prevents invalid states where both or neither are specified.
 *
 * @since 1.0.0
 */
export type DimensionsTarget =
  | { width: number; height?: never }
  | { height: number; width?: never };
