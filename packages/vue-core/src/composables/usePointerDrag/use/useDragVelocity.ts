import { readonly, shallowRef } from "vue";

/**
 * Computes pointer drag velocity based on delta changes over time.
 *
 * Velocity is calculated as the difference between the current and previous
 * delta values divided by the elapsed time (`dt`).
 *
 * The first update call initializes the internal state and does not
 * produce a velocity value.
 *
 * This composable does not smooth, clamp, or normalize velocity values.
 * It simply reports raw velocity in units per millisecond.
 *
 * @returns An object containing:
 * - `vx`, `vy` – readonly refs with the current velocity on each axis
 * - `update(dx, dy, time)` – updates velocity using delta values and timestamp
 * - `reset()` – clears velocity and internal tracking state
 */
export function useDragVelocity() {
  const vx = shallowRef(0);
  const vy = shallowRef(0);

  let lastTime: number | null = null;
  let lastX = 0;
  let lastY = 0;

  function update(dx: number, dy: number, time: number) {
    if (lastTime == null) {
      lastTime = time;
      lastX = dx;
      lastY = dy;
      return;
    }

    const dt = time - lastTime;
    if (dt <= 0) return;

    vx.value = (dx - lastX) / dt;
    vy.value = (dy - lastY) / dt;

    lastTime = time;
    lastX = dx;
    lastY = dy;
  }

  function reset() {
    vx.value = 0;
    vy.value = 0;
    lastTime = null;
    lastX = 0;
    lastY = 0;
  }

  return {
    vx: readonly(vx),
    vy: readonly(vy),

    update,
    reset,
  };
}
