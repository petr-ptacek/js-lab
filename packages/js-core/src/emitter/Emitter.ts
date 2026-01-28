/*
 * The Map object holds key-value pairs and remembers the original insertion order of the keys.
 * Any value (both objects and primitive values) may be used as either a key or a value.
 * */
import type {
  Store,
  StoreItem,
  ListenerContext,
  CleanupFn,
  EmitterEvents,
  InitialHandlers,
  EventHandler, InitialHandler,
} from "./types";

/**
 * Strongly-typed event emitter.
 *
 * Provides a minimal, type-safe API for registering, emitting
 * and removing event handlers. Events and their payloads
 * are defined via a generic event map.
 *
 * @example
 * ```ts
 * type Events = {
 *   sum: (a: number, b: number) => number;
 *   log: (message: string) => void;
 * };
 *
 * const emitter = new Emitter<Events>({
 *   sum: (a, b) => a + b,
 *   log: {
 *     handler: (msg) => console.log(msg),
 *     once: true,
 *   },
 * });
 *
 * emitter.emit("sum", 1, 2);
 * emitter.on("log", console.log);
 * ```
 */
export class Emitter<Events extends EmitterEvents> {
  #eventsStore: Store<Events> = new Map();

  /**
   * Creates a new emitter instance.
   *
   * Optionally accepts an object with initial event handlers.
   * Handlers can be provided either directly, or with metadata
   * such as `once`.
   */
  constructor();
  constructor(initialHandlers: InitialHandlers<Events>);
  constructor(initialHandlers?: InitialHandlers<Events>) {
    if (!initialHandlers) return;

    for (const type in initialHandlers) {
      const entry = initialHandlers[type];
      if (!entry) continue;

      if (isHandler(entry)) {
        this.#on(type, entry, { once: false });
        continue;
      }

      if ("handler" in entry) {
        this.#on(type, entry.handler, { once: entry.once ?? false });
      }
    }
  }

  /**
   * Registers an event handler.
   *
   * @param type - Event name
   * @param handler - Event handler function
   * @returns Cleanup function that unregisters the handler
   */
  on<TType extends keyof Events, THandler extends Events[TType]>(type: TType, handler: THandler): CleanupFn {
    return this.#on(type, handler, { once: false });
  }

  /**
   * Registers an event handler that will be called only once.
   *
   * The handler is automatically removed after the first invocation.
   *
   * @param type - Event name
   * @param handler - Event handler function
   * @returns Cleanup function that unregisters the handler
   */
  once<TType extends keyof Events, THandler extends Events[TType]>(type: TType, handler: THandler): CleanupFn {
    return this.#on(type, handler, { once: true });
  }

  /**
   * Emits an event and calls all registered handlers
   * with the provided arguments.
   *
   * @param type - Event name
   * @param args - Arguments passed to the event handlers
   */
  emit<TType extends keyof Events>(type: TType, ...args: Parameters<Events[TType]>): void {
    if (!this.#eventsStore.has(type)) {
      return;
    }

    const storeItem = this.#eventsStore.get(type)!;

    for (const entry of Array.from(storeItem.values())) {
      const { ctx, handler } = entry;
      handler(...args);

      if (ctx.once) {
        this.off(type, handler);
      }
    }
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
  off<TType extends keyof Events>(type: TType): void;
  off<TType extends keyof Events>(type: TType, handler: Events[TType]): void;
  off<TType extends keyof Events>(type: TType, handler?: Events[TType]): void {
    if (!this.#eventsStore.has(type)) {
      return;
    }

    if (handler) {
      const storeItem = this.#eventsStore.get(type);
      if (!storeItem) return;

      storeItem.delete(handler);

      if (storeItem.size === 0) {
        this.#eventsStore.delete(type);
      } else {
        this.#eventsStore.set(type, storeItem);
      }
    } else {
      this.#eventsStore.delete(type);
    }
  }

  /**
   * Removes all registered event handlers.
   */
  clear(): void {
    this.#eventsStore.clear();
  }

  /**
   * Internal method used to register handlers
   * with additional metadata.
   */
  #on<TType extends keyof Events, THandler extends Events[TType]>(type: TType, handler: THandler, ctx: ListenerContext): CleanupFn {
    const storeItem: StoreItem<THandler> = this.#eventsStore.get(type) ?? new Map();

    const clear = () => {
      this.off(type, handler);
    };

    if (storeItem.has(handler)) {
      return clear;
    }

    storeItem.set(handler, {
      handler,
      ctx,
    });

    this.#eventsStore.set(type, storeItem);
    return clear;
  }
}

/**
 * Type guard for detecting a plain event handler.
 */
function isHandler<T extends EventHandler>(value: InitialHandler<T>): value is T {
  return typeof value === "function";
}
