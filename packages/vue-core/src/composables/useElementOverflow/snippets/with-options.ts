import { useElementOverflow } from "@petr-ptacek/vue-core";
import { computed, ref, useTemplateRef } from "vue";

const container = useTemplateRef<HTMLElement>("container");
const isEnabled = ref(true);

const { hasOverflow, hasVertical, hasHorizontal, update } = useElementOverflow(container, {
  disabled: computed(() => !isEnabled.value), // reactive toggle
  observeContent: true, // re-check when content size changes (e.g. async data) — default
  debounceDelay: 32, // wait 2 frames instead of 1 before recalculating
});

// Force immediate recalculation after a programmatic DOM change
function onContentUpdated() {
  update();
}
