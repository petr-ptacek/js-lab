import { computed, onBeforeUnmount, readonly, shallowRef, toValue } from "vue";

import type { DragAxis, EventData, UsePointerDragOptions, UsePointerDragReturn } from "./types";

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
  const activePointerId = shallowRef<number | null>(null);
  const captureEl = shallowRef<HTMLElement | null>(null);
  const thresholdPassed = shallowRef(false);
  const lockedAxis = shallowRef<"x" | "y" | null>(null);

  const startX = shallowRef(0);
  const startY = shallowRef(0);
  const deltaX = shallowRef(0);
  const deltaY = shallowRef(0);

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

    const target = e.currentTarget as HTMLElement;

    startX.value = e.clientX;
    startY.value = e.clientY;

    if (options.onStart?.(createEventData(e)) === false) return;

    // Logic

    captureEl.value = target;
    activePointerId.value = e.pointerId;
    isDragging.value = true;

    target.setPointerCapture(e.pointerId);

    /*Add listeners*/
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    target.addEventListener("lostpointercapture", onLostPointerCapture);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging.value || activePointerId.value !== e.pointerId) return;

    const data = createEventData(e);
    deltaX.value = data.deltaX;
    deltaY.value = data.deltaY;

    options.onMove?.(data);
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
    if (!isDragging.value) return;

    const data = createEventData(e);
    deltaX.value = data.deltaX;
    deltaY.value = data.deltaY;

    isDragging.value = false;
    options.onEnd?.(data);
    cleanup();
  }

  function createEventData(e: PointerEvent): EventData {
    const delta = computeDelta(e);

    return {
      evt: e,
      startX: startX.value,
      startY: startY.value,
      deltaX: delta.deltaX,
      deltaY: delta.deltaY,
    };
  }

  function computeDelta(e: PointerEvent) {
    const rawDeltaX = e.clientX - startX.value;
    const rawDeltaY = e.clientY - startY.value;

    const absX = Math.abs(rawDeltaX);
    const absY = Math.abs(rawDeltaY);

    if (!thresholdPassed.value && threshold.value > 0) {
      let passed = false;

      if (axis.value === "x") {
        passed = absX >= threshold.value;
      } else if (axis.value === "y") {
        passed = absY >= threshold.value;
      } else {
        passed = Math.max(absX, absY) >= threshold.value;
      }

      if (!passed) {
        return { deltaX: 0, deltaY: 0 };
      }

      thresholdPassed.value = true;
    }

    if (
      thresholdPassed.value &&
      lockAxisAfterThreshold.value &&
      axis.value === "both" &&
      lockedAxis.value === null
    ) {
      lockedAxis.value = absX > absY ? "x" : "y";
    }

    const effectiveAxis = lockedAxis.value ?? axis.value;
    let deltaX = effectiveAxis === "y" ? 0 : rawDeltaX;
    let deltaY = effectiveAxis === "x" ? 0 : rawDeltaY;

    if (invertAxis.value === "x" || invertAxis.value === "both") {
      deltaX = -deltaX;
    }
    if (invertAxis.value === "y" || invertAxis.value === "both") {
      deltaY = -deltaY;
    }

    return {
      deltaX,
      deltaY,
    };
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
    thresholdPassed.value = false;
    lockedAxis.value = null;

    startX.value = 0;
    startY.value = 0;
    deltaX.value = 0;
    deltaY.value = 0;
  }

  return {
    onPointerDown,
    isDragging: readonly(isDragging),

    axis: readonly(axis),
    invertAxis: readonly(invertAxis),
    startX: readonly(startX),
    startY: readonly(startY),
    deltaX: readonly(deltaX),
    deltaY: readonly(deltaY),
  };
}
