<style>
@import "./styles.css";
</style>

<script setup lang="ts">
import { normalizeClass } from "vue";

import type { Slots, Props, Expose } from "./types";
import { useController } from "./useController";

const props = withDefaults(
  defineProps<Props>(),
  { scrollable: true },
);

const {
  contentWrapper,
  contentOverlay,
  contentScroll,
  content,
  scrollTo,
  scrollToTop,
  scrollToBottom,
} = useController({ props });

/***************************************
 Expose and Slots
 ***************************************/

defineSlots<Slots>();

const exposed = {
  contentWrapper,
  contentOverlay,
  contentScroll,
  content,

  scrollTo,
  scrollToTop,
  scrollToBottom,
} satisfies Expose;

defineExpose(exposed);
</script>

<template>
  <div
    class="ui-content-frame"
    :class="normalizeClass(ui?.root)"
    :data-scrollable="scrollable"
  >
    <slot name="overlay" />

    <div
      class="ui-content-frame__header"
      :class="normalizeClass(ui?.header)"
      data-slot="header"
    >
      <slot name="header" />
    </div>

    <div
      class="ui-content-frame__content-wrapper"
      :class="normalizeClass(ui?.contentWrapper)"
      data-slot="content-wrapper"
      ref="contentWrapper"
    >
      <div
        class="ui-content-frame__content-overlay"
        :class="normalizeClass(ui?.contentOverlay)"
        data-slot="content-overlay"
        ref="contentOverlay"
      >
        <slot name="contentOverlay" />
      </div>

      <div
        class="ui-content-frame__content-scroll"
        :class="normalizeClass(ui?.contentScroll)"
        data-slot="content-scroll"
        ref="contentScroll"
      >
        <div
          class="ui-content-frame__content"
          :class="normalizeClass(ui?.content)"
          data-slot="content"
          ref="content"
        >
          <slot />
        </div>
      </div>
    </div>

    <div
      class="ui-content-frame__footer"
      :class="normalizeClass(ui?.footer)"
      data-slot="footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
