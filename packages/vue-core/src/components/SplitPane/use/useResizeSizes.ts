import { computed, type Ref }                                       from "vue";

import type { OriginValue, SizeValue, ModelValue } from "../types";
import { normalizeSizeToPercent }                           from "../utils";

export type UseResizeSizesOptions = {
  modelValue: Ref<ModelValue>;
  containerSize: Ref<number>;
  origin: Ref<OriginValue>;
  minSize?: Ref<SizeValue | undefined>;
  maxSize?: Ref<SizeValue | undefined>;
};


export function useResizeSizes(options: UseResizeSizesOptions) {
  const originPercent = computed(() => {
    return normalizeSizeToPercent(
      options.modelValue.value,
      options.containerSize.value,
      {
        minSize: options.minSize?.value,
        maxSize: options.maxSize?.value,
      },
    );
  });

  const alphaPercent = computed(() => {
    return options.origin.value === "alpha"
           ? originPercent.value
           : 100 - originPercent.value;
  });

  const betaPercent = computed(() => 100 - alphaPercent.value);

  const alphaStyle = computed(() => ({
    flexBasis: `${alphaPercent.value}%`,
    flexGrow: 0,
  }));

  const betaStyle = computed(() => ({
    flexBasis: `${betaPercent.value}%`,
    flexGrow: 0,
  }));

  return {
    alphaPercent,
    betaPercent,
    alphaStyle,
    betaStyle,
  };
}
