# Function: scaleByAspectRatio()

Scales a size while preserving its aspect ratio.

Exactly one target dimension must be provided (`width` or `height`).
The opposite dimension is calculated automatically based on the
original aspect ratio.

## Param

Original size

## Param

Target dimension (`width` or `height`)

## Param

Optional rounding function (defaults to `Math.round`)

## Throws

Throws if:
- `size.width` or `size.height` is not a positive finite number
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

## Call Signature

> **scaleByAspectRatio**(`size`, `target`, `round?`): `Size`

### Parameters

#### size

`Size`

#### target

##### width

`number`

#### round?

`RoundFn`

### Returns

`Size`

## Call Signature

> **scaleByAspectRatio**(`size`, `target`, `round?`): `Size`

### Parameters

#### size

`Size`

#### target

##### height

`number`

#### round?

`RoundFn`

### Returns

`Size`
