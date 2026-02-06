import { useTimeoutFn }                                         from "@vueuse/core";
import { type Ref, readonly, shallowRef, watch }                from "vue";

import type { UseStableLoadingReturn, UseStableLoadingOptions } from "./types";


const DELAY = 250;
const MIN_VISIBLE = 300;

/**
 * Stabilizes a boolean loading state to prevent UI flicker.
 *
 * This composable delays the appearance of a loading indicator and enforces
 * a minimum visible duration once it becomes visible.
 *
 * Typical use cases:
 * - preventing loaders from appearing during very short async operations
 * - avoiding brief flashes of loading indicators
 * - ensuring consistent loading UX across the application
 *
 * The returned `loading` ref is the only value intended for UI consumption.
 * Other returned states are provided for diagnostics, testing, or advanced control.
 *
 * @param source
 * A reactive boolean indicating whether an operation is currently in progress.
 *
 * @param options
 * Timing configuration for loading stabilization.
 *
 * @param options.delay
 * Time in milliseconds to wait before showing the loading state.
 * Defaults to 250 ms.
 *
 * @param options.minVisible
 * Minimum time in milliseconds that the loading state must remain visible
 * once it appears. Defaults to 300 ms.
 *
 * @returns An object containing stabilized loading state and diagnostic flags.
 */
export function useStableLoading(source: Ref<boolean>, options: UseStableLoadingOptions = {}): UseStableLoadingReturn {
  const delay = options?.delay ?? DELAY;
  const minVisible = options?.minVisible ?? MIN_VISIBLE;

  const loading = shallowRef(false);
  const isDelaying = shallowRef(false);
  const isHolding = shallowRef(false);

  const visibleSince = shallowRef<number | null>(null);

  const delayMs = shallowRef(delay);
  const hideAfterMs = shallowRef(minVisible);

  const { start: startDelay, stop: stopDelay } = useTimeoutFn(
    () => {
      isDelaying.value = false;
      loading.value = true;
      visibleSince.value = Date.now();
    },
    delayMs,
    { immediate: false },
  );

  const { start: startHideAfter, stop: stopHideAfter } = useTimeoutFn(
    () => {
      loading.value = false;
      isHolding.value = false;
      visibleSince.value = null;
    },
    hideAfterMs,
    { immediate: false },
  );

  watch(
    source,
    (value) => {
      if ( value ) {
        // loading začal
        stopHideAfter();
        stopDelay();

        isHolding.value = false;
        isDelaying.value = true;

        delayMs.value = delay;
        startDelay();
      } else {
        // loading skončil
        stopDelay();
        isDelaying.value = false;

        if ( !loading.value ) return;

        const since = visibleSince.value ?? Date.now();
        const elapsed = Date.now() - since;

        if ( elapsed >= minVisible ) {
          loading.value = false;
          visibleSince.value = null;
        } else {
          isHolding.value = true;
          hideAfterMs.value = minVisible - elapsed;
          startHideAfter();
        }
      }
    },
    { immediate: true },
  );

  return {
    loading: readonly(loading),
    isDelaying: readonly(isDelaying),
    isHolding: readonly(isHolding),
  };
}
