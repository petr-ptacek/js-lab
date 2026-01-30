# Function: range()

Creates an array of numbers following the same semantics as Python's `range`.

## Example

```ts
range(5)            // [0, 1, 2, 3, 4]
range(2, 6)         // [2, 3, 4, 5]
range(0, 10, 2)     // [0, 2, 4, 6, 8]
range(5, 0, -1)     // [5, 4, 3, 2, 1]
range(0)            // []
```

## Param

Start of the range (inclusive), or `stop` if only one argument is provided.

## Param

End of the range (exclusive).

## Param

Step value. Defaults to `1`.

## Throws

Error If `step` is `0`.

## Since

1.0.0

## Call Signature

> **range**(`stop`): `number`[]

### Parameters

#### stop

`number`

### Returns

`number`[]

## Call Signature

> **range**(`start`, `stop`): `number`[]

### Parameters

#### start

`number`

#### stop

`number`

### Returns

`number`[]

## Call Signature

> **range**(`start`, `stop`, `step`): `number`[]

### Parameters

#### start

`number`

#### stop

`number`

#### step

`number`

### Returns

`number`[]
