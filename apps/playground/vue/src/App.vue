<script setup lang="ts">
import { UiResizeContainer } from "@petr-ptacek/vue-ui";
import { shallowRef }        from "vue";

const t = shallowRef(400);
</script>

<template>
  <div class="bg-green-200 h-screen w-screen">
    <UiResizeContainer orientation="vertical" v-model="t" default-value="20%">
      <template #alpha>
        <div class="h-full w-full bg-blue-600 flex items-center justify-center font-bold text-2xl">
          {{ t }}
        </div>
      </template>
      <template #beta>
        <div class="h-full w-full bg-green-600"></div>
      </template>
    </UiResizeContainer>
  </div>
</template>
