<script setup lang="ts">
import { useProxyValue }     from "@petr-ptacek/vue-core";
import { UiResizeContainer } from "@petr-ptacek/vue-ui";
import { shallowRef }        from "vue";

const t = shallowRef(null);

useProxyValue(t, null);
</script>

<template>
  <div class="bg-green-200">
    <UiResizeContainer />
  </div>
</template>
