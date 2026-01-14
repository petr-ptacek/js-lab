<script setup lang="ts">
import { isUndefined, useProxyValue } from "@petr-ptacek/vue-core";
import { computed } from "vue";

import type {
  UiResizeContainerEmits,
  UiResizeContainerModalValue,
  UiResizeContainerProps,
  UiResizeContainerSlots,
} from "./types";
import { useController } from "./use/useController";


const props = withDefaults(
  defineProps<UiResizeContainerProps>(),
  {
    modelValue: undefined,
    orientation: "vertical",
    origin: "beta",
    resizeable: true,
    collapsible: true,
    expandable: true,
    animatable: true,
    defaultValue: "50%",
    showGrip: false,
    rememberSize: true
  },
);

const emit = defineEmits<UiResizeContainerEmits>();

const { value: mv } = useProxyValue<UiResizeContainerModalValue>(computed({
    get: () => props.modelValue,
    set: (value) => {
      if (isUndefined(value)) return;
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
  expand,
  collapse,
  isExpanded,
  isCollapsed,
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
    :data-collapsed="isCollapsed"
    :data-expanded="isExpanded"
    :data-collapsible="collapsible"
    :data-expandable="expandable"
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

      <div class="ui-resize-container__divider">
        <div
          class="ui-resize-container__handler"
          @pointerdown="onPointerDown"
        ></div>

        <div class="ui-resize-container__actions">
          <div
            class="ui-resize-container__action"
            data-action="collapse"
            :data-active-="collapsible && !isCollapsed"
            @click="collapse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ui-resize-container__icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </div>

          <!-- GRIP -->
          <div
            v-if="showGrip"
            class="ui-resize-container__grip"
            @pointerdown="onPointerDown"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M7 2a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
            </svg>
          </div>

          <div
            class="ui-resize-container__action"
            data-action="expand"
            :data-visible="expandable && !isExpanded"
            @click="expand"
          >
            <svg
              class="ui-resize-container__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
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
