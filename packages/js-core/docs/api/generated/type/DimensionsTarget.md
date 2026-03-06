---
title: DimensionsTarget
category: type
tags:
  - type
  - dimensions
  - target
  - scaling
  - exclusive
  - union
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, dimensions, target, scaling, exclusive, union


# DimensionsTarget

Defines a target dimension using a single axis.

## Usage

```ts
import type { DimensionsTarget } from "@petr-ptacek/js-core"

// Target specific width
const targetWidth: DimensionsTarget = { width: 800 }

// Target specific height  
const targetHeight: DimensionsTarget = { height: 600 }

function scaleToTarget(original: Dimensions, target: DimensionsTarget): Dimensions {
  if ('width' in target) {
    const ratio = target.width / original.width
    return {
      width: target.width,
      height: Math.round(original.height * ratio)
    }
  } else {
    const ratio = target.height / original.height
    return {
      width: Math.round(original.width * ratio), 
      height: target.height
    }
  }
}
```

## Why This Type Exists

Many scaling and resizing operations need to constrain only one dimension while calculating the other to preserve aspect ratio. `DimensionsTarget` enforces that exactly one dimension is specified, preventing invalid states and providing type safety for single-axis scaling operations.

## Type Declaration

```ts
type DimensionsTarget =
  | { width: number; height?: never }
  | { height: number; width?: never }
```

## When To Use

Use `DimensionsTarget` when:

- implementing aspect ratio preserving scaling
- constraining images to fit specific widths or heights
- building responsive image components
- creating thumbnail generation with size constraints
- working with scaling utilities that operate on single dimensions

```ts
// Responsive image sizing
function generateResponsiveSizes(original: Dimensions, targets: DimensionsTarget[]): Dimensions[] {
  return targets.map(target => scaleToTarget(original, target))
}

const breakpoints: DimensionsTarget[] = [
  { width: 320 },  // mobile
  { width: 768 },  // tablet
  { width: 1200 }, // desktop
  { height: 400 }  // specific height constraint
]

// Thumbnail generation
class ThumbnailGenerator {
  generateThumbnail(image: Dimensions, constraint: DimensionsTarget): Dimensions {
    if ('width' in constraint) {
      return this.scaleByWidth(image, constraint.width)
    } else {
      return this.scaleByHeight(image, constraint.height)  
    }
  }
  
  private scaleByWidth(image: Dimensions, targetWidth: number): Dimensions {
    const aspectRatio = image.height / image.width
    return {
      width: targetWidth,
      height: Math.round(targetWidth * aspectRatio)
    }
  }
  
  private scaleByHeight(image: Dimensions, targetHeight: number): Dimensions {
    const aspectRatio = image.width / image.height
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight
    }
  }
}

// Form validation
function validateTarget(target: DimensionsTarget): boolean {
  const hasWidth = 'width' in target && typeof target.width === 'number'
  const hasHeight = 'height' in target && typeof target.height === 'number'
  
  // TypeScript ensures exactly one is present, but runtime validation
  return hasWidth !== hasHeight // XOR: exactly one should be true
}
```

## When Not To Use

Avoid when:

- you need both dimensions simultaneously (use `Dimensions` directly)
- working with proportional scaling that doesn't preserve aspect ratio
- you need multiple constraints or complex scaling logic
- the target can be optional or undefined (use optional `Dimensions` properties)

## Design Notes

This type uses discriminated unions with `never` types to enforce mutual exclusivity:

1. **Exclusive choice**: Either `width` OR `height`, never both or neither
2. **Type safety**: TypeScript compiler prevents invalid combinations
3. **Runtime clarity**: Clear intent about which dimension is being targeted
4. **Function overloads**: Enables precise typing for scaling functions

The `never` type ensures that if one property is present, the other cannot be defined, providing compile-time guarantees about the object structure.

## Summary

`DimensionsTarget` provides type-safe, mutually exclusive dimension targeting for aspect ratio preserving operations, ensuring exactly one axis is constrained while maintaining clear intent and preventing invalid scaling configurations.





