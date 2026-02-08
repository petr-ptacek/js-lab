<style>
@import "./styles/index.css";
</style>

<script setup lang="ts">
import { isUndefined }              from "@petr-ptacek/js-core";
import { computed, normalizeClass } from "vue";

import type {
  SplitPaneEmits, SplitPaneExpose,
  SplitPaneModelValue,
  SplitPaneProps,
  SplitPaneSlots,
}                        from "./types";
import { useProxyValue } from "../../composables";
import { useController } from "./use/useController";


const props = withDefaults(
  defineProps<SplitPaneProps>(),
  {
    modelValue: undefined,
    orientation: "vertical",
    origin: "alpha",
    resizeable: true,
    collapsible: true,
    expandable: true,
    animatable: true,
    defaultValue: "50%",
    showGrip: false,
    rememberSize: true,
  },
);

const emit = defineEmits<SplitPaneEmits>();

const { value: mv } = useProxyValue<SplitPaneModelValue>(computed({
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
  expand,
  collapse,
  isExpanded,
  isCollapsed,
} = useController({
  modelValue: mv,
  props,
});

defineSlots<SplitPaneSlots>();
defineExpose<SplitPaneExpose>({
  collapse,
  expand,
});
</script>

<template>
  <div
    class="ui-split-pane"
    :class="props.ui?.root"
    :data-orientation="orientation"
    :data-origin="origin"
    :data-animatable="animatable"
    :data-collapsed="isCollapsed"
    :data-expanded="isExpanded"
    :data-collapsible="collapsible"
    :data-expandable="expandable"
  >
    <div
      class="ui-split-pane__content"
      :class="props.ui?.content"
      ref="content"
      data-slot="content"
    >
      <div
        class="ui-split-pane__section"
        :class="normalizeClass([props.ui?.section, props.ui?.sectionAlpha])"
        data-section="alpha"
        :style="alphaStyle"
        data-slot="alpha"
      >
        <slot name="alpha" />
      </div>

      <div
        class="ui-split-pane__divider"
        :class="props.ui?.divider"
      >
        <div
          class="ui-split-pane__handler"
          :class="props.ui?.resizeHandler"
          @pointerdown="onPointerDown"
        ></div>

        <div
          v-if="showGrip"
          class="ui-split-pane__grip-wrapper"
          :class="normalizeClass(ui?.gripWrapper)"
          data-slot="gripWrapper"
        >
          <slot
            name="grip"
            :onPointerDown="onPointerDown"
            :ui="normalizeClass(['ui-split-pane__grip', ui?.grip])"
          >
            <div
              class="ui-split-pane__grip"
              :class="normalizeClass(ui?.grip)"
              @pointerdown="onPointerDown"
            ></div>
          </slot>
        </div>

        <div
          v-if="showActions"
          class="ui-split-pane__actions-wrapper"
          :class="normalizeClass(ui?.actionsWrapper)"
          data-slot="actionsWrapper"
        >
          <slot
            name="actions"
            :isCollapsed="isCollapsed"
            :isExpanded="isExpanded"
            :collapse="collapse"
            :expand="expand"
            :ui="normalizeClass(['ui-split-pane__actions', ui?.actions])"
          >
            <div
              class="ui-split-pane__actions"
              :class="normalizeClass(ui?.actions)"
            >
            </div>
          </slot>
        </div>

      </div>

      <div
        class="ui-split-pane__section"
        :class="normalizeClass([props.ui?.section, props.ui?.sectionBeta])"
        data-section="beta"
        :style="betaStyle"
        data-slot="beta"
      >
        <slot name="beta" />
      </div>
    </div>
  </div>
</template>
