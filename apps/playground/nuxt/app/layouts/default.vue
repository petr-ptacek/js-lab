<script setup lang="ts">
import { type NavigationMenuItem } from "@nuxt/ui";

import { shallowRef } from "#imports";

const items = shallowRef<NavigationMenuItem[]>([
  {
    label: "UIResizeContainer",
    defaultOpen: true,
    children: [
      {
        label: "Main",
        to: "/ui-resize-container",
      },
    ],
  },
  {
    label: "UILoader",
    defaultOpen: true,
    children: [
      {
        label: "Main",
      },
    ],
  },
  {
    label: "UIBox",
    defaultOpen: true,
    children: [
      {
        label: "Main",
      },
    ],
  },
  {
    label: "UILayoutContent",
    defaultOpen: true,
    children: [
      {
        label: "Main",
      },
    ],
  },
]);
</script>

<template>
  <div class="app-playground min-h-full min-w-full flex">
    <aside class="p-4 min-w-[200px] w-2/12 border-r border-muted">
      <div class="flex flex-col gap-2">
        <header class="font-semibold text-center">Playground</header>
        <UNavigationMenu
          color="primary"
          :items="items"
          orientation="vertical"
          variant="link"
          :highlight="true"
        />
      </div>
    </aside>
    <UMain class="flex-1">
      <slot />
    </UMain>
  </div>
</template>
