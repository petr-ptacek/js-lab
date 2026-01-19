[**@petr-ptacek/js-core**](README.md)

***

[@petr-ptacek/js-core](README.md) / math

# math

## Functions

### add()

> **add**(`a`, `b`): `number`

Defined in: [math/add.ts:13](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/math/add.ts#L13)

Adds two numbers together.

#### Parameters

##### a

`number`

The first number.

##### b

`number`

The second number.

#### Returns

`number`

The sum of `a` and `b`.

#### Example

```ts
add(1, 2); // 3
```

***

### clamp()

> **clamp**(`value`, `min`, `max`): `number`

Defined in: [math/clamp.ts:20](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/math/clamp.ts#L20)

Clamps a numeric value between a minimum and maximum boundary.

The function assumes `min` and `max` define a valid range.
If `min` is greater than `max`, the function throws an error.

#### Parameters

##### value

`number`

The value to clamp.

##### min

`number`

The lower bound (inclusive).

##### max

`number`

The upper bound (inclusive).

#### Returns

`number`

The clamped value within the `[min, max]` range.

#### Throws

If `min` is greater than `max`.

#### Example

```ts
clamp(5, 0, 10); // 5
clamp(-5, 0, 10); // 0
clamp(20, 0, 10); // 10
```

***

### multiply()

> **multiply**(`a`, `b`): `number`

Defined in: [math/multiply.ts:13](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/math/multiply.ts#L13)

Multiplies two numbers.

#### Parameters

##### a

`number`

The first number.

##### b

`number`

The second number.

#### Returns

`number`

The product of `a` and `b`.

#### Example

```ts
multiply(2, 3); // 6
```

***

### subtract()

> **subtract**(`a`, `b`): `number`

Defined in: [math/subtract.ts:13](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/math/subtract.ts#L13)

Subtracts one number from another.

#### Parameters

##### a

`number`

The minuend.

##### b

`number`

The subtrahend.

#### Returns

`number`

The result of `a - b`.

#### Example

```ts
subtract(5, 2); // 3
```

***

### sum()

> **sum**(...`numbers`): `number`

Defined in: [math/sum.ts:13](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/math/sum.ts#L13)

Calculates the sum of all provided numbers.

#### Parameters

##### numbers

...`number`[]

A list of numbers to sum.

#### Returns

`number`

The sum of all provided numbers. Returns `0` if no numbers are given.

#### Example

```ts
sum(1, 2, 3); // 6
sum();        // 0
```

***

### toPercentage()

> **toPercentage**(`value`, `base`): `number`

Defined in: [math/toPercentage.ts:16](https://github.com/petr-ptacek/js-lab/blob/05c5c9645ce67b7bcbbefcf237a1f6d4a9209b4c/packages/js-core/src/math/toPercentage.ts#L16)

Converts a numeric value to a percentage relative to a given base.

#### Parameters

##### value

`number`

The value to convert into a percentage.

##### base

`number`

The base value representing 100%. Must not be 0.

#### Returns

`number`

The calculated percentage value.

#### Throws

Throws an error if `base` is 0.

#### Examples

```ts
toPercentage(50, 200); // 25
```

```ts
toPercentage(1, 4); // 25
```
