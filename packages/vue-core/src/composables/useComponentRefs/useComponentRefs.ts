import { markRaw } from "vue";

import type { Key, UseComponentRefsReturn } from "./types";

export function useComponentRefs<TInstance extends object = object>(): UseComponentRefsReturn<TInstance> {
  const refs = markRaw(new Map<Key, TInstance>());
  const setters = markRaw(new Map<Key, (el: unknown) => void>());

  function isObjectLike(value: unknown): value is object {
    return !!value && typeof value === "object";
  }

  function setRef(key: Key, instance: unknown) {
    if (!instance) {
      refs.delete(key);
      setters.delete(key);
      return;
    }

    if (isObjectLike(instance)) {
      refs.set(key, instance as TInstance);
    }
  }

  function createRefSetter(key: Key) {
    if (!setters.has(key)) {
      setters.set(key, (el: unknown) => setRef(key, el));
    }

    return setters.get(key)!;
  }

  function forEach(callback: (ref: TInstance) => void) {
    refs.forEach(callback);
  }

  function get(key: Key): TInstance | undefined {
    return refs.get(key);
  }

  function size(): number {
    return refs.size;
  }

  function clear() {
    refs.clear();
    setters.clear();
  }

  function has(key: string | number): boolean {
    return refs.has(key);
  }

  return {
    refs,
    setRef,
    createRefSetter,
    forEach,
    get,
    has,
    clear,
    size,
  };
}
