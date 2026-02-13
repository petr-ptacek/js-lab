# Type Alias: ValueOrGetter\<TResult\>

> **ValueOrGetter**\<`TResult`\> = `TResult` \| [`Getter`](Getter.md)\<`TResult`\>

Represents a value or a getter function that produces a value.

This type allows for flexible value provision, where the value can be
provided directly or computed lazily via a getter function.

## Type Parameters

### TResult

`TResult`

## Example

```ts
const config: ValueOrGetter<string> = "default";
const configGetter: ValueOrGetter<string> = () => "computed";
```

## Since

1.0.0
