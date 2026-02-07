<script setup lang="ts">
import { type NavigationMenuItem } from "@nuxt/ui";

import { shallowRef } from "#imports";

const items = shallowRef<NavigationMenuItem[]>([
  {
    label: "UiResizeContainer",
    defaultOpen: true,
    children: [
      {
        label: "Main",
        to: "/resize-container",
      },
    ],
  },
  {
    label: "UiContentFrame",
    defaultOpen: true,
    children: [
      {
        label: "Main",
        to: "/content-frame",
      },
    ],
  },
  {
    label: "UiPreloader",
    defaultOpen: true,
    children: [
      {
        label: "Main",
        to: "/preloader",
      },
    ],
  },
]);
</script>

<template>
  <div class="h-dvh min-w-full flex">
    <aside class="pb-3 min-w-[200px] w-2/12 border-r border-muted">
      <div class="flex flex-col gap-2">
        <div class="py-3 border border-muted border-r-0">
          <h1 class="heading-3 mb-0 text-center">Playground</h1>
        </div>

        <div class="px-4">
          <UNavigationMenu
            color="primary"
            :items="items"
            orientation="vertical"
            variant="link"
            :highlight="true"
          />
        </div>
      </div>
    </aside>
    <UMain class="flex-1 min-h-0 overflow-auto">
      <slot />
    </UMain>
  </div>
</template>
