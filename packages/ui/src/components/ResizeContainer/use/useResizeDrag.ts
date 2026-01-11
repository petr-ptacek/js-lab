import { usePointerDrag }                 from "@petr-ptacek/vue-core";
import { readonly, type Ref, shallowRef } from "vue";

import type { OrientationValue } from "../types";

export type UseResizeOptions = {
  orientation: Ref<OrientationValue>;
  disabled: Ref<boolean>;
};

export function useResizeDrag(options: UseResizeOptions) {
  const startPos = shallowRef(0);
  const deltaPx = shallowRef(0);

  const { onPointerDown, isDragging } = usePointerDrag({
    disabled: options.disabled,
    onStart: (e) => {
      e.preventDefault();

      startPos.value =
        options.orientation.value === "vertical"
        ? e.clientX
        : e.clientY;

      deltaPx.value = 0;
    },
    onMove: (e) => {
      const current =
        options.orientation.value === "vertical"
        ? e.clientX
        : e.clientY;

      deltaPx.value = current - startPos.value;
    },
  });

  return {
    onPointerDown,
    isDragging,
    deltaPx: readonly(deltaPx),
  };
}
