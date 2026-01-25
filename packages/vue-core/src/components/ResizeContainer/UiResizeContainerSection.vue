<script setup lang="ts">
import { toRef, useTemplateRef } from "vue";

import { useElementOverflow } from "../../composables";

const props = withDefaults(
  defineProps<{
    scrollable?: boolean;
  }>(),
  { scrollable: true },
);

const root = useTemplateRef("root");
const { hasHorizontal, hasVertical, hasOverflow } = useElementOverflow(root, {
  enabled: toRef(props, "scrollable"),
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
