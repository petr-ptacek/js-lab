import { useDebounceFn } from "@vueuse/core";
import type { ComputedRef, Ref } from "vue";
import { isUndefined } from "../utils";

import { computed, readonly, shallowRef, watch } from "vue";

export type UseProxyValueOptions = {
  autoApply?: boolean;
  debounce?: number;
  applyDebounce?: number;
};

export type UseProxyValueReturn<T> = {
  value: ComputedRef<T>;
  debouncedValue: ComputedRef<T>;
  buffer: Ref<T>;
  isApplied: Readonly<Ref<boolean>>;
  apply: () => void;
  applyDebounced: () => void;
};

export function useProxyValue<TValue>(
  sourceValue: Ref<TValue | undefined>,
  defaultValue: TValue,
  options: UseProxyValueOptions = {},
): UseProxyValueReturn<TValue> {
  const autoApply = options.autoApply ?? true;
  const internalValue = shallowRef<TValue>(isUndefined(sourceValue.value) ? defaultValue : sourceValue.value);
  const isApplied = shallowRef(!isUndefined(sourceValue.value));

  const value = computed<TValue>({
    get: () => {
      if (!isApplied.value || isUndefined(sourceValue.value)) {
        return internalValue.value;
      }

      return sourceValue.value as TValue;
    },
    set: (val: TValue) => {
      internalValue.value = val;
      isApplied.value = false;
      if (autoApply) {
        apply();
      }
    },
  });

  const setDebounced = useDebounceFn((val: TValue) => {
    value.value = val;
  }, options.debounce ?? 0);

  const debouncedValue = computed<TValue>({
    get: () => value.value,
    set: (val: TValue) => {
      setDebounced(val);
    },
  });

  watch(sourceValue, (v) => {
    if (isUndefined(v)) {
      internalValue.value = defaultValue;
    } else {
      internalValue.value = v as TValue;
      isApplied.value = true;
    }
  });

  function reset() {
    internalValue.value = isUndefined(sourceValue.value)
                          ? defaultValue
                          : sourceValue.value;

    isApplied.value = !isUndefined(sourceValue.value);
  }

  function apply() {
    if (!isUndefined(sourceValue.value)) {
      sourceValue.value = internalValue.value;
    }
  }

  const applyDebounced = useDebounceFn(apply, options.applyDebounce ?? 0);

  return {
    value,
    debouncedValue,
    buffer: internalValue,
    isApplied: readonly(isApplied),
    apply,
    applyDebounced,
  };
}
