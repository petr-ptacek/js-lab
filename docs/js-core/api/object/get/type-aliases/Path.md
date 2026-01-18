[**@petr-ptacek/js-core**](../../../README.md)

***

[@petr-ptacek/js-core](../../../README.md) / [object/get](../README.md) / Path

# Type Alias: Path\<T\>

> **Path**\<`T`\> = `T` *extends* [`PrimitiveValue`](../../../types/type-aliases/PrimitiveValue.md) ? `never` : `T` *extends* readonly infer U[] ? `` `${number}` `` \| `` `${number}.${Path<U>}` `` : \{ \[K in keyof T & string\]: T\[K\] extends PrimitiveValue ? K : K \| \`$\{K\}.$\{Path\<T\[K\]\>\}\` \}\[keyof `T` & `string`\]

Defined in: [object/get.ts:4](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/object/get.ts#L4)

## Type Parameters

### T

`T`
