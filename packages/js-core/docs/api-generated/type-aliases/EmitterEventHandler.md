# Type Alias: EmitterEventHandler()

> **EmitterEventHandler** = (...`args`) => `void`

Generic event handler function.

Represents a callable listener registered for an event.
The concrete argument types are defined by the event map
(`EmitterEvents`) and enforced at usage sites.

This base type is intentionally permissive and is only used
internally as a common constraint for all event handlers.

## Parameters

### args

...`any`[]

## Returns

`void`

## Example

```ts
type Events = {
  log: (message: string) => void;
};

const handler: EventHandler = (...args) => {
  console.log(args);
};
```

## Since

1.0.0
