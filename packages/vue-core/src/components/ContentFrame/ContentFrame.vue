<script setup lang="ts">
import { normalizeClass } from "vue";

import type { ContentFrameSlots, ContentFrameProps } from "./types";

withDefaults(
  defineProps<ContentFrameProps>(),
  { scrollable: true },
);
defineSlots<ContentFrameSlots>();
</script>

<template>
  <div
    class="ui-content-frame"
    :class="normalizeClass(ui?.root)"
    :data-scrollable="scrollable"
  >
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
    >
      <div
        class="ui-content-frame__content"
        :class="normalizeClass(ui?.content)"
        data-slot="content"
      >
        <slot />
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
