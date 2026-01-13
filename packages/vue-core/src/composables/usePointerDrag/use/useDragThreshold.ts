import { readonly, type Ref, shallowRef } from "vue";

import type { DragAxis } from "../types";

/**
 * Manages threshold crossing for drag interactions.
 *
 * This composable tracks whether a drag has passed a configured movement
 * threshold. Once the threshold is crossed, the state is permanently set
 * to `true` until `reset()` is called.
 *
 * The threshold check is edge-triggered (one-shot), not level-triggered:
 * the threshold only needs to be crossed once for the drag to become active.
 *
 * This composable does not compute deltas itself. The caller is responsible
 * for providing absolute delta values via `check()`.
 *
 * @param axis - Allowed drag axis (`"x" | "y" | "both"`).
 * @param threshold - Minimum movement required to activate the drag.
 *
 * @returns An object containing:
 * - `passed` – readonly ref indicating whether the threshold has been crossed
 * - `check(absX, absY)` – evaluates threshold crossing using absolute deltas
 * - `reset()` – clears the threshold state
 */
export function useDragThreshold(
  axis: Ref<DragAxis>,
  threshold: Ref<number>,
) {
  const passed = shallowRef(false);

  function check(absX: number, absY: number): boolean {
    if (passed.value) return true;
    if (threshold.value <= 0) {
      passed.value = true;
      return true;
    }

    if (
      (axis.value === "x" && absX >= threshold.value) ||
      (axis.value === "y" && absY >= threshold.value) ||
      (axis.value === "both" && Math.max(absX, absY) >= threshold.value)
    ) {
      passed.value = true;
      return true;
    }

    return false;
  }

  function reset() {
    passed.value = false;
  }

  return {
    passed: readonly(passed),
    check,
    reset,
  };
}
