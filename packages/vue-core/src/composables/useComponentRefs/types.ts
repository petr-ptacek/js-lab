import type { Raw } from "vue";

export type Key = string | number | symbol;

export type UseComponentRefsReturn<TInstance extends object = object, TKey extends Key = Key> = {
  refs: Raw<Map<TKey, TInstance>>;
  setRef: (key: TKey, instance: unknown) => void;
  createRefSetter: (key: TKey) => (el: unknown) => void;
  forEach: (callback: (ref: TInstance) => void) => void;
  get: (key: TKey) => TInstance | undefined;
  has: (key: TKey) => boolean;
  clear: () => void;
  size: () => number;
};
