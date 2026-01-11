<script setup lang="ts">
import { add }             from "@petr-ptacek/vue-core";
import { ButtonComponent } from "@petr-ptacek/vue-ui";
import { shallowRef }      from "vue";

const result = shallowRef(0);

function makeSum() {
  result.value = add(result.value, 2);
}
</script>

<template>
  <div class="bg-green-200">
    <div>
      sum is: {{ result }}

      <ButtonComponent @click="makeSum">Add</ButtonComponent>
    </div>
  </div>
</template>
