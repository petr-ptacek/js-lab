import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { isUndefined } from "../utils";

import { computed, readonly, shallowRef, watch } from "vue";

export type UseProxyValueOptions = {
  autoApply?: boolean;
  debounce?: number;
  applyDebounce?: number;
};

export function useProxyValue<T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  options: UseProxyValueOptions = {},
) {
  const _autoApply = options.autoApply ?? true;
  const internalValue = shallowRef<T>(isUndefined(modelValue.value) ? defaultValue : modelValue.value);
  const isApplied = shallowRef(!isUndefined(modelValue.value));

  const value = computed<T>({
    get: () => {
      if (!isApplied.value || isUndefined(modelValue.value)) {
        return internalValue.value;
      }

      return modelValue.value as T;
    },
    set: (val: T) => {
      internalValue.value = val;
      isApplied.value = false;
      if (_autoApply) {
        apply();
      }
    },
  });

  const setDebounced = useDebounceFn((val: T) => {
    value.value = val;
  }, options.debounce ?? 0);

  const debouncedValue = computed<T>({
    get: () => value.value,
    set: (val: T) => {
      setDebounced(val);
    },
  });

  watch(modelValue, (v) => {
    if (isUndefined(v)) {
      internalValue.value = defaultValue;
    } else {
      internalValue.value = v as T;
      isApplied.value = true;
    }
  });

  function apply() {
    if (!isUndefined(modelValue.value)) {
      modelValue.value = internalValue.value;
    }
  }

  const applyDebounced = useDebounceFn(apply, options.applyDebounce ?? 0);

  return {
    value,
    debouncedValue,
    internalValue,
    isApplied: readonly(isApplied),
    apply,
    applyDebounced,
  };
}
