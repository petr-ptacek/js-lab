/**
 * Represents a JavaScript primitive value.
 *
 * Includes all built-in primitive types as well as `null` and `undefined`.
 *
 * @example
 * ```ts
 * const value: PrimitiveValue = 666;
 * ```
 *
 * @since 1.0.0
 */
export type PrimitiveValue =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined;
