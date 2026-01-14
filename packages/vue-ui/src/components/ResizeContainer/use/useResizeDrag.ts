import { usePointerDrag } from "@petr-ptacek/vue-core";
import { readonly, type Ref, shallowRef, watch, computed } from "vue";

import type { OrientationValue } from "../types";

export type UseResizeOptions = {
  orientation: Ref<OrientationValue>;
  disabled: Ref<boolean>;
};

export function useResizeDrag(options: UseResizeOptions) {
  const deltaPx = shallowRef(0);

  const axis = computed(() =>
    options.orientation.value === "vertical" ? "x" : "y",
  );

  const { onPointerDown, isDragging, deltaX, deltaY, isPressed } = usePointerDrag({
    disabled: options.disabled,
    threshold: 4,
    lockAxisAfterThreshold: true,
    axis,
  });

  watch([deltaX, deltaY], () => {
    deltaPx.value = axis.value === "x" ? deltaX.value : deltaY.value;
  });

  return {
    onPointerDown,
    isDragging,
    isPressed,
    deltaPx: readonly(deltaPx),
  };
}
