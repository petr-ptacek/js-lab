# createEmitter

Creates a Vue-aware event emitter that automatically removes registered handlers when the host component unmounts.

## Motivation

The core `Emitter` from `js-core` is framework-agnostic and requires manual cleanup.
In Vue components, forgetting to call `off()` on unmount leads to memory leaks and stale listeners.

`createEmitter` wraps `Emitter` and integrates with the Vue component lifecycle — handlers registered
via `on` or `once` are automatically removed in `onBeforeUnmount`, with no manual cleanup needed.

When used outside a component setup context (e.g. a module-level emitter), it behaves like a plain `Emitter`.

---

## Usage

```ts
import { createEmitter } from "@petr-ptacek/vue-core";

type Events = {
  submit: (payload: { id: number }) => void;
  reset: () => void;
};

const emitter = createEmitter<Events>();
```

### With initial handlers

```ts
const emitter = createEmitter<Events>({
  submit: (payload) => console.log(payload.id),
});
```

### Inside a component

```ts
// setup()
const emitter = createEmitter<Events>();

emitter.on("submit", (payload) => {
  // automatically removed on unmount
});
```

---

## API

### `createEmitter<Events>(initialHandlers?)`

#### Type parameters

**`Events`**

Event map where keys are event names and values are handler function signatures.

```ts
type Events = {
  eventName: (...args: any[]) => void;
};
```

#### Parameters

**`initialHandlers`** _(optional)_

```ts
EmitterInitialHandlers<Events>;
```

Object of event name → handler entries registered immediately on creation.
These handlers are treated as permanent and are **not** automatically removed on unmount.

---

### Return value — `VueEmitter<Events>`

```ts
type VueEmitter<Events> = {
  on: (type, handler) => () => void;
  once: (type, handler) => () => void;
  emit: (type, ...args) => void;
  off: (type, handler?) => void;
};
```

#### `on(type, handler)`

Registers a persistent event handler.

Returns a cleanup function that removes the handler.
When called inside a component setup context, the handler is also removed automatically on unmount.

#### `once(type, handler)`

Registers a one-time event handler.

Fires once and then removes itself. If the component unmounts before the event fires, the handler is removed.

#### `emit(type, ...args)`

Emits an event, calling all registered handlers for that event name.

#### `off(type, handler?)`

Removes a handler. If no handler is provided, removes all handlers for the given event type.

---

## Design Notes

- Lifecycle cleanup is registered only when `getCurrentInstance()` is truthy — the emitter is safe to use at module level.
- `initialHandlers` are not lifecycle-bound. Use them for permanent listeners that should survive component unmounts.
- The returned cleanup function from `on` / `once` is the same reference returned by the underlying `Emitter` — calling it manually still works.

---

## When to use

- You need a typed event bus scoped to a component or a composable
- You want automatic cleanup without manual `onBeforeUnmount` calls
- You need to share an emitter between a parent component and child composables

## When NOT to use

- For global application-level event buses — use a module-level emitter or Pinia instead
- When the event source is external (DOM events, WebSocket) — use `addEventListener` + `onBeforeUnmount`
