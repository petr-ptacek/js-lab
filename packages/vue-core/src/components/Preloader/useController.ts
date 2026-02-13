import { computed, toRef, useSlots } from "vue";

import type { Props } from "./types";
import { useStableLoading } from "../../composables";

export type UseControllerOptions = {
  props: Props;
}

export function useController({ props }: UseControllerOptions) {
  const visible = toRef(props, "visible", false);
  const slots = useSlots();
  const {
    loading,
    isHolding,
    isDelaying,
  } = useStableLoading(
    visible,
    {
      delay: props.delay,
      minVisible: props.minVisible,
    },
  );

  const hasMessageSlot = computed(() => !!slots.message);

  return {
    loading,
    isHolding,
    isDelaying,
    hasMessageSlot,
  };
}
