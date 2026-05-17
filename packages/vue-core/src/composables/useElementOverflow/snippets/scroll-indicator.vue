<script setup lang="ts">
import { useElementOverflow } from "@petr-ptacek/vue-core";
import { useTemplateRef } from "vue";

const container = useTemplateRef<HTMLElement>("container");

const { direction } = useElementOverflow(container);
</script>

<template>
  <div class="wrapper">
    <div
      ref="container"
      class="content"
    >
      <slot />
    </div>

    <div
      v-if="direction === 'vertical' || direction === 'both'"
      class="fade-bottom"
    />
  </div>
</template>
