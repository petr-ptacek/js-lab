<script setup lang="ts">
import { UiResizeContainer, UiResizeContainerSection } from "@petr-ptacek/vue-core";
</script>

<template>
  <UiResizeContainer>
    <template #alpha>
      <UiResizeContainerSection class="bg-blue-400">
      </UiResizeContainerSection>
    </template>
    <template #beta>
      <UiResizeContainerSection class="bg-red-400">
      </UiResizeContainerSection>
    </template>
  </UiResizeContainer>
</template>
