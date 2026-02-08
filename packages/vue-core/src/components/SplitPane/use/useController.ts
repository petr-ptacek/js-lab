import { useElementSize } from "@vueuse/core";
import type { Ref } from "vue";
import { computed, useTemplateRef, watch } from "vue";

import type { SplitPaneModelValue, SplitPaneProps }       from "../types";
import { clampPercentWithLimits, normalizeSizeToPercent } from "../utils";
import { useResizeActions } from "./useResizeActions";
import { useResizeDrag } from "./useResizeDrag";
import { useResizeSizes } from "./useResizeSizes";
import { useResizeValue } from "./useResizeValue";

export type UseControllerOptions = {
  modelValue: Ref<SplitPaneModelValue>;
  props: SplitPaneProps;
}

export function useController(options: UseControllerOptions) {
  // Content
  const containerEl = useTemplateRef<HTMLDivElement>("content");
  const containerElSize = useElementSize(containerEl);

  // Orientation
  const isOrientationVertical = computed(() => options.props.orientation === "vertical");

  const containerSize = computed(() => {
    return isOrientationVertical.value ?
           containerElSize.width.value :
           containerElSize.height.value;
  });

  const currentPercent = computed(() => {
    return normalizeSizeToPercent(
      options.modelValue.value,
      containerSize.value,
      {
        minSize: options.props.minSize,
        maxSize: options.props.maxSize,
      },
    );
  });

  const { alphaStyle, betaStyle } = useResizeSizes({
    modelValue: options.modelValue,
    containerSize,
    origin: computed(() => options.props.origin!),
    minSize: computed(() => options.props.minSize),
    maxSize: computed(() => options.props.maxSize),
  });

  const {
    deltaPx,
    onPointerDown,
    isDragging,
  } = useResizeDrag({
    orientation: computed(() => options.props.orientation!),
    disabled: computed(() => !options.props.resizeable),
  });

  const { nextPercent, setStartPercent } = useResizeValue({
    deltaPx,
    containerSize,
    origin: computed(() => options.props.origin!),
    isDragging,
  });

  const { isCollapsed, collapse, toggle, isExpanded, expand, setLastRestoredPercent } = useResizeActions({
    containerSize,
    currentPercent,
    minSize: computed(() => options.props.minSize),
    maxSize: computed(() => options.props.maxSize),
    restorable: computed(() => !!options.props.rememberSize),
    onChange: (percent) => {
      options.modelValue.value = `${percent}%`;
    },
  });

  // při startu dragu
  watch(isDragging, (dragging, wasDragging) => {
    if (dragging && !wasDragging) {
      // drag start
      setStartPercent(currentPercent.value);
    }

    if (!dragging && wasDragging) {
      // drag end
      setLastRestoredPercent(currentPercent.value);
    }
  });

  // při pohybu
  watch(nextPercent, (value) => {
    if (!isDragging.value) return;
    if (!containerSize.value) return;

    const clamped = clampPercentWithLimits(
      value,
      containerSize.value,
      {
        minSize: options.props.minSize,
        maxSize: options.props.maxSize,
      },
    );
    options.modelValue.value = `${clamped}%`;
  });

  return {
    alphaStyle,
    betaStyle,

    onPointerDown,

    isDragging,
    isCollapsed,
    isExpanded,

    collapse,
    expand,
    toggle,
  };
}
