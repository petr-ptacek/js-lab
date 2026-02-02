# scaleByAspectRatio

Utility for scaling two-dimensional dimensions while preserving their original aspect ratio.

This function is intended for cases where one dimension (width or height) is constrained and the other must be derived automatically in a predictable and type-safe way.

---

## What it solves

When working with sizes, images, layout calculations, or any width/height–based logic, it is common to know only one target dimension. Manually calculating the second dimension leads to duplicated logic, rounding inconsistencies, and missing validation.

`scaleByAspectRatio` centralizes this logic and enforces correctness through strict input requirements and runtime validation.

---

## What it does

- Preserves the original aspect ratio of the input dimensions
- Requires **exactly one** target dimension (`width` or `height`)
- Automatically calculates the missing dimension
- Supports custom rounding behavior via a rounding function
- Validates all numeric inputs at runtime

---

## What it does NOT do

- It does not mutate the input object
- It does not infer which dimension should be scaled
- It does not perform any DOM, layout, or rendering logic
- It does not accept zero, negative, or non-finite values

---

## Basic usage

```ts
import { scaleByAspectRatio } from "@petr-ptacek/js-core";

scaleByAspectRatio(
  { width: 400, height: 300 },
  { width: 200 },
);
// → { width: 200, height: 150 }
```

```ts
scaleByAspectRatio(
  { width: 400, height: 300 },
  { height: 150 },
);
// → { width: 200, height: 150 }
```

---

## Custom rounding behavior

By default, calculated values are rounded using `Math.round`. You can override this by providing a custom rounding function.

```ts
scaleByAspectRatio(
  { width: 401, height: 301 },
  { width: 200 },
  Math.floor,
);
// → { width: 200, height: 150 }
```

This is useful when consistent rounding direction is required (e.g. layout calculations).

---

## Types

### Dimensions

```ts
type Dimensions = {
  width: number;
  height: number;
};
```

Represents a two-dimensional size defined by width and height.

---

### DimensionsTarget

```ts
type DimensionsTarget =
  | { width: number; height?: never }
  | { height: number; width?: never };
```

Defines the target dimension used for scaling. Exactly one property must be provided.

---

### RoundValueFn

```ts
type RoundValueFn = (value: number) => number;
```

Defines how calculated numeric values are rounded. Common implementations include `Math.round`, `Math.floor`, and `Math.ceil`.

---

## Error handling

The function throws an `Error` if any of the following conditions are met:

- `dimensions.width` or `dimensions.height` is not a positive finite number
- Both or neither of `target.width` / `target.height` are provided
- The target dimension is not a positive finite number

This strict behavior is intentional to surface invalid usage early.

---

## When to use

- You need to scale sizes proportionally
- One dimension is constrained and the other must adapt
- You want consistent, reusable aspect-ratio logic
- You want runtime validation in addition to type safety

---

## When NOT to use

- You need to stretch dimensions non-proportionally
- You already know both target dimensions
- You are performing DOM or layout-specific calculations

---

## Design notes

- The function is immutable and side-effect free
- Input validation is explicit rather than permissive
- Rounding is configurable instead of hard-coded
- Types are designed to prevent invalid states at compile time

---

## Summary

`scaleByAspectRatio` provides a small, focused abstraction for proportional scaling of dimensions. It prioritizes correctness, clarity, and composability over convenience shortcuts, making it suitable for core utility usage.

## More

[➡️ Read more →](/api-generated/functions/scaleByAspectRatio)
