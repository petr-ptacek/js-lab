<script setup lang="ts">
import { UiResizeContainer, UiResizeContainerSection } from "@petr-ptacek/vue-ui";
import { shallowRef }                                  from "vue";

const t = shallowRef(500);
</script>

<template>
  <div class="bg-green-200 h-screen w-screen">
    <UiResizeContainer orientation="vertical" origin="alpha" v-model="t">
      <template #alpha>
        <UiResizeContainerSection class="bg-red-400">
          <p>lorem</p>
        </UiResizeContainerSection>
      </template>
      <template #beta>
        <UiResizeContainerSection class="bg-blue-400">

        </UiResizeContainerSection>
      </template>
    </UiResizeContainer>
  </div>
</template>
