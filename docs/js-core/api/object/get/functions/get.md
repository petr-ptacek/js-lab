[**@petr-ptacek/js-core**](../../../README.md)

***

[@petr-ptacek/js-core](../../../README.md) / [object/get](../README.md) / get

# Function: get()

## Call Signature

> **get**\<`T`, `P`\>(`obj`, `path`): `PathValue`\<`T`, `P`\> \| `undefined`

Defined in: [object/get.ts:32](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/object/get.ts#L32)

### Type Parameters

#### T

`T` *extends* `object`

#### P

`P` *extends* `` `${number}` ``

### Parameters

#### obj

`T`

#### path

`P`

### Returns

`PathValue`\<`T`, `P`\> \| `undefined`

## Call Signature

> **get**\<`T`, `P`, `D`\>(`obj`, `path`, `defaultValue`): `D` \| `Exclude`\<`PathValue`\<`T`, `P`\>, `undefined`\>

Defined in: [object/get.ts:40](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/object/get.ts#L40)

### Type Parameters

#### T

`T` *extends* `object`

#### P

`P` *extends* `` `${number}` ``

#### D

`D`

### Parameters

#### obj

`T`

#### path

`P`

#### defaultValue

`D`

### Returns

`D` \| `Exclude`\<`PathValue`\<`T`, `P`\>, `undefined`\>
