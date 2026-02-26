<script setup lang="ts">
import type { CSSClassValue } from "@petr-ptacek/vue-core";
import { normalizeClass }     from "vue";

defineProps<{
  title?: string;
  description?: string;
  ui?: {
    contentWrapper?: CSSClassValue;
    content?: CSSClassValue;
  }
}>();

</script>

<template>
  <div class="flex flex-col min-h-0">
    <div class="px-6 py-3 border-b border-muted">
      <div class="flex flex-col gap-2">
        <div v-if="title" class="heading-3 mb-0">
          {{ title }}
        </div>

        <div v-if="description" class="text-sm">
          {{ description }}
        </div>
      </div>
    </div>
    <div class="flex-1 flex min-h-0" :class="normalizeClass(ui?.contentWrapper)">
      <div class="flex-1" :class="normalizeClass(ui?.content)">
        <slot />
      </div>
    </div>
  </div>
</template>
