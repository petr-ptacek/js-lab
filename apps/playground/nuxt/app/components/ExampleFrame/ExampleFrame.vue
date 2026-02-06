<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
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
    <div class="flex-1 flex min-h-0">
      <div class="p-6 flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
