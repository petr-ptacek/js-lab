<script setup lang="ts">
import type { UiResizeContainerProps, UiResizeContainerSlots } from "./types";


defineProps<UiResizeContainerProps>();
defineSlots<UiResizeContainerSlots>();
</script>

<template>
  <div class="ui-resize-container">
    <div class="ui-resize-container__content">
      <div class="ui-resize-container__section">
        <slot name="alpha" />
      </div>
      <div class="ui-resize-container__divider"></div>
      <div class="ui-resize-container__section">
        <slot name="beta" />
      </div>
    </div>
  </div>
</template>
