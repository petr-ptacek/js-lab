<script setup lang="ts">
import { computed, toRef, useTemplateRef } from "vue";

import { useElementOverflow } from "../../composables";

const props = withDefaults(
  defineProps<{
    scrollable?: boolean;
  }>(),
  { scrollable: true },
);

const scrollable = toRef(props, "scrollable");
const root = useTemplateRef("root");

const { hasHorizontal, hasVertical, hasOverflow } = useElementOverflow(root, {
  disabled: computed(() => !scrollable.value),
});
</script>

<template>
  <div
    ref="root"
    class="ui-resize-container-section"
    :data-scrollable="scrollable"
    :data-has-scroll="hasOverflow"
    :data-has-scroll-vertical="hasVertical"
    :data-has-scroll-horizontal="hasHorizontal"
  >
    <slot />
  </div>
</template>
