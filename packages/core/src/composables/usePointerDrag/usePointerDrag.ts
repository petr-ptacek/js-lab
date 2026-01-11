import { readonly, shallowRef } from "vue";

import type { UsePointerDragOptions, UsePointerDragReturn } from "./types";


export function usePointerDrag(options: UsePointerDragOptions = {}): UsePointerDragReturn {
  const isDragging = shallowRef(false);
  const activePointerId = shallowRef<number | null>(null);
  const captureEl = shallowRef<HTMLElement | null>(null);

  function onPointerDown(e: PointerEvent) {
    if ( options.disabled?.value ) return;

    const target = e.currentTarget as HTMLElement | null;
    if ( !target ) return;

    captureEl.value = target;
    activePointerId.value = e.pointerId;
    isDragging.value = true;

    target.setPointerCapture(e.pointerId);

    options.onStart?.(e);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    target.addEventListener("lostpointercapture", onLostPointerCapture);
  }

  function onPointerMove(e: PointerEvent) {
    if ( !isDragging.value ) return;
    if ( activePointerId.value !== e.pointerId ) return;

    options.onMove?.(e);
  }

  function onPointerUp(e: PointerEvent) {
    if ( activePointerId.value !== e.pointerId ) return;
    endDrag(e);
  }

  function onLostPointerCapture(e: PointerEvent) {
    if ( activePointerId.value !== e.pointerId ) return;
    endDrag(e);
  }

  function endDrag(e: PointerEvent) {
    isDragging.value = false;
    const pointerId = activePointerId.value;

    options.onEnd?.(e);
    cleanup(pointerId);

    activePointerId.value = null;
  }

  function cleanup(pointerId: number | null) {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);

    if ( captureEl.value && pointerId !== null ) {
      try {
        captureEl.value.releasePointerCapture(pointerId);
      } catch { /* empty */
      }
      captureEl.value.removeEventListener("lostpointercapture", onLostPointerCapture);
    }

    captureEl.value = null;
  }

  return {
    onPointerDown,
    isDragging: readonly(isDragging),
  };
}
