import { readonly, type Ref, shallowRef } from "vue";

import type { DragAxis } from "../types";

/**
 * Manages one-time axis locking during a drag interaction.
 *
 * When enabled and the allowed axis is `"both"`, the first dominant movement
 * (based on absolute delta) permanently locks the drag to either the X or Y axis.
 * The lock is one-shot and remains active until `reset()` is called.
 *
 * This composable does not decide *when* locking should occur – it only decides
 * *which* axis to lock. The caller is responsible for invoking `update()` at the
 * appropriate time (typically after a threshold has been passed).
 *
 * @param axis - Allowed drag axis (`"x" | "y" | "both"`). Locking only applies when `"both"`.
 * @param enabled - Enables or disables axis locking (usually `lockAxisAfterThreshold`).
 *
 * @returns An object containing:
 * - `locked` – readonly ref with the locked axis (`"x" | "y" | null`)
 * - `update(absX, absY)` – evaluates and locks the axis based on dominant movement
 * - `reset()` – clears the locked axis
 */
export function useDragAxisLock(
  axis: Ref<DragAxis>,
  enabled: Ref<boolean>,
) {
  const locked = shallowRef<Extract<DragAxis, "x" | "y"> | null>(null);

  function update(absX: number, absY: number) {
    if (!enabled.value || axis.value !== "both" || locked.value) return;
    locked.value = absX > absY ? "x" : "y";
  }

  function reset() {
    locked.value = null;
  }

  return {
    locked: readonly(locked),
    update,
    reset,
  };
}
