<script setup lang="ts">
import { sum } from "@petr-ptacek/vue-core";
import { shallowRef } from "vue";

const result = shallowRef(0);

function makeSum() {
  result.value = sum(result.value, 2);
}
</script>

<template>
  <div>
    sum is: {{ result }}

    <button @click="makeSum">Add</button>
  </div>
</template>
