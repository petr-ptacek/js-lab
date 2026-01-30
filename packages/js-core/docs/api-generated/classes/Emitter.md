# Class: Emitter\<Events\>

Strongly-typed event emitter.

Provides a minimal and type-safe API for registering, emitting,
and removing event handlers. Events and their payloads are defined
via a generic event map.

Handlers are executed in the order they were registered.

## Examples

```ts
type Events = {
  sum: (a: number, b: number) => number;
  log: (message: string) => void;
};

const emitter = new Emitter<Events>({
  sum: (a, b) => a + b,
  log: {
    handler: (msg) => console.log(msg),
    once: true,
  },
});

emitter.emit("sum", 1, 2);
emitter.on("log", console.log);
```

*

```ts
type Events = {
  sum: (a: number, b: number) => number;
  log: (message: string) => void;
};

const emitter = new Emitter<Events>();

emitter.on("log", console.log);
emitter.emit("sum", 1, 2);
```

## Since

1.0.0

## Type Parameters

### Events

`Events` *extends* [`EmitterEvents`](../type-aliases/EmitterEvents.md)

## Constructors

### Constructor

> **new Emitter**\<`Events`\>(): `Emitter`\<`Events`\>

Creates a new emitter instance.

Optionally accepts an object with initial event handlers.
Handlers can be provided either directly, or with metadata
such as `once`.

#### Returns

`Emitter`\<`Events`\>

### Constructor

> **new Emitter**\<`Events`\>(`initialHandlers`): `Emitter`\<`Events`\>

#### Parameters

##### initialHandlers

[`EmitterInitialHandlers`](../type-aliases/EmitterInitialHandlers.md)\<`Events`\>

#### Returns

`Emitter`\<`Events`\>

## Methods

### on()

> **on**\<`TType`, `THandler`\>(`type`, `handler`): `CleanupFn`

Registers an event handler.

#### Type Parameters

##### TType

`TType` *extends* `string` \| `number` \| `symbol`

##### THandler

`THandler` *extends* `EventHandler`

#### Parameters

##### type

`TType`

Event name

##### handler

`THandler`

Event handler function

#### Returns

`CleanupFn`

Cleanup function that unregisters the handler

***

### once()

> **once**\<`TType`, `THandler`\>(`type`, `handler`): `CleanupFn`

Registers an event handler that will be called only once.

The handler is automatically removed after the first invocation.

#### Type Parameters

##### TType

`TType` *extends* `string` \| `number` \| `symbol`

##### THandler

`THandler` *extends* `EventHandler`

#### Parameters

##### type

`TType`

Event name

##### handler

`THandler`

Event handler function

#### Returns

`CleanupFn`

Cleanup function that unregisters the handler

***

### emit()

> **emit**\<`TType`\>(`type`, ...`args`): `void`

Emits an event and calls all registered handlers
with the provided arguments.

#### Type Parameters

##### TType

`TType` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`TType`

Event name

##### args

...`Parameters`\<`Events`\[`TType`\]\>

Arguments passed to the event handlers

#### Returns

`void`

***

### off()

Removes event handlers.

When called with only the event type, all handlers
for that event are removed.

When a handler is provided, only that handler
is removed.

#### Param

Event name

#### Param

Optional handler to remove

#### Call Signature

> **off**\<`TType`\>(`type`): `void`

##### Type Parameters

###### TType

`TType` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### type

`TType`

##### Returns

`void`

#### Call Signature

> **off**\<`TType`\>(`type`, `handler`): `void`

##### Type Parameters

###### TType

`TType` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### type

`TType`

###### handler

`Events`\[`TType`\]

##### Returns

`void`

***

### clear()

> **clear**(): `void`

Removes all registered event handlers.

#### Returns

`void`
