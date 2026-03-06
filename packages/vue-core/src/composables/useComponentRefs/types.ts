import type { Raw } from "vue";

export type Key = string | number;

export type UseComponentRefsReturn<TInstance extends object = object> = {
  refs: Raw<Map<Key, TInstance>>;
  setRef: (key: Key, instance: unknown) => void;
  createRefSetter: (key: Key) => (el: unknown) => void;
  forEach: (callback: (ref: TInstance) => void) => void;
  get: (key: Key) => TInstance | undefined;
  has: (key: Key) => boolean;
  clear: () => void;
  size: () => number;
};
