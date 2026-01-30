# Function: zip()

Zips two arrays element-wise.

The resulting array length is determined by the shorter input array.
The input arrays are not mutated.

## Param

First array.

## Param

Second array.

## Param

Optional function to transform each pair.

## Examples

```ts
zip([1, 2], ["a", "b"])
// → [[1, "a"], [2, "b"]]
```

```ts
zip([1, 2], [10, 20], (a, b) => a + b)
// → [11, 22]
```

## Since

1.0.0

## Call Signature

> **zip**\<`T`, `U`\>(`arrayOne`, `arrayTwo`): \[`T`, `U`\][]

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### arrayOne

readonly `T`[]

#### arrayTwo

readonly `U`[]

### Returns

\[`T`, `U`\][]

## Call Signature

> **zip**\<`T`, `U`, `R`\>(`arrayOne`, `arrayTwo`, `mapper`): `R`[]

### Type Parameters

#### T

`T`

#### U

`U`

#### R

`R`

### Parameters

#### arrayOne

readonly `T`[]

#### arrayTwo

readonly `U`[]

#### mapper

(`a`, `b`) => `R`

### Returns

`R`[]
