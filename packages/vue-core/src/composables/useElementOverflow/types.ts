import { type MaybeRef, type Ref } from "vue";

export type OverflowDirection = "vertical" | "horizontal" | "both" | "none";

export type UseElementOverflowOptions = {
  disabled?: MaybeRef<boolean>;
  observeContent?: MaybeRef<boolean>;
  debounceDelay?: number;
}

/**
 * Result object returned by `useElementOverflow`.
 */
export type UseElementOverflowReturn = {
  /**
   * Whether the element overflows horizontally.
   **/
  hasHorizontal: Readonly<Ref<boolean>>;

  /**
   * Whether the element overflows vertically.
   */
  hasVertical: Readonly<Ref<boolean>>;

  /**
   * Whether the element overflows in any direction.
   **/
  hasOverflow: Readonly<Ref<boolean>>;
  /**
   * Overflow direction:
   * - `none`
   * - `horizontal`
   * - `vertical`
   * - `both`
   */
  direction: Readonly<Ref<OverflowDirection>>;

  /**
   * Forces immediate overflow recalculation.
   */
  update: () => void;

  /**
   * Resets overflow state to `false` in all directions.
   */
  reset: () => void;
}
