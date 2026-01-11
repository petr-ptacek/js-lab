import { useElementSize }                  from "@vueuse/core";
import type { Ref }                        from "vue";
import { computed, useTemplateRef, watch } from "vue";

import type { UiResizeContainerModalValue, UiResizeContainerProps } from "../types";
import { useResizeDrag }                                            from "./useResizeDrag.ts";
import { useResizeSizes }                                           from "./useResizeSizes";

export type UseControllerOptions = {
  modelValue: Ref<UiResizeContainerModalValue>;
  props: UiResizeContainerProps;
}

export function useController(options: UseControllerOptions) {
  // Content
  const contentEl = useTemplateRef<HTMLDivElement>("content");
  const contentSize = useElementSize(contentEl);

  // Orientation
  const isOrientationVertical = computed(() => options.props.orientation === "vertical");
  // const isOrientationHorizontal = computed(() => options.props.orientation === "horizontal");

  const contentSizeByOrientation = computed(() => {
    return isOrientationVertical.value ?
           contentSize.width.value :
           contentSize.height.value;
  });

  const { alphaStyle, betaStyle } = useResizeSizes({
    modelValue: options.modelValue,
    containerSize: contentSizeByOrientation,
    origin: computed(() => options.props.origin),
    minSize: computed(() => options.props.minSize),
    maxSize: computed(() => options.props.maxSize),
  });

  const { deltaPx, onLostPointerCapture, onPointerDown } = useResizeDrag({
    orientation: () => options.props.orientation,
    disabled: () => !options.props.resizeable,
  });

  watch(deltaPx, v => {
    console.log("deltaPx", v);
  });

  return {
    alphaStyle,
    betaStyle,

    onLostPointerCapture,
    onPointerDown,
  };
}



