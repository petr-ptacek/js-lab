# Function: scaleImageByAspectRatio()

Scales an image to a target width or height while preserving its aspect ratio.

Exactly one dimension (`width` or `height`) must be provided.
The other dimension is calculated automatically based on the
image's natural size.

This utility is a thin, DOM-oriented wrapper around `scaleByAspectRatio`
that operates directly on `HTMLImageElement` and returns a **new image
instance** with updated dimensions.

The original image is not mutated.

## Param

Source image. Must have valid `naturalWidth` and `naturalHeight`.

## Param

Target dimension. Exactly one of `width` or `height` is required.

## Param

Optional rounding function applied to the calculated dimension.

## Throws

Throws if:
- both `width` and `height` are provided
- neither `width` nor `height` is provided
- image natural dimensions are not positive finite numbers

## Remarks

- Aspect ratio is always preserved
- Scaling is synchronous
- The returned image shares the same `src` as the original image

## See

scaleByAspectRatio

## Examples

Scale an image to a fixed width:
```ts
const img = document.querySelector("img")!;

const scaled = scaleImageByAspectRatio(img, { width: 300 });

scaled.width;  // 300
scaled.height; // calculated automatically
```

Scale an image to a fixed height:
```ts
const scaled = scaleImageByAspectRatio(img, { height: 200 });
```

Use a custom rounding strategy:
```ts
const scaled = scaleImageByAspectRatio(
  img,
  { width: 300 },
  Math.floor,
);
```

Invalid usage (compile-time + runtime protection):
```ts
scaleImageByAspectRatio(img, { width: 300, height: 200 });
// ❌ throws – exactly one dimension must be provided
```

## Since

1.0.0

## Call Signature

> **scaleImageByAspectRatio**(`image`, `__namedParameters`, `roundFn?`): `HTMLImageElement`

### Parameters

#### image

`HTMLImageElement`

#### \_\_namedParameters

##### width

`number`

#### roundFn?

[`RoundValueFn`](../type-aliases/RoundValueFn.md)

### Returns

`HTMLImageElement`

## Call Signature

> **scaleImageByAspectRatio**(`image`, `__namedParameters`, `roundFn?`): `HTMLImageElement`

### Parameters

#### image

`HTMLImageElement`

#### \_\_namedParameters

##### height

`number`

#### roundFn?

[`RoundValueFn`](../type-aliases/RoundValueFn.md)

### Returns

`HTMLImageElement`
