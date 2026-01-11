<script setup lang="ts">
import { useProxyValue, isUndefined } from "@petr-ptacek/vue-core";
import { computed }                   from "vue";

import type {
  UiResizeContainerEmits,
  UiResizeContainerModalValue,
  UiResizeContainerProps,
  UiResizeContainerSlots,
}                        from "./types";
import { useController } from "./use/useController.ts";


const props = withDefaults(
  defineProps<UiResizeContainerProps>(),
  {
    modelValue: undefined,
    orientation: "vertical",
    origin: "alpha",
    resizeable: true,
    collapsible: true,
    expandable: true,
    animatable: true,
    defaultValue: "50%",
  },
);

const emit = defineEmits<UiResizeContainerEmits>();

const { value: mv } = useProxyValue<UiResizeContainerModalValue>(computed({
    get: () => props.modelValue,
    set: (value) => {
      if ( isUndefined(value) ) return;
      emit("update:modelValue", value);
    },
  }),
  () => props.defaultValue,
  {
    autoSync: true,
    debounce: 150,
  },
);

const {
  betaStyle,
  alphaStyle,
  onPointerDown,
  onLostPointerCapture
} = useController({
  modelValue: mv,
  props,
});

defineSlots<UiResizeContainerSlots>();
</script>

<template>
  <div
    class="ui-resize-container"
    :data-orientation="orientation"
    :data-origin="origin"
    :data-animatable="animatable"
  >
    <div
      class="ui-resize-container__content"
      ref="content"
    >
      <div
        class="ui-resize-container__section"
        data-section="alpha"
        ref="sectionAlpha"
        :style="alphaStyle"
      >
        <slot name="alpha" />
      </div>

      <div
        class="ui-resize-container__divider"
        ref="divider"
      >
        <div
          class="ui-resize-container__resizer"
          @pointerdown="onPointerDown"
          @lostpointercapture="onLostPointerCapture"
        >
        </div>
      </div>

      <div
        class="ui-resize-container__section"
        data-section="beta"
        ref="sectionBeta"
        :style="betaStyle"
      >
        <slot name="beta" />
      </div>
    </div>
  </div>
</template>
