import type { Ref, WritableComputedRef } from "vue";

export type UseProxyValueOptions = {
  autoApply?: boolean;
  debounce?: number;
  applyDebounce?: number;
};

export type UseProxyValueReturn<T> = {
  value: WritableComputedRef<T>;
  debouncedValue: WritableComputedRef<T>;
  buffer: Ref<T>;
  isApplied: Readonly<Ref<boolean>>;
  apply: () => void;
  applyDebounced: () => void;
  reset: () => void;
};
