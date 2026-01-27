import { type MaybeComputedElementRef, useElementSize, useResizeObserver, watchDebounced } from "@vueuse/core";
import { computed, readonly, shallowRef, toValue } from "vue";

import type { OverflowDirection, UseElementOverflowOptions, UseElementOverflowReturn } from "./types";

/**
 * Reactive utility for detecting element overflow.
 *
 * Tracks whether the target element overflows vertically, horizontally,
 * or in both directions. The composable reacts to:
 *
 * - element size changes (layout / resize)
 * - optional content changes via ResizeObserver (e.g. async API data)
 * - dynamic enabling / disabling
 *
 * Internally it compares `scrollWidth / scrollHeight` against
 * `clientWidth / clientHeight`.
 *
 * @param target
 * A reactive reference or getter returning the target HTMLElement.
 *
 * @param options
 * Configuration options.
 *
 * @param options.disabled
 * Enables or disables overflow detection.
 * When disabled, overflow state is reset.
 *
 * @param options.observeContent
 * Whether to observe content size changes using `ResizeObserver`.
 * Useful when element content changes without layout resize
 * (e.g. async data, slot updates).
 *
 * @param options.debounce
 * Debounce delay (in milliseconds) for layout-based recalculations.
 * Defaults to `16` (~1 animation frame).
 *
 * @returns
 * Reactive overflow state and control methods.
 *
 * @example
 * ```ts
 * const { hasOverflow, direction } = useElementOverflow(containerRef);
 *
 * watch(direction, (dir) => {
 *   if (dir === "vertical") {
 *     // show scrollbar hint
 *   }
 * });
 * ```
 */
export function useElementOverflow(
  target: MaybeComputedElementRef<HTMLElement | null>,
  options: UseElementOverflowOptions = {},
): UseElementOverflowReturn {
  const disabled = computed(() => toValue(options.disabled) ?? false);
  const observeContent = computed(() => toValue(options.observeContent) ?? true);
  const targetEl = computed(() => toValue(target));
  const debounceDelay = computed(() => options.debounceDelay ?? 16);

  const hasVertical = shallowRef(false);
  const hasHorizontal = shallowRef(false);
  const hasOverflow = computed(() => hasVertical.value || hasHorizontal.value);

  const elSize = useElementSize(targetEl);
  const direction = computed<OverflowDirection>(() => {
    if (hasHorizontal.value && hasVertical.value) return "both";
    if (hasHorizontal.value) return "horizontal";
    if (hasVertical.value) return "vertical";
    return "none";
  });

  useResizeObserver(
    targetEl,
    () => {
      if (!observeContent.value || disabled.value) {
        return;
      }

      update();
    },
  );

  watchDebounced(
    [elSize.width, elSize.height, disabled, targetEl],
    update,
    { immediate: true, debounce: debounceDelay },
  );

  function reset() {
    hasVertical.value = false;
    hasHorizontal.value = false;
  }

  function update() {
    if (!targetEl.value || disabled.value) {
      reset();
      return;
    }

    hasVertical.value = targetEl.value.scrollHeight > targetEl.value.clientHeight;
    hasHorizontal.value = targetEl.value.scrollWidth > targetEl.value.clientWidth;
  }

  return {
    hasHorizontal: readonly(hasHorizontal),
    hasVertical: readonly(hasVertical),
    hasOverflow: readonly(hasOverflow),
    direction: readonly(direction),
    update,
    reset,
  };
}
