<script setup lang="ts">
withDefaults(
  defineProps<{
    scrollable?: boolean;
  }>(),
  { scrollable: true },
);
</script>

<template>
  <div class="ui-resize-container-section" :data-scrollable="scrollable">
    <slot />
  </div>
</template>
