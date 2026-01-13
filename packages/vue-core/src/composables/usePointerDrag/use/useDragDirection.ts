import { readonly, shallowRef } from "vue";

import type { DragDirection } from "../types";

/**
 * Derives a semantic drag direction from delta values.
 *
 * The direction is determined using the first non-zero delta:
 * - horizontal movement (`dx`) takes precedence over vertical (`dy`)
 * - positive values map to `"right"` / `"bottom"`
 * - negative values map to `"left"` / `"top"`
 *
 * This composable does not compute deltas itself and does not maintain
 * any historical state. The direction is updated imperatively via `update()`
 * and cleared via `reset()`.
 *
 * @returns An object containing:
 * - `direction` – readonly ref with the current drag direction
 *   (`"left" | "right" | "top" | "bottom" | null`)
 * - `update(dx, dy)` – updates the direction based on delta values
 * - `reset()` – clears the direction
 */
export function useDragDirection() {
  const direction = shallowRef<DragDirection>(null);

  function update(dx: number, dy: number) {
    if (dx !== 0) direction.value = dx > 0 ? "right" : "left";
    else if (dy !== 0) direction.value = dy > 0 ? "bottom" : "top";
    else direction.value = null;
  }

  function reset() {
    direction.value = null;
  }

  return {
    direction: readonly(direction),
    update,
    reset,
  };
}
