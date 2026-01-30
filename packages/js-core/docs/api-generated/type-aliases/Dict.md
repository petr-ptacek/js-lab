# Type Alias: Dict\<TValue, TKey\>

> **Dict**\<`TValue`, `TKey`\> = `Record`\<`TKey`, `TValue`\>

Represents a dictionary object with arbitrary keys and values.

A semantic alias for TypeScript's `Record` utility type.

## Type Parameters

### TValue

`TValue` = `unknown`

### TKey

`TKey` *extends* `string` \| `number` \| `symbol` = `string`

## Examples

```ts
Dict<string>
// Record<string, string>
```

```ts
Dict<number, "a" | "b">
// { a: number; b: number }
```

## Since

1.0.0
