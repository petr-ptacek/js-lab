# Emitter

Strongly-typed event emitter with type-safe event definitions and handler management.

## Usage

```ts
import { Emitter } from "@petr-ptacek/js-core"

type Events = {
  userLogin: (user: { id: string; name: string }) => void;
  dataReceived: (data: unknown[]) => void;
  error: (message: string) => void;
}

const emitter = new Emitter<Events>()

// Register handlers
const cleanup = emitter.on("userLogin", (user) => {
  console.log(`Welcome ${user.name}!`)
})

// Emit events
emitter.emit("userLogin", { id: "123", name: "John" })

// Cleanup
cleanup()
```

## Why This Utility Exists

JavaScript lacks a built-in type-safe event emitter. Existing solutions like Node.js EventEmitter are untyped, leading
to runtime errors and poor developer experience. This utility provides compile-time type checking for event names and
payloads, ensuring type safety across event-driven architectures.

## Signature

```ts
class Emitter<Events extends EmitterEvents> {
  constructor()
  constructor(initialHandlers: EmitterInitialHandlers<Events>)

  on<TType extends keyof Events>(type: TType, handler: Events[TType]): CleanupFn

  once<TType extends keyof Events>(type: TType, handler: Events[TType]): CleanupFn

  emit<TType extends keyof Events>(type: TType, ...args: Parameters<Events[TType]>): void

  off<TType extends keyof Events>(type: TType): void
  off<TType extends keyof Events>(type: TType, handler: Events[TType]): void

  clear(): void
}
```

## Parameters

### Constructor Parameters

- `initialHandlers` (`EmitterInitialHandlers<Events>`, optional): Object defining initial event handlers. Handlers can be provided directly or with metadata like `once`.

### Method Parameters

- `on(type, handler)`: Registers an event handler
  - `type` (`keyof Events`): Event name
  - `handler` (`Events[TType]`): Handler function matching the event signature
- `once(type, handler)`: Registers a one-time event handler with same parameters as `on`
- `emit(type, ...args)`: Emits an event
  - `type` (`keyof Events`): Event name
  - `args` (`Parameters<Events[TType]>`): Arguments matching the handler signature
- `off(type, handler?)`: Removes event handlers
  - `type` (`keyof Events`): Event name
  - `handler` (`Events[TType]`, optional): Specific handler to remove; omit to remove all handlers for the event

## Type Parameters

- `<Events extends EmitterEvents>`: Object type defining the event map where keys are event names and values are handler
  function signatures.

## Return Type

- Constructor returns an `Emitter<Events>` instance
- `on()` and `once()` return a cleanup function of type `CleanupFn`
- `emit()`, `off()`, and `clear()` return `void`

## Type Declarations

The utility exports several TypeScript types for proper integration:

```ts
type EmitterEvents = {
  [event: string | symbol]: (...args: any[]) => void;
}

type EmitterInitialHandlers<E extends EmitterEvents> = {
  [K in keyof E]?: InitialHandler<E[K]>;
}

type InitialHandler<THandler> = THandler | {
  handler: THandler;
  once?: boolean;
}

type EmitterEventHandler = (...args: any[]) => void;

type CleanupFn = () => void;
```

These types enable proper TypeScript integration and ensure type safety when defining event maps and handlers.

## Design Notes

The implementation uses a Map-based storage system for efficient handler management. Handlers are executed in the order
they were registered, providing predictable behavior.

The generic `Events` type constrains event definitions to function signatures, enabling automatic parameter inference
and type checking. The class maintains strict type boundaries between different event types.

One-time handlers are automatically removed after execution, eliminating memory leaks. The cleanup functions returned by
`on()` and `once()` provide explicit handler removal control.

## When To Use

Use `Emitter` when you need:

- type-safe event-driven communication between components
- decoupled architecture with event-based messaging
- automatic cleanup of event handlers
- compile-time validation of event names and payloads

## When Not To Use

Avoid when:

- working with DOM events (use native EventTarget instead)
- you need async event handling patterns
- simple callback patterns are sufficient
- working with external event systems that don't support custom emitters

## Summary

`Emitter` provides a type-safe event emitter with automatic handler cleanup, compile-time event validation, and
predictable execution order for building robust event-driven applications.
