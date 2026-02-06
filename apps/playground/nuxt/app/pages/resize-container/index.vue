<script setup lang="ts">
import { UiResizeContainer, UiResizeContainerSection } from "@petr-ptacek/vue-core";

import { ExampleFrame } from "~/components";
</script>

<template>
  <ExampleFrame title="UiResizeContainer" class="h-full">
    <UiResizeContainer>
      <template #alpha>
        <UiResizeContainerSection class="">
        </UiResizeContainerSection>
      </template>
      <template #beta>
        <UiResizeContainerSection class="">
        </UiResizeContainerSection>
      </template>
    </UiResizeContainer>
  </ExampleFrame>
</template>
