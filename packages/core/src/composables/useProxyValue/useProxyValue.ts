import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { computed, readonly, shallowRef, watch } from "vue";

import type { UseProxyValueOptions, UseProxyValueReturn } from "./types";
import { isUndefined } from "../../utils";

/**
 * Creates a proxy value with an internal buffer that can be
 * manually or automatically synchronized back to a source ref.
 *
 * This composable is useful for controlled inputs, forms, and components
 * that need a temporary (staged) value before committing changes.
 *
 * ## Behavior
 * - If `sourceValue.value` is `undefined`, the `defaultValue` is used.
 * - `defaultValue` may be provided as a value or a factory function.
 * - `null` is treated as a valid value and will not trigger the default.
 * - All changes are written to an internal buffer first.
 * - Calling `apply()` commits the buffer back to `sourceValue`
 *   (only if `sourceValue.value` is not `undefined`).
 * - Calling `reset()` discards staged changes and restores the buffer
 *   from `sourceValue`, or from `defaultValue` when `sourceValue.value`
 *   is `undefined`.
 *
 * ## State model
 * - `buffer` holds the mutable, staged value.
 * - `value` acts as a proxy combining `buffer` and `sourceValue`.
 * - `isApplied` indicates whether the buffer is currently synchronized
 *   with the source value.
 *
 * ## Debouncing
 * - `debouncedValue` debounces writes to the buffer (useful for inputs).
 * - `applyDebounced()` debounces committing the buffer to the source.
 *
 * @typeParam TValue - Type of the proxied value
 *
 * @param sourceValue - Source ref acting as the external value (e.g. `v-model`)
 * @param defaultValue - Fallback value or factory used when
 *   `sourceValue.value` is `undefined`
 * @param options - Configuration options
 *
 * @param options.autoApply - Whether changes should be applied automatically
 *   (default: `true`)
 * @param options.debounce - Debounce delay (ms) for `debouncedValue`
 * @param options.applyDebounce - Debounce delay (ms) for `applyDebounced`
 *
 * @returns An object containing:
 * - `value` – Computed ref that proxies the source value with buffering
 * - `debouncedValue` – Debounced version of `value`
 * - `buffer` – Internal mutable buffer holding staged changes
 * - `isApplied` – Readonly ref indicating whether the buffer is in sync
 *   with the source value
 * - `apply()` – Commits the buffer to the source value
 * - `applyDebounced()` – Debounced version of `apply`
 * - `reset()` – Resets the buffer from the source value or `defaultValue`
 *
 * @example
 * ```ts
 * const model = ref<string | undefined>("hello")
 *
 * const {
 *   value,
 *   buffer,
 *   isApplied,
 *   apply,
 *   reset,
 * } = useProxyValue(model, () => "")
 *
 * value.value = "world" // buffer updated
 * isApplied.value === false
 *
 * reset() // buffer restored from model ("hello")
 * apply() // model.value === "hello"
 * ```
 */
export function useProxyValue<TValue>(
  sourceValue: Ref<TValue | undefined>,
  defaultValue: (TValue | (() => TValue)),
  options: UseProxyValueOptions = {},
): UseProxyValueReturn<TValue> {
  const autoApply = options.autoApply ?? true;
  const internalValue = shallowRef<TValue>(isUndefined(sourceValue.value) ?
                                           resolveDefaultValue() :
                                           sourceValue.value,
  );
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
      internalValue.value = resolveDefaultValue();
      isApplied.value = false;
    } else {
      internalValue.value = v as TValue;
      isApplied.value = true;
    }
  });

  function resolveDefaultValue(): TValue {
    return typeof defaultValue === "function"
           ? (defaultValue as () => TValue)()
           : defaultValue;
  }

  function reset() {
    internalValue.value = isUndefined(sourceValue.value)
                          ? resolveDefaultValue()
                          : sourceValue.value;

    isApplied.value = !isUndefined(sourceValue.value);
  }

  function apply() {
    if (!isUndefined(sourceValue.value)) {
      sourceValue.value = internalValue.value;
      isApplied.value = true;
    }
  }

  const applyDebounced = useDebounceFn(apply, options.applyDebounce ?? 0);

  return {
    value,
    debouncedValue,
    buffer: internalValue,
    isApplied: readonly(isApplied),
    apply,
    reset,
    applyDebounced,
  };
}
