export type ListenerContext = {
  once: boolean;
};


/**
 * Defines initial event handlers passed to the `Emitter` constructor.
 *
 * Each handler can be provided either directly, or as an object
 * with additional options such as `once`.
 *
 * @example
 * ```ts
 * const emitter = new Emitter<Events>({
 *   ready: () => console.log("ready"),
 *   close: {
 *     handler: () => console.log("closed"),
 *     once: true,
 *   },
 * });
 * ```
 *
 * @since 1.0.0
 */
export type InitialHandlers<E extends EmitterEvents> = {
  [K in keyof E]?: InitialHandler<E[K]>;
};

export type InitialHandler<THandler> = THandler | { handler: THandler, once?: boolean };

export type EventType = string | symbol;

/**
 * Generic event handler function.
 *
 * Represents a callable listener registered for an event.
 * The concrete argument types are defined by the event map
 * (`EmitterEvents`) and enforced at usage sites.
 *
 * This base type is intentionally permissive and is only used
 * internally as a common constraint for all event handlers.
 *
 * @example
 * ```ts
 * type Events = {
 *   log: (message: string) => void;
 * };
 *
 * const handler: EventHandler = (...args) => {
 *   console.log(args);
 * };
 * ```
 *
 * @since 1.0.0
 */
export type EventHandler = (...args: any[]) => void;

/**
 * Defines a map of event names to event handler functions.
 *
 * Each key represents an event type and its value represents
 * the corresponding handler signature.
 *
 * @example
 * ```ts
 * type Events = {
 *   open: () => void;
 *   close: (reason: string) => void;
 * };
 * ```
 *
 * @since 1.0.0
 */
export type EmitterEvents = {
  [event: EventType]: EventHandler;
};

export type Store<TEvents extends EmitterEvents> = Map<keyof TEvents, StoreItem<TEvents[keyof TEvents]>>;
export type StoreItem<TKey> = Map<TKey, { handler: TKey; ctx: ListenerContext }>;


export type CleanupFn = () => void;
