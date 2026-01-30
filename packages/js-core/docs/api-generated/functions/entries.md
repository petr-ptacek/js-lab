# Function: entries()

> **entries**\<`T`\>(`obj`): \{ \[K in string \| number \| symbol\]: \[K, T\[K\]\] \}\[keyof `T`\][]

Returns the enumerable own property `[key, value]` pairs of an object
with preserved key and value types.

This is a typed wrapper around `Object.entries`.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### obj

`T`

## Returns

\{ \[K in string \| number \| symbol\]: \[K, T\[K\]\] \}\[keyof `T`\][]

## Example

```ts
const user = {
  id: 1,
  name: "John",
};

for (const [key, value] of entries(user)) {
  // key: "id" | "name"
  // value: number | string
}
```

## Since

1.0.0
