import { Emitter, type EmitterEvents, type EmitterInitialHandlers } from "@petr-ptacek/js-core";
import { getCurrentInstance, onBeforeUnmount } from "vue";

import type { VueEmitter } from "./types";


/**
 * Creates a Vue-aware event emitter.
 *
 * This utility wraps the core {@link Emitter} and transparently integrates
 * it with the Vue component lifecycle. Event handlers registered via `on`
 * or `once` are automatically cleaned up when the current component
 * is unmounted.
 *
 * When used outside of a Vue component setup context, the emitter behaves
 * like a plain {@link Emitter} without any lifecycle integration.
 *
 * @typeParam Events - Event map where keys are event names and values are handler signatures
 *
 * @example
 * ```ts
 * type Events = {
 *   log: (message: string) => void;
 * };
 *
 * const emitter = createEmitter<Events>();
 *
 * emitter.on("log", (msg) => {
 *   console.log(msg);
 * });
 *
 * emitter.emit("log", "hello");
 * ```
 *
 * @example
 * ```ts
 * const emitter = createEmitter<Events>({
 *   log: (msg) => console.log(msg),
 * });
 * ```
 */
export function createEmitter<Events extends EmitterEvents>(): VueEmitter<Events>;
export function createEmitter<Events extends EmitterEvents>(initialHandlers: EmitterInitialHandlers<Events>): VueEmitter<Events>;
export function createEmitter<Events extends EmitterEvents>(initialHandlers?: EmitterInitialHandlers<Events>): VueEmitter<Events> {
  const emitter = initialHandlers ?
                  new Emitter<Events>(initialHandlers) :
                  new Emitter<Events>();

  /**
   * Registers a cleanup function to run on component unmount,
   * if called within a Vue component setup context.
   */
  function withLifecycleCleanup(cleanup: () => void) {
    if (getCurrentInstance()) {
      onBeforeUnmount(cleanup);
    }
  }

  /**
   * Registers an event handler.
   *
   * The handler is automatically removed when the current component
   * is unmounted.
   *
   * @param type - Event name
   * @param handler - Event handler function
   * @returns Cleanup function that unregisters the handler
   */
  function on<TType extends keyof Events>(
    type: TType,
    handler: Events[TType],
  ) {
    const cleanup = emitter.on(type, handler);
    withLifecycleCleanup(cleanup);
    return cleanup;
  }

  /**
   * Registers a one-time event handler.
   *
   * The handler is automatically removed after the first invocation
   * or when the component is unmounted.
   *
   * @param type - Event name
   * @param handler - Event handler function
   * @returns Cleanup function that unregisters the handler
   */
  function once<TType extends keyof Events>(
    type: TType,
    handler: Events[TType],
  ) {
    const cleanup = emitter.once(type, handler);
    withLifecycleCleanup(cleanup);
    return cleanup;
  }

  /**
   * Emits an event with the provided arguments.
   *
   * @param type - Event name
   * @param args - Arguments passed to the event handlers
   */
  function emit<TType extends keyof Events>(
    type: TType,
    ...args: Parameters<Events[TType]>
  ) {
    emitter.emit(type, ...args);
  }

  /**
   * Removes event handlers.
   *
   * When called with only the event type, all handlers
   * for that event are removed.
   *
   * When a handler is provided, only that handler
   * is removed.
   *
   * @param type - Event name
   * @param handler - Optional handler to remove
   */
  function off<TType extends keyof Events>(
    type: TType,
    handler?: Events[TType],
  ) {
    if (handler) {
      emitter.off(type, handler);
    } else {
      emitter.off(type);
    }
  }

  return {
    on,
    once,
    emit,
    off,
  };
}
