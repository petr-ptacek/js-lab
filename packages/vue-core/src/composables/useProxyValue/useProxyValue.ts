import { isUndefined, type ValueOrGetter } from "@petr-ptacek/js-core";
import { useDebounceFn }                         from "@vueuse/core";
import type { Ref }                              from "vue";
import { computed, readonly, shallowRef, watch } from "vue";

import type { UseProxyValueOptions, UseProxyValueReturn } from "./types";

/**
 * Creates a proxy value with an internal buffer that can be
 * manually or automatically synchronized back to a source ref.
 *
 * This composable is useful for controlled inputs, forms, and components
 * that need a temporary (staged) value before committing changes.
 *
 * ## Behavior
 * - If `sourceValue.value` is `undefined`, the `defaultValue` is used.
 * - `defaultValue` may be provided as a value or a getter function.
 * - `null` is treated as a valid value and will not trigger the default.
 * - All changes are written to an internal buffer first.
 * - Calling `sync()` commits the buffer back to `sourceValue`
 *   (only if `sourceValue.value` is not `undefined`).
 * - Calling `reset()` discards staged changes and restores the buffer
 *   from `sourceValue`, or from `defaultValue` when `sourceValue.value`
 *   is `undefined`.
 *
 * ## State model
 * - `buffer` holds the mutable, staged value.
 * - `value` acts as a proxy combining `buffer` and `sourceValue`.
 * - `isSynced` indicates whether the buffer is currently synchronized
 *   with the source value.
 *
 * ## Auto sync
 * - When auto sync is enabled, changes to `value` are immediately
 *   synchronized back to `sourceValue`.
 * - Auto sync can be toggled at runtime using `enableAutoSync()`
 *   and `disableAutoSync()`.
 * - `isAutoSync` exposes the current auto sync state as a readonly ref.
 * - Manual calls to `sync()` always work, regardless of auto sync state.
 *
 * ## Debouncing
 * - `debouncedValue` debounces writes to the buffer (useful for inputs).
 * - `syncDebounced()` debounces committing the buffer to the source.
 *
 * @typeParam TValue - Type of the proxied value
 *
 * @param sourceValue - Source ref acting as the external value
 *   (e.g. `v-model`)
 * @param defaultValue - Fallback value or getter function of type `ValueOrGetter<TValue>` used when
 *   `sourceValue.value` is `undefined`
 * @param options - Configuration options
 *
 * @param options.autoSync - Whether changes should be synchronized
 *   automatically (default: `true`)
 * @param options.debounce - Debounce delay (ms) for `debouncedValue`
 * @param options.syncDebounce - Debounce delay (ms) for `syncDebounced`
 *
 * @returns An object containing:
 * - `value` – Computed ref that proxies the source value with buffering
 * - `debouncedValue` – Debounced version of `value`
 * - `buffer` – Internal mutable buffer holding staged changes
 * - `isSynced` – Readonly ref indicating whether the buffer is in sync
 *   with the source value
 * - `isAutoSync` – Readonly ref indicating whether auto sync is enabled
 * - `sync()` – Commits the buffer to the source value
 * - `syncDebounced()` – Debounced version of `sync`
 * - `reset()` – Resets the buffer from the source value or `defaultValue`
 * - `enableAutoSync()` – Enables automatic synchronization
 * - `disableAutoSync()` – Disables automatic synchronization
 *
 * @example
 * ```ts
 * const model = ref<string | undefined>("hello")
 *
 * const {
 *   value,
 *   buffer,
 *   isSynced,
 *   isAutoSync,
 *   sync,
 *   reset,
 *   disableAutoSync,
 *   enableAutoSync,
 * } = useProxyValue(model, () => "")
 *
 * // --- initial state ---
 * model.value === "hello"
 * isSynced.value === true
 *
 * // --- staged change (autoSync enabled) ---
 * value.value = "world"
 * model.value === "world"
 * isSynced.value === true
 *
 * // --- disable auto sync ---
 * disableAutoSync()
 *
 * value.value = "manual"
 * model.value === "world"
 * isSynced.value === false
 *
 * // --- manual commit ---
 * sync()
 * model.value === "manual"
 * isSynced.value === true
 *
 * // --- enable auto sync again ---
 * enableAutoSync()
 *
 * value.value = "auto"
 * model.value === "auto"
 * isSynced.value === true
 *
 * // --- staged change with autoSync disabled again ---
 * disableAutoSync()
 *
 * value.value = "world"
 * model.value === "auto"
 * isSynced.value === false
 * ```
 */
export function useProxyValue<TValue>(
  sourceValue: Ref<TValue | undefined>,
  defaultValue: ValueOrGetter<TValue>,
  options: UseProxyValueOptions = {},
): UseProxyValueReturn<TValue> {
  const autoSync = shallowRef(options.autoSync ?? true);
  const internalValue = shallowRef<TValue>(isUndefined(sourceValue.value) ?
                                           resolveDefaultValue() :
                                           sourceValue.value,
  );
  const isSynced = shallowRef(!isUndefined(sourceValue.value));

  const value = computed<TValue>({
    get: () => {
      if ( !isSynced.value || isUndefined(sourceValue.value) ) {
        return internalValue.value;
      }

      return sourceValue.value as TValue;
    },
    set: (val: TValue) => {
      internalValue.value = val;
      isSynced.value = false;
      if ( autoSync.value ) {
        sync();
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
    if ( isUndefined(v) ) {
      internalValue.value = resolveDefaultValue();
      isSynced.value = false;
    } else {
      internalValue.value = v as TValue;
      isSynced.value = true;
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

    isSynced.value = !isUndefined(sourceValue.value);
  }

  function enableAutoSync() {
    autoSync.value = true;
  }

  function disableAutoSync() {
    autoSync.value = false;
  }

  function sync() {
    if ( !isUndefined(sourceValue.value) ) {
      sourceValue.value = internalValue.value;
      isSynced.value = true;
    }
  }

  const syncDebounced = useDebounceFn(sync, options.syncDebounce ?? 0);

  return {
    value,
    debouncedValue,
    buffer: internalValue,
    isSynced: readonly(isSynced),
    isAutoSync: readonly(autoSync),
    sync,
    reset,
    syncDebounced,
    disableAutoSync,
    enableAutoSync,
  };
}
