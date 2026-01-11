import { readonly, type Ref, shallowRef } from "vue";

import type { OrientationValue } from "../types";

export type UseResizeOptions = {
  orientation: Ref<OrientationValue>;
  disabled?: Ref<boolean>;
};

export function useResizeDrag(options: UseResizeOptions) {
  const isDragging = shallowRef(false);
  const startPos = shallowRef(0);
  const deltaPx = shallowRef(0);
  const activePointerId = shallowRef<number | null>(null);
  const captureEl = shallowRef<HTMLElement | null>(null);

  function onPointerDown(e: PointerEvent) {
    e.preventDefault();
    if ( options.disabled?.value ) return;

    const target = e.currentTarget as HTMLElement | null;
    if ( !target ) return;

    captureEl.value = target;
    target.setPointerCapture(e.pointerId);
    activePointerId.value = e.pointerId;

    isDragging.value = true;
    deltaPx.value = 0;

    startPos.value = options.orientation.value === "vertical" ?
                     e.clientX :
                     e.clientY;

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  }

  function onPointerMove(e: PointerEvent) {
    if ( !isDragging.value ) return;

    if ( activePointerId.value !== null && e.pointerId !== activePointerId.value ) {
      return;
    }

    const current =
      options.orientation.value === "vertical"
      ? e.clientX
      : e.clientY;

    deltaPx.value = current - startPos.value;
  }

  function onPointerUp(e: PointerEvent) {
    if ( activePointerId.value !== null && e.pointerId !== activePointerId.value ) {
      return;
    }

    isDragging.value = false;
    cleanup();
  }

  function onLostPointerCapture(e: PointerEvent) {
    if ( activePointerId.value !== null && e.pointerId !== activePointerId.value ) {
      return;
    }
    isDragging.value = false;
    cleanup();
  }

  function cleanup() {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);

    if ( captureEl.value && activePointerId.value !== null ) {
      try {
        captureEl.value.releasePointerCapture(activePointerId.value);
      } catch ( _e ) { /* empty */
      }
    }

    activePointerId.value = null;
  }

  return {
    onPointerDown,
    onLostPointerCapture,
    isDragging: readonly(isDragging),
    deltaPx: readonly(deltaPx),
  };
}
