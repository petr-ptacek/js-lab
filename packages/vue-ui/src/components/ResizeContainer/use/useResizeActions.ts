import { computed, type Ref }     from "vue";

import type { SizeValue }         from "../types";
import { normalizeSizeToPercent } from "../utils";

export type UseResizeActionsOptions = {
  containerSize: Ref<number>;
  minSize?: Ref<SizeValue | undefined>;
  maxSize?: Ref<SizeValue | undefined>;
  currentPercent: Ref<number>;

  onChange: (nextPercent: number) => void;
};

export function useResizeActions(options: UseResizeActionsOptions) {
  const epsilon = 0.5;

  let lastExpandedPercent: number | null = null;

  const minPercent = computed(() =>
    normalizeSizeToPercent(
      options.minSize?.value ?? "0%",
      options.containerSize.value,
      {
        minSize: options.minSize?.value,
        maxSize: options.maxSize?.value,
      },
    ),
  );

  const maxPercent = computed(() =>
    normalizeSizeToPercent(
      options.maxSize?.value ?? "100%",
      options.containerSize.value,
      {
        minSize: options.minSize?.value,
        maxSize: options.maxSize?.value,
      },
    ),
  );

  const isCollapsed = computed(() => {
    return options.currentPercent.value <= minPercent.value + epsilon;
  });

  const isExpanded = computed(() => {
    return options.currentPercent.value >= maxPercent.value - epsilon;
  });

  function collapse() {
    if ( !options.containerSize.value ) return;

    if ( !isCollapsed.value ) {
      lastExpandedPercent = options.currentPercent.value;
    }

    options.onChange(minPercent.value);
  }

  function expand() {
    if ( !options.containerSize.value ) return;

    const target =
      lastExpandedPercent !== null
      ? lastExpandedPercent
      : maxPercent.value;

    options.onChange(target);
  }

  function toggle() {
    if ( isCollapsed.value ) {
      expand();
      return;
    }

    collapse();
  }

  return {
    collapse,
    expand,
    toggle,

    // 👇 DERIVOVANÝ STAV
    isCollapsed,
    isExpanded,
  };
}
