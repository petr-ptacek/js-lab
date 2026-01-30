# Type Alias: EmitterEvents

> **EmitterEvents** = `object`

Defines a map of event names to event handler functions.

Each key represents an event type and its value represents
the corresponding handler signature.

## Index Signature

\[`event`: `string` \| `symbol`\]: `EventHandler`

## Example

```ts
type Events = {
  open: () => void;
  close: (reason: string) => void;
};
```

## Since

1.0.0
