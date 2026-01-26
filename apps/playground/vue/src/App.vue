<script setup lang="ts">
import { UiResizeContainer, type UiResizeContainerModelValue, UiResizeContainerSection } from "@petr-ptacek/vue-core";
import { shallowRef }                                                                    from "vue";

const t = shallowRef<UiResizeContainerModelValue>("50%");
</script>

<template>
  <div class="h-screen w-screen">
    <UiResizeContainer
      :ui="{ sectionAlpha: ``, sectionBeta: `` }"
      v-model="t"
      orientation="horizontal"
      origin="beta"
    >
      <template #alpha>
        <UiResizeContainerSection class="">
        </UiResizeContainerSection>
      </template>
      <template #beta>
        <UiResizeContainerSection class="">
        </UiResizeContainerSection>
      </template>
    </UiResizeContainer>
  </div>
</template>
