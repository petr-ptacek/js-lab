# Type Alias: EmitterInitialHandlers\<E\>

> **EmitterInitialHandlers**\<`E`\> = `{ [K in keyof E]?: InitialHandler<E[K]> }`

Defines initial event handlers passed to the `Emitter` constructor.

Each handler can be provided either directly, or as an object
with additional options such as `once`.

## Type Parameters

### E

`E` *extends* [`EmitterEvents`](EmitterEvents.md)

## Example

```ts
const emitter = new Emitter<Events>({
  ready: () => console.log("ready"),
  close: {
    handler: () => console.log("closed"),
    once: true,
  },
});
```

## Since

1.0.0
