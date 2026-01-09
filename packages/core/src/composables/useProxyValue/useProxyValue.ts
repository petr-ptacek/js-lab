import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { computed, readonly, shallowRef, watch } from "vue";
import { isUndefined } from "../../utils";
import type { UseProxyValueOptions, UseProxyValueReturn } from "./types";

/**
 * Creates a proxy value with an internal buffer that can be
 * manually or automatically applied back to a source ref.
 *
 * This composable is useful for controlled inputs, forms, and components
 * that need a temporary (staged) value before committing changes.
 *
 * ## Behavior
 * - If `sourceValue.value` is `undefined`, the `defaultValue` is used.
 * - `null` is treated as a valid value.
 * - Changes are written to an internal buffer first.
 * - Calling `apply()` syncs the buffer back to `sourceValue`
 *   (only if `sourceValue.value` is not `undefined`).
 * - Calling `reset()` restores the buffer from `sourceValue`
 *   or falls back to `defaultValue` when `sourceValue.value` is `undefined`.
 *
 * ## Debouncing
 * - `debouncedValue` debounces writes to the buffer.
 * - `applyDebounced()` debounces committing the buffer to the source.
 *
 * @typeParam TValue - Type of the proxied value
 *
 * @param sourceValue - Source ref acting as the external value (e.g. v-model)
 * @param defaultValue - Fallback value used when `sourceValue.value` is `undefined`
 * @param options - Configuration options
 *
 * @param options.autoApply - Whether changes should be applied automatically (default: `true`)
 * @param options.debounce - Debounce delay (ms) for `debouncedValue`
 * @param options.applyDebounce - Debounce delay (ms) for `applyDebounced`
 *
 * @returns An object containing:
 * - `value` – Computed ref that proxies the source value with buffering
 * - `debouncedValue` – Debounced version of `value`
 * - `buffer` – Internal mutable buffer holding staged changes
 * - `isApplied` – Readonly ref indicating whether the buffer is in sync
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
 * } = useProxyValue(model, "")
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
    reset,
    applyDebounced,
  };
}
