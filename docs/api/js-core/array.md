[**@petr-ptacek/js-core**](README.md)

***

[@petr-ptacek/js-core](README.md) / array

# array

## Functions

### shuffleArray()

> **shuffleArray**\<`T`\>(`array`): `T`[]

Defined in: [array/shuffleArray.ts:14](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/array/shuffleArray.ts#L14)

Shuffles an array using the Fisher–Yates algorithm.

The original array is not mutated.

#### Type Parameters

##### T

`T` = `unknown`

Type of array elements

#### Parameters

##### array

readonly `T`[]

The array to shuffle

#### Returns

`T`[]

A new array with elements in random order

#### Example

```ts
shuffleArray([1, 2, 3])
// → [2, 1, 3]
```

***

### zipArray()

Zips two arrays element-wise.

The resulting array length is determined by the shorter input array.
When a mapper is provided, each pair is transformed using the mapper function.
The input arrays are not mutated.

#### Type Param

Type of elements in the first array

#### Type Param

Type of elements in the second array

#### Type Param

Result type produced by the mapper

#### Param

First array

#### Param

Second array

#### Param

Optional function to transform each pair

#### Examples

```ts
zipArray([1, 2], ["a", "b"])
// → [[1, "a"], [2, "b"]]
```

```ts
zipArray([1, 2], [10, 20], (a, b) => a + b)
// → [11, 22]
```

#### Call Signature

> **zipArray**\<`T`, `U`\>(`arrayOne`, `arrayTwo`): \[`T`, `U`\][]

Defined in: [array/zipArray.ts:3](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/array/zipArray.ts#L3)

##### Type Parameters

###### T

`T`

###### U

`U`

##### Parameters

###### arrayOne

readonly `T`[]

###### arrayTwo

readonly `U`[]

##### Returns

\[`T`, `U`\][]

#### Call Signature

> **zipArray**\<`T`, `U`, `R`\>(`arrayOne`, `arrayTwo`, `mapper`): `R`[]

Defined in: [array/zipArray.ts:8](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/array/zipArray.ts#L8)

##### Type Parameters

###### T

`T`

###### U

`U`

###### R

`R`

##### Parameters

###### arrayOne

readonly `T`[]

###### arrayTwo

readonly `U`[]

###### mapper

(`a`, `b`) => `R`

##### Returns

`R`[]
