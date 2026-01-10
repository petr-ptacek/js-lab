<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <button>
    <slot>{{ message}}</slot>
  </button>
</template>
