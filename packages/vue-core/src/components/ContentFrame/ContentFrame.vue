<style>
@import "./styles.css";
</style>

<script setup lang="ts">
import { normalizeClass, readonly, shallowRef } from "vue";

import type { Slots, Props, Expose } from "./types";

withDefaults(
  defineProps<Props>(),
  { scrollable: true },
);

/***************************************
 Template HTMLElements Refs
 ***************************************/

const contentWrapper = shallowRef<HTMLElement | null>(null);
const contentOverlay = shallowRef<HTMLElement | null>(null);
const contentScroll = shallowRef<HTMLElement | null>(null);
const content = shallowRef<HTMLElement | null>(null);

/***************************************
 Expose and Slots
 ***************************************/

defineSlots<Slots>();

const exposed: Expose = {
  contentWrapper: readonly(contentWrapper) as unknown as Expose["contentWrapper"],
  contentOverlay: readonly(contentOverlay) as unknown as Expose["contentOverlay"],
  contentScroll: readonly(contentScroll) as unknown as Expose["contentScroll"],
  content: readonly(content) as unknown as Expose["content"],
};

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
