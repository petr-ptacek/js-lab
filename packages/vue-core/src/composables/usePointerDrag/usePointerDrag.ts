import { computed, onBeforeUnmount, readonly, shallowRef, toValue } from "vue";

import type { DragAxis, UsePointerDragOptions, UsePointerDragReturn } from "./types";
import { useDragAxisLock, useDragDelta, useDragDirection, useDragThreshold, useDragVelocity } from "./use";

export function usePointerDrag(options: UsePointerDragOptions = {}): UsePointerDragReturn {
  /****************************
   * Defaults vars
   ***************************/

  const isDisabled = computed(() => !!toValue(options.disabled));
  const axis = computed<DragAxis>(() => toValue(options.axis) ?? "both");
  const threshold = computed(() => Math.max(0, toValue(options.threshold) ?? 0));
  const lockAxisAfterThreshold = computed(() => !!toValue(options.lockAxisAfterThreshold));
  const invertAxis = computed<DragAxis | null>(() => {
    const ivAx = toValue(options.invertAxis);

    if (ivAx === true) return "both";
    if (ivAx === false || ivAx == null) return null;
    return ivAx;
  });

  /*********************
   Internal vars
   *******************/
  const isDragging = shallowRef(false);
  const isPressed = shallowRef(false);
  const activePointerId = shallowRef<number | null>(null);
  const captureEl = shallowRef<HTMLElement | null>(null);

  const startX = shallowRef(0);
  const startY = shallowRef(0);

  const axisLock = useDragAxisLock(axis, lockAxisAfterThreshold);
  const delta = useDragDelta(axis, invertAxis, axisLock.locked);
  const thresholdCtrl = useDragThreshold(axis, threshold);
  const direction = useDragDirection();
  const velocity = useDragVelocity();


  /*******************
   * LOGIC
   *******************/
  onBeforeUnmount(() => cleanup());

  /***************
   * FUNCTIONS
   ****************/

  function onPointerDown(e: PointerEvent) {
    if (
      activePointerId.value !== null ||
      isDisabled.value ||
      !e.currentTarget
    ) return;


    startX.value = e.clientX;
    startY.value = e.clientY;

    if (options.onStart?.({
      evt: e,
      startX: startX.value,
      startY: startY.value,
      deltaX: 0,
      deltaY: 0,
      velocityX: 0,
      velocityY: 0,
    }) === false) return;

    const target = e.currentTarget as HTMLElement;

    captureEl.value = target;
    activePointerId.value = e.pointerId;
    isPressed.value = true;

    target.setPointerCapture(e.pointerId);

    /*Add listeners*/
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    target.addEventListener("lostpointercapture", onLostPointerCapture);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isPressed.value || activePointerId.value !== e.pointerId) return;

    delta.update(startX.value, startY.value, e);

    if (!thresholdCtrl.check(delta.absX.value, delta.absY.value)) {
      direction.update(0, 0);
      velocity.reset();
      return;
    }

    if (!isDragging.value) {
      isDragging.value = true;
    }

    axisLock.update(delta.absX.value, delta.absY.value);
    direction.update(delta.deltaX.value, delta.deltaY.value);
    velocity.update(delta.deltaX.value, delta.deltaY.value, e.timeStamp);

    options.onMove?.({
      evt: e,
      startX: startX.value,
      startY: startY.value,
      deltaX: delta.deltaX.value,
      deltaY: delta.deltaY.value,
      velocityX: velocity.vx.value,
      velocityY: velocity.vy.value,
    });
  }

  function onPointerUp(e: PointerEvent) {
    if (activePointerId.value !== e.pointerId) return;
    endDrag(e);
  }

  function onLostPointerCapture(e: PointerEvent) {
    if (activePointerId.value !== e.pointerId) return;
    endDrag(e);
  }

  function endDrag(e: PointerEvent) {
    if (!isPressed.value) return;

    const wasDragging = isDragging.value;

    isPressed.value = false;
    isDragging.value = false;

    if (wasDragging) {
      options.onEnd?.({
        evt: e,
        startX: startX.value,
        startY: startY.value,
        deltaX: delta.deltaX.value,
        deltaY: delta.deltaY.value,
        velocityX: velocity.vx.value,
        velocityY: velocity.vy.value,
      });
    }

    cleanup();
  }

  function cleanup() {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);

    if (captureEl.value && activePointerId.value !== null) {
      try {
        captureEl.value.releasePointerCapture(activePointerId.value);
      } catch { /* empty */
      }
      captureEl.value.removeEventListener("lostpointercapture", onLostPointerCapture);
    }

    captureEl.value = null;
    activePointerId.value = null;
    isDragging.value = false;
    isPressed.value = false;

    thresholdCtrl.reset();
    axisLock.reset();
    direction.reset();
    velocity.reset();
    delta.reset();
  }

  return {
    onPointerDown,
    isDragging: readonly(isDragging),
    isPressed: readonly(isPressed),

    axis: readonly(axis),
    direction: readonly(direction.direction),
    invertAxis: readonly(invertAxis),
    startX: readonly(startX),
    startY: readonly(startY),
    deltaX: readonly(delta.deltaX),
    deltaY: readonly(delta.deltaY),
    velocityX: readonly(velocity.vx),
    velocityY: readonly(velocity.vy),
  };
}
