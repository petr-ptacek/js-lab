import { toPercentage }                   from "@petr-ptacek/js-core";
import { computed, type Ref, shallowRef } from "vue";

import type { OriginValue } from "../types";

export type UseResizeValueOptions = {
  deltaPx: Ref<number>;
  containerSize: Ref<number>;
  origin: Ref<OriginValue>;
  isDragging: Ref<boolean>;
}

export function useResizeValue(options: UseResizeValueOptions) {
  const startPercent = shallowRef(0);

  // 2️⃣ px → %
  const deltaPercent = computed(() => {
    if ( !options.isDragging.value ) return 0;
    if ( !options.containerSize.value ) return 0;

    return toPercentage(options.deltaPx.value, options.containerSize.value);
  });

  // 3️⃣ respektuj origin
  const signedDeltaPercent = computed(() => {
    return options.origin.value === "alpha"
           ? deltaPercent.value
           : -deltaPercent.value;
  });

  // 4️⃣ výsledná hodnota
  const nextPercent = computed(() => {
    return startPercent.value + signedDeltaPercent.value;
  });

  // reset při startu dragu – hodnotu dodá controller
  function setStartPercent(value: number) {
    startPercent.value = value;
  }

  return {
    nextPercent,
    setStartPercent,
  };
}
