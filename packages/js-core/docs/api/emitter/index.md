# Emitter

`Emitter` is a **strongly typed event emitter** written in TypeScript. It is designed as a small, predictable utility
for event-based communication, with emphasis on:

- **Full type safety** (event names and payloads)
- **Minimal, explicit API** (`on`, `once`, `emit`, `off`, `clear`)
- **Deterministic behavior** (handler order, no hidden side effects)
- **Zero dependencies**

Typical use cases include core libraries, composables, state management, or internal event buses in UI libraries.

---

## Why this Emitter

Unlike classic emitters (
`EventEmitter`, [mitt](https://github.com/developit/mitt), [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)):

- ❌ no stringly-typed events
- ❌ no `any` payloads
- ❌ no runtime type checks

Instead:

- ✔ events are defined in a **single type map**
- ✔ `emit` enforces the exact argument list
- ✔ `on / once` only accept valid handlers

TypeScript catches mistakes **at compile time**, not at runtime.

---

## Defining events

Events are defined as a mapping from event name to handler signature.

```ts
type Events = {
  ready: () => void;
  close: (reason: string) => void;
  sum: (a: number, b: number) => number;
};
```

Each key is a `string | symbol`, and each value is a function signature.

---

## Basic usage

```ts
const emitter = new Emitter<Events>();

emitter.on("ready", () => {
  console.log("ready");
});

emitter.emit("ready");
```

- `emit("ready")` **cannot** receive arguments
- `emit("close")` **must** receive a `string`

```ts
emitter.emit("close", "user-action"); // ✅
emitter.emit("close");               // ❌ TypeScript error
```

---

## Handlers with return values

The emitter **does not restrict handler return values**, but `emit` intentionally ignores them.

```ts
emitter.on("sum", (a, b) => a + b);

emitter.emit("sum", 1, 2); // return value is ignored
```

The emitter is meant for notification, not for result aggregation.

---

## once – handler executed only once

```ts
emitter.once("ready", () => {
  console.log("ready (once)");
});

emitter.emit("ready"); // handler runs
emitter.emit("ready"); // handler already removed
```

After the first execution, the handler is automatically unregistered.

---

## Removing handlers

### Remove a specific handler

```ts
const off = emitter.on("close", reason => {
  console.log(reason);
});

off(); // removes this handler
```

### Remove by event + handler

```ts
const handler = (reason: string) => {
};

emitter.on("close", handler);
emitter.off("close", handler);
```

### Remove all handlers for an event

```ts
emitter.off("close");
```

---

## Clearing all events

```ts
emitter.clear();
```

Removes **all registered handlers for all events**.

---

## Initial handlers in constructor

You can register handlers directly when creating the emitter.

```ts
const emitter = new Emitter<Events>({
  ready: () => console.log("ready"),
  close: {
    handler: reason => console.log(reason),
    once: true,
  },
});
```

This is useful for static or bootstrap-level wiring.

---

## Design notes

- Handlers are executed **in registration order**
- Registering the same handler twice has no effect
- `emit` is synchronous
- Internally uses `Map` for predictable iteration order

---

## When to use / when not to use

### Use when

- you want **strict typing** for events
- you are building a **library or core utility**
- runtime overhead must be minimal

### Avoid when

- you need async queues, priorities, or wildcards
- you want result aggregation from handlers
- events are fully dynamic and untyped

---

## Summary

`Emitter` is a small but strict building block:

- no magic
- no surprises
- compile-time safety

Ideal for codebases where **correctness and maintainability** matter more than flexibility.

## More

[➡️ Read more →](/api-generated/classes/Emitter)
