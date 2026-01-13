import { readonly, type Ref, shallowRef } from "vue";

import type { DragAxis } from "../types";

/**
 * Computes and stores drag deltas based on pointer movement.
 *
 * This composable is responsible only for calculating raw and effective deltas.
 * It applies:
 * - axis filtering (`"x" | "y" | "both"`)
 * - optional axis locking (via `lockedAxis`)
 * - optional axis inversion
 *
 * It does not handle thresholds, velocity, direction, or pointer lifecycle.
 * All values are updated imperatively via `update()` and reset via `reset()`.
 *
 * @param axis - Allowed drag axis (`"x" | "y" | "both"`).
 * @param invertAxis - Axis inversion configuration (`"x" | "y" | "both" | null`).
 * @param lockedAxis - Locked axis (`"x" | "y" | null`) determined externally.
 *
 * @returns An object containing:
 * - `rawX`, `rawY` – raw pointer deltas from the drag start
 * - `absX`, `absY` – absolute raw deltas (useful for thresholds and axis locking)
 * - `deltaX`, `deltaY` – effective deltas after axis filtering and inversion
 * - `update(startX, startY, event)` – updates all delta values from a pointer event
 * - `reset()` – resets all stored delta values
 */
export function useDragDelta(
  axis: Ref<DragAxis>,
  invertAxis: Ref<DragAxis | null>,
  lockedAxis: Ref<"x" | "y" | null>,
) {
  const rawX = shallowRef(0);
  const rawY = shallowRef(0);
  const deltaX = shallowRef(0);
  const deltaY = shallowRef(0);
  const absX = shallowRef(0);
  const absY = shallowRef(0);

  function update(startX: number, startY: number, e: PointerEvent) {
    rawX.value = e.clientX - startX;
    rawY.value = e.clientY - startY;

    const effectiveAxis = lockedAxis.value ?? axis.value;

    let dx = effectiveAxis === "y" ? 0 : rawX.value;
    let dy = effectiveAxis === "x" ? 0 : rawY.value;

    if (invertAxis.value === "x" || invertAxis.value === "both") dx = -dx;
    if (invertAxis.value === "y" || invertAxis.value === "both") dy = -dy;

    absX.value = Math.abs(rawX.value);
    absY.value = Math.abs(rawY.value);
    deltaX.value = dx;
    deltaY.value = dy;
  }

  function reset() {
    rawX.value = 0;
    rawY.value = 0;
    deltaX.value = 0;
    deltaY.value = 0;
    absX.value = 0;
    absY.value = 0;
  }

  return {
    rawX: readonly(rawX),
    rawY: readonly(rawY),
    absX: readonly(absX),
    absY: readonly(absY),
    deltaX: readonly(deltaX),
    deltaY: readonly(deltaY),

    update,
    reset,
  };
}
