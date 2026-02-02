# Function: scaleByAspectRatio()

Scales a dimensions while preserving its aspect ratio.

Exactly one target dimension must be provided (`width` or `height`).
The opposite dimension is calculated automatically based on the
original aspect ratio.

## Param

Original dimensions

## Param

Target dimension (`width` or `height`)

## Param

Optional rounding function (defaults to `Math.round`)

## Throws

Throws if:
- `dimensions.width` or `dimensions.height` is not a positive finite number
- both or neither of `target.width` / `target.height` are provided
- target dimension is not a positive finite number

## Example

```ts
scaleByAspectRatio(
  { width: 400, height: 300 },
  { width: 200 },
);
// → { width: 200, height: 150 }

scaleByAspectRatio(
  { width: 400, height: 300 },
  { height: 150 },
);
// → { width: 200, height: 150 }
```

## Since

1.0.0

## Call Signature

> **scaleByAspectRatio**(`dimensions`, `target`, `round?`): [`Dimensions`](../type-aliases/Dimensions.md)

### Parameters

#### dimensions

[`Dimensions`](../type-aliases/Dimensions.md)

#### target

##### width

`number`

#### round?

[`RoundValueFn`](../type-aliases/RoundValueFn.md)

### Returns

[`Dimensions`](../type-aliases/Dimensions.md)

## Call Signature

> **scaleByAspectRatio**(`dimensions`, `target`, `round?`): [`Dimensions`](../type-aliases/Dimensions.md)

### Parameters

#### dimensions

[`Dimensions`](../type-aliases/Dimensions.md)

#### target

##### height

`number`

#### round?

[`RoundValueFn`](../type-aliases/RoundValueFn.md)

### Returns

[`Dimensions`](../type-aliases/Dimensions.md)
