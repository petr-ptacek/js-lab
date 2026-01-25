import { type MaybeComputedElementRef, useElementSize }   from "@vueuse/core";
import { computed, readonly, shallowRef, toValue, watch } from "vue";

import type { UseElementOverflowOptions, UseElementOverflowReturn } from "./types";

export function useElementOverflow(
  target: MaybeComputedElementRef<HTMLElement | null>,
  options: UseElementOverflowOptions = {},
): UseElementOverflowReturn {
  const enabled = computed(() => toValue(options.enabled) ?? true);
  const targetEl = computed(() => toValue(target));

  const hasVertical = shallowRef(false);
  const hasHorizontal = shallowRef(false);
  const hasOverflow = computed(() => hasVertical.value || hasHorizontal.value);

  const elSize = useElementSize(targetEl);

  watch(
    [elSize.width, elSize.height, enabled],
    update,
    { immediate: true },
  );

  function clear() {
    hasVertical.value = false;
    hasHorizontal.value = false;
  }

  function update() {
    if ( !targetEl.value || !enabled.value ) {
      hasVertical.value = false;
      hasHorizontal.value = false;
      return;
    }

    hasVertical.value = targetEl.value.scrollHeight > targetEl.value.clientHeight;
    hasHorizontal.value = targetEl.value.scrollWidth > targetEl.value.clientWidth;
  }

  return {
    hasHorizontal: readonly(hasHorizontal),
    hasVertical: readonly(hasVertical),
    hasOverflow: readonly(hasOverflow),
    update,
    clear,
  };
}
