import type { Ref, WritableComputedRef } from "vue";

export type UseProxyValueOptions = {
  autoSync?: boolean;
  debounce?: number;
  syncDebounce?: number;
};

export type UseProxyValueReturn<T> = {
  value: WritableComputedRef<T>;
  debouncedValue: WritableComputedRef<T>;
  buffer: Ref<T>;
  isSynced: Readonly<Ref<boolean>>;
  isAutoSync: Readonly<Ref<boolean>>;
  sync: () => void;
  syncDebounced: () => void;
  reset: () => void;
  enableAutoSync: () => void;
  disableAutoSync: () => void;
};
