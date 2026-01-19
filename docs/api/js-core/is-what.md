[**@petr-ptacek/js-core**](README.md)

***

[@petr-ptacek/js-core](README.md) / is-what

# is-what

## Functions

### isArray()

> **isArray**\<`T`\>(`value`): `value is T[]`

Defined in: [is-what/isArray.ts:25](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isArray.ts#L25)

Checks whether the given value is an array.

Acts as a type guard and narrows the value to `T[]` when true.

#### Type Parameters

##### T

`T` = `unknown`

Type of array elements.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is T[]`

`true` if the value is an array, otherwise `false`.

#### Examples

```ts
isArray([1, 2, 3]); // true
isArray("text");   // false
```

```ts
const value: unknown = ["a", "b"];

if (isArray<string>(value)) {
  value.map(v => v.toUpperCase());
}
```

***

### isBigint()

> **isBigint**(`value`): `value is bigint`

Defined in: [is-what/isBigint.ts:25](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isBigint.ts#L25)

Checks whether the given value is a `bigint`.

Acts as a type guard and narrows the value to `bigint` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is bigint`

`true` if the value is a bigint, otherwise `false`.

#### Examples

```ts
isBigint(10n);    // true
isBigint(10);     // false
isBigint("10");   // false
```

```ts
const value: unknown = 42n;

if (isBigint(value)) {
  value + 1n;
}
```

***

### isBoolean()

> **isBoolean**(`value`): `value is boolean`

Defined in: [is-what/isBoolean.ts:25](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isBoolean.ts#L25)

Checks whether the given value is a `boolean`.

Acts as a type guard and narrows the value to `boolean` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is boolean`

`true` if the value is a boolean, otherwise `false`.

#### Examples

```ts
isBoolean(true);    // true
isBoolean(null);     // false
isBoolean("10");   // false
```

```ts
const value: unknown = 42n;

if (isBoolean(value)) {
  // logic
}
```

***

### isDate()

> **isDate**(`value`): `value is Date`

Defined in: [is-what/isDate.ts:27](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isDate.ts#L27)

Checks whether the given value is a `Date` instance.

Acts as a type guard and narrows the value to `Date` when true.

Note: This function does **not** verify whether the date is valid
(i.e. `new Date("invalid")` is still a `Date` instance).

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Date`

`true` if the value is a `Date` instance, otherwise `false`.

#### Examples

```ts
isDate(new Date());          // true
isDate("2024-01-01");        // false
```

```ts
const value: unknown = new Date();

if (isDate(value)) {
  value.getTime();
}
```

***

### isEmptyArray()

> **isEmptyArray**\<`T`\>(`value`): `value is T[]`

Defined in: [is-what/isEmptyArray.ts:29](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isEmptyArray.ts#L29)

Checks whether the given value is an empty array.

Acts as a type guard and narrows the value to an empty array of type `T[]`
when true.

#### Type Parameters

##### T

`T` = `unknown`

Type of array elements.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is T[]`

`true` if the value is an array with zero length, otherwise `false`.

#### Examples

```ts
isEmptyArray([]);        // true
isEmptyArray([1, 2]);   // false
isEmptyArray("text");   // false
```

```ts
const value: unknown = [];

if (isEmptyArray<string>(value)) {
  value.length; // 0
}
```

***

### isEmptyString()

> **isEmptyString**(`value`): `value is string`

Defined in: [is-what/isEmptyString.ts:27](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isEmptyString.ts#L27)

Checks whether the given value is an empty string.

Acts as a type guard and narrows the value to `string` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

`true` if the value is a string with zero length, otherwise `false`.

#### Examples

```ts
isEmptyString("");        // true
isEmptyString("text");    // false
isEmptyString(123);       // false
```

```ts
const value: unknown = "";

if (isEmptyString(value)) {
  value.length; // 0
}
```

***

### isFiniteNumber()

> **isFiniteNumber**(`value`): `value is number`

Defined in: [is-what/isFiniteNumber.ts:27](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isFiniteNumber.ts#L27)

Checks whether the given value is a finite number.

Acts as a type guard and narrows the value to `number` when true.
This excludes `NaN`, `Infinity`, and `-Infinity`.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

`true` if the value is a finite number, otherwise `false`.

#### Examples

```ts
isFiniteNumber(10);         // true
isFiniteNumber(NaN);        // false
isFiniteNumber(Infinity);  // false
isFiniteNumber("10");      // false
```

```ts
const value: unknown = 42;

if (isFiniteNumber(value)) {
  value.toFixed(2);
}
```

***

### isFunction()

> **isFunction**(`value`): `value is Function`

Defined in: [is-what/isFunction.ts:29](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isFunction.ts#L29)

Checks whether the given value is a function.

Acts as a type guard and narrows the value to `Function` when true.

Note: The `Function` type is intentionally used here to allow
any callable value without constraining its arguments or return type.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Function`

`true` if the value is a function, otherwise `false`.

#### Examples

```ts
isFunction(() => {});    // true
isFunction(class {});   // true
isFunction(123);        // false
```

```ts
const value: unknown = () => "hello";

if (isFunction(value)) {
  value();
}
```

***

### isNaNNumber()

> **isNaNNumber**(`value`): `value is number`

Defined in: [is-what/isNaNNumber.ts:26](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isNaNNumber.ts#L26)

Checks whether the given value is `NaN` (Not-a-Number).

Acts as a type guard and narrows the value to `number` when true.
This function only returns `true` for the numeric `NaN` value.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

`true` if the value is `NaN`, otherwise `false`.

#### Examples

```ts
isNaNNumber(NaN);        // true
isNaNNumber("NaN");     // false
isNaNNumber(undefined); // false
```

```ts
const value: unknown = NaN;

if (isNaNNumber(value)) {
  // value is number (NaN)
}
```

***

### isNull()

> **isNull**(`value`): `value is null`

Defined in: [is-what/isNull.ts:24](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isNull.ts#L24)

Checks whether the given value is `null`.

Acts as a type guard and narrows the value to `null` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is null`

`true` if the value is `null`, otherwise `false`.

#### Examples

```ts
isNull(null);       // true
isNull(undefined); // false
```

```ts
const value: unknown = null;

if (isNull(value)) {
  // value is null
}
```

***

### isNullable()

> **isNullable**(`value`): value is null \| undefined

Defined in: [is-what/isNullable.ts:28](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isNullable.ts#L28)

Checks whether the given value is `null` or `undefined`.

Acts as a type guard and narrows the value to `null | undefined` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

value is null \| undefined

`true` if the value is `null` or `undefined`, otherwise `false`.

#### Examples

```ts
isNullable(null);        // true
isNullable(undefined);   // true
isNullable(0);           // false
```

```ts
const value: unknown = undefined;

if (isNullable(value)) {
  // value is null | undefined
}
```

***

### isNumber()

> **isNumber**(`value`): `value is number`

Defined in: [is-what/isNumber.ts:27](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isNumber.ts#L27)

Checks whether the given value is a number.

Acts as a type guard and narrows the value to `number` when true.
This includes `NaN`, `Infinity`, and `-Infinity`.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

`true` if the value is of type `number`, otherwise `false`.

#### Examples

```ts
isNumber(42);        // true
isNumber(NaN);       // true
isNumber(Infinity);  // true
isNumber("42");      // false
```

```ts
const value: unknown = 3.14;

if (isNumber(value)) {
  value.toFixed(2);
}
```

***

### isObject()

> **isObject**(`value`): `value is Record<string, unknown>`

Defined in: [is-what/isObject.ts:31](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isObject.ts#L31)

Checks whether the given value is an object.

Acts as a type guard and narrows the value to `Record<string, unknown>` when true.

Note: This function returns `true` for plain objects, arrays, and other
non-null objects (e.g. `Date`, `Map`).

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Record<string, unknown>`

`true` if the value is a non-null object, otherwise `false`.

#### Examples

```ts
isObject({});        // true
isObject([]);        // true
isObject(null);      // false
isObject("text");   // false
```

```ts
const value: unknown = { a: 1 };

if (isObject(value)) {
  value["a"];
}
```

***

### isPrimitive()

> **isPrimitive**(`value`): `value is PrimitiveValue`

Defined in: [is-what/isPrimitive.ts:39](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isPrimitive.ts#L39)

Checks whether the given value is a JavaScript primitive.

Acts as a type guard and narrows the value to `PrimitiveValue` when true.

A primitive value is one of:
`string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is PrimitiveValue`

`true` if the value is a primitive value, otherwise `false`.

#### Examples

```ts
isPrimitive("text");     // true
isPrimitive(42);         // true
isPrimitive(null);       // true
isPrimitive({});         // false
isPrimitive([]);         // false
```

```ts
const value: unknown = Symbol("id");

if (isPrimitive(value)) {
  // value is PrimitiveValue
}
```

***

### isString()

> **isString**(`value`): `value is string`

Defined in: [is-what/isString.ts:24](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isString.ts#L24)

Checks whether the given value is a string.

Acts as a type guard and narrows the value to `string` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

`true` if the value is of type `string`, otherwise `false`.

#### Examples

```ts
isString("text");   // true
isString(123);      // false
```

```ts
const value: unknown = "hello";

if (isString(value)) {
  value.toUpperCase();
}
```

***

### isSymbol()

> **isSymbol**(`value`): `value is symbol`

Defined in: [is-what/isSymbol.ts:24](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isSymbol.ts#L24)

Checks whether the given value is a `symbol`.

Acts as a type guard and narrows the value to `symbol` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is symbol`

`true` if the value is of type `symbol`, otherwise `false`.

#### Examples

```ts
isSymbol(Symbol("id")); // true
isSymbol("id");        // false
```

```ts
const value: unknown = Symbol.iterator;

if (isSymbol(value)) {
  value.toString();
}
```

***

### isUndefined()

> **isUndefined**(`value`): `value is undefined`

Defined in: [is-what/isUndefined.ts:24](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isUndefined.ts#L24)

Checks whether the given value is `undefined`.

Acts as a type guard and narrows the value to `undefined` when true.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is undefined`

`true` if the value is `undefined`, otherwise `false`.

#### Examples

```ts
isUndefined(undefined); // true
isUndefined(null);      // false
```

```ts
const value: unknown = undefined;

if (isUndefined(value)) {
  // value is undefined
}
```

***

### isValidDate()

> **isValidDate**(`value`): `value is Date`

Defined in: [is-what/isValidDate.ts:31](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/is-what/isValidDate.ts#L31)

Checks whether the given value is a valid `Date` instance.

Acts as a type guard and narrows the value to `Date` when true.

A date is considered valid if it is a `Date` instance and its internal
time value is a finite number (i.e. not `NaN`).

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Date`

`true` if the value is a valid `Date`, otherwise `false`.

#### Examples

```ts
isValidDate(new Date());                // true
isValidDate(new Date("invalid"));       // false
isValidDate("2024-01-01");              // false
```

```ts
const value: unknown = new Date("2024-01-01");

if (isValidDate(value)) {
  value.toISOString();
}
```
