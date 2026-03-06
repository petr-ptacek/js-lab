# getAspectRatio

Computes the aspect ratio from given dimensions.

## Usage

```ts
import { getAspectRatio } from "@petr-ptacek/js-core"

const aspectRatio = getAspectRatio(1920, 1080)
console.log(aspectRatio) // 1.7777777777777777 (16:9 ratio)

const square = getAspectRatio(400, 400)
console.log(square) // 1 (1:1 ratio)

const portrait = getAspectRatio(300, 400)
console.log(portrait) // 0.75 (3:4 ratio)
```

## Why This Utility Exists

Aspect ratio calculations are fundamental in image processing, responsive design, and media handling. While the math is simple (`width / height`), this utility provides proper input validation, throws descriptive errors for invalid inputs, and ensures consistent behavior across different contexts where aspect ratios are needed.

## Signature

```ts
function getAspectRatio(width: number, height: number): number
```

## Parameters

- `width` (`number`): Width dimension. Must be a positive finite number.
- `height` (`number`): Height dimension. Must be a positive finite number.

## Return Type

Returns a `number` representing the aspect ratio calculated as `width / height`.

Common aspect ratio values:
- `1.777...` (16:9 widescreen)
- `1.333...` (4:3 traditional)
- `1.0` (1:1 square)
- `0.75` (3:4 portrait)

## Throws

- Throws `Error` when `width` is not a positive finite number
- Throws `Error` when `height` is not a positive finite number

## Design Notes

The implementation uses `assertPositiveFinite` helper to validate both dimensions before calculation. This ensures:

1. **Input validation**: Prevents invalid calculations with zero, negative, or non-finite numbers
2. **Clear error messages**: Provides descriptive errors identifying which parameter is invalid
3. **Type safety**: Guarantees the return value is a valid positive number
4. **Consistency**: Uses the same validation pattern as other dimension utilities

The formula `width / height` follows the standard mathematical definition where values greater than 1 indicate landscape orientation and values less than 1 indicate portrait orientation.

## When To Use

Use `getAspectRatio` when you need:

- aspect ratio calculations for image resizing
- responsive layout calculations
- media format validation
- cropping or scaling operations
- consistent aspect ratio representation across your application

## When Not To Use

Avoid when:

- you need the inverse ratio (height/width) - calculate directly or use a different utility
- working with already calculated aspect ratios
- dimensions can legitimately be zero or negative (use direct division)
- you need rounded or formatted aspect ratio values (combine with other utilities)

## Summary

`getAspectRatio` provides a simple, validated way to compute aspect ratios from dimensions with proper error handling for edge cases and consistent behavior across different scaling and layout scenarios.
