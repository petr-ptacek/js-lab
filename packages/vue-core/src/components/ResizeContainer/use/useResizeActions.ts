import { computed, type Ref } from "vue";

import type { SizeValue } from "../types";
import { normalizeSizeToPercent } from "../utils";

export type UseResizeActionsOptions = {
  containerSize: Ref<number>;
  minSize?: Ref<SizeValue | undefined>;
  maxSize?: Ref<SizeValue | undefined>;
  currentPercent: Ref<number>;
  restorable?: Ref<boolean>;

  onChange: (nextPercent: number) => void;
};

/**
 * Resize actions use a restore-based model:
 *
 * - collapse:
 *   - from normal → min
 *   - from expanded → restore last normal size
 *
 * - expand:
 *   - from collapsed → restore last normal size
 *   - from normal → max
 *
 * This ensures symmetric, non-destructive UX.
 */
export function useResizeActions(options: UseResizeActionsOptions) {
  const restorable = computed(() => options.restorable?.value ?? true);

  const epsilon = 0.5;
  let lastRestoredPercent: number | null = null;

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
    if (!options.containerSize.value) return;

    if (!restorable.value) {
      options.onChange(minPercent.value);
      return;
    }

    // RESTORABLE MODE
    if (isExpanded.value && lastRestoredPercent !== null) {
      options.onChange(lastRestoredPercent);
      return;
    }

    if (!isCollapsed.value) {
      lastRestoredPercent = options.currentPercent.value;
      options.onChange(minPercent.value);
    }
  }

  function expand() {
    if (!options.containerSize.value) return;

    if (!restorable.value) {
      options.onChange(maxPercent.value);
      return;
    }

    // RESTORABLE MODE
    if (isCollapsed.value && lastRestoredPercent !== null) {
      options.onChange(lastRestoredPercent);
      return;
    }

    options.onChange(maxPercent.value);
  }

  function toggle() {
    if (isCollapsed.value) {
      expand();
      return;
    }

    collapse();
  }

  function setLastRestoredPercent(value: number) {
    lastRestoredPercent = value;
  }

  return {
    collapse,
    expand,
    toggle,

    setLastRestoredPercent,

    isCollapsed,
    isExpanded,
  };
}
