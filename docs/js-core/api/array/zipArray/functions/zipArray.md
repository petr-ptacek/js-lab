[**@petr-ptacek/js-core**](../../../README.md)

***

[@petr-ptacek/js-core](../../../README.md) / [array/zipArray](../README.md) / zipArray

# Function: zipArray()

## Call Signature

> **zipArray**\<`T`, `U`\>(`arrayOne`, `arrayTwo`): \[`T`, `U`\][]

Defined in: [array/zipArray.ts:3](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/array/zipArray.ts#L3)

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

> **zipArray**\<`T`, `U`, `R`\>(`arrayOne`, `arrayTwo`, `mapper`): `R`[]

Defined in: [array/zipArray.ts:8](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/array/zipArray.ts#L8)

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
