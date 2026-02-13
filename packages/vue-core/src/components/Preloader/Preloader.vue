<style>
@import "./styles.css";
</style>

<script setup lang="ts">
import { normalizeClass } from "vue";

import LoadingSpinner from "./LoadingSpinner.vue";
import type { Props, Slots } from "./types";
import { useController } from "./useController";

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  delay: 250,
  minVisible: 300,
  spinner: true,
  backdrop: true,
  size: "md",
});


defineSlots<Slots>();

const {
  loading,
  isHolding,
  isDelaying,
  hasMessageSlot,
} = useController({ props });
</script>

<template>
  <div
    v-if="loading"
    class="ui-preloader"
    :class="normalizeClass(ui?.root)"
    :data-is-holding="isHolding"
    :data-is-delaying="isDelaying"
    :data-preloader-size="size"
    :data-backdrop="backdrop"
  >
    <div
      class="ui-preloader__content"
      :class="normalizeClass(ui?.content)"
      data-slot="content"
    >
      <slot
        name="content"
        :size="size"
        :message="message"
      >

        <div
          v-if="spinner"
          class="ui-preloader__spinner"
          :class="normalizeClass(ui?.spinner)"
          data-slot="spinner"
        >
          <slot
            name="spinner"
            :size="size"
          >
            <LoadingSpinner />
          </slot>
        </div>

        <div
          v-if="message || hasMessageSlot"
          class="ui-preloader__message"
          :class="normalizeClass(ui?.message)"
          data-slot="message"
        >
          <slot name="message">
            {{ message }}
          </slot>
        </div>

      </slot>
    </div>
  </div>
</template>
