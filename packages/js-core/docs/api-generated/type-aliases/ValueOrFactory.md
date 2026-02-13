# Type Alias: ValueOrFactory\<TResult, TArgs\>

> **ValueOrFactory**\<`TResult`, `TArgs`\> = `TResult` \| [`Factory`](Factory.md)\<`TResult`, `TArgs`\>

Represents a value or a factory function that produces a value.

This type allows for flexible value provision, where the value can be
provided directly or computed lazily via a factory function.

## Type Parameters

### TResult

`TResult`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Example

```ts
const config: ValueOrFactory<string> = "default";
const configFactory: ValueOrFactory<string, [number]> = (n) => `computed ${n}`;
```

## Since

1.0.0
