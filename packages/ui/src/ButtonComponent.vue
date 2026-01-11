<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <button class="ui-button" @click="$emit('click')">
    <slot>{{ message}}</slot>
  </button>
</template>
