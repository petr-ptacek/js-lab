# Function: getAspectRatio()

> **getAspectRatio**(`width`, `height`): `number`

Computes the aspect ratio from given dimensions.

The aspect ratio is defined as `width / height`.
Both values must be positive finite numbers.

## Parameters

### width

`number`

Original width

### height

`number`

Original height

## Returns

`number`

Aspect ratio (`width / height`)

## Throws

Throws if `width` or `height` is not a positive finite number.

## Example

```ts
getAspectRatio(1920, 1080); // 1.777...
getAspectRatio(400, 200);  // 2
```

## Since

1.0.0
