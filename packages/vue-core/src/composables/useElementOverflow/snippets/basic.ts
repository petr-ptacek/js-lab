import { useElementOverflow } from "@petr-ptacek/vue-core";
import { useTemplateRef } from "vue";

const container = useTemplateRef<HTMLElement>("container");

const { hasOverflow, direction } = useElementOverflow(container);

// hasOverflow.value — true if the element overflows in any direction
// direction.value  — "none" | "horizontal" | "vertical" | "both"
