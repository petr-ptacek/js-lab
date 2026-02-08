<script setup lang="ts">
import { UiSplitPane, UiSplitPaneSection } from "@petr-ptacek/vue-core";

import { ExampleFrame } from "~/components";
</script>

<template>
  <ExampleFrame title="UiResizeContainer" class="h-full">
    <UiSplitPane orientation="horizontal" origin="alpha" show-grip>
      <template #alpha>
        <UiSplitPaneSection class="bg-red-400/50">
        </UiSplitPaneSection>
      </template>

      <template #beta>
        <UiSplitPaneSection class="bg-blue-400/50">
        </UiSplitPaneSection>
      </template>
    </UiSplitPane>
  </ExampleFrame>
</template>
