export type ListenerContext = {
  once: boolean;
};

export type InitialHandlers<E extends RecordEvents> = {
  [K in keyof E]?: InitialHandler<E[K]>;
};
export type InitialHandler<THandler> = THandler | { handler: THandler, once?: boolean };

export type EventType = string | symbol;
export type EventHandler = (...args: any) => void;

export type RecordEvents = Record<EventType, EventHandler>;

export type Store<TEvents extends RecordEvents> = Map<keyof TEvents, StoreItem<TEvents[keyof TEvents]>>;
export type StoreItem<TKey> = Map<TKey, { handler: TKey; ctx: ListenerContext }>;


export type CleanupFn = () => void;
