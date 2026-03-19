# Dimensions

Represents a two-dimensional size defined by width and height.

## Usage

```ts
import type { Dimensions } from "@petr-ptacek/js-core"

const screenSize: Dimensions = {
  width: 1920,
  height: 1080
}

const imageSize: Dimensions = {
  width: 800,
  height: 600
}

function calculateArea(dimensions: Dimensions): number {
  return dimensions.width * dimensions.height
}

const area = calculateArea(screenSize) // 2073600
```

## Why This Type Exists

Two-dimensional sizes are fundamental in graphics, UI layout, image processing, and responsive design. `Dimensions` provides a standardized, domain-agnostic representation for width/height pairs that ensures consistency across scaling, aspect ratio calculations, and size-related operations throughout the library.

## Type Declaration

```ts
type Dimensions = {
  width: number;
  height: number;
}
```

## When To Use

Use `Dimensions` when:

- working with image, video, or canvas sizes
- defining viewport or container dimensions
- implementing scaling or resizing operations
- calculating aspect ratios or areas
- building responsive layout utilities

```ts
// Image processing
function resizeImage(original: Dimensions, maxSize: Dimensions): Dimensions {
  const aspectRatio = original.width / original.height
  
  if (original.width > maxSize.width) {
    return {
      width: maxSize.width,
      height: Math.round(maxSize.width / aspectRatio)
    }
  }
  
  return original
}

// Viewport utilities
class ViewportManager {
  getViewportSize(): Dimensions {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  
  isLandscape(dimensions: Dimensions): boolean {
    return dimensions.width > dimensions.height
  }
}

// Layout calculations
function fitInContainer(content: Dimensions, container: Dimensions): Dimensions {
  const scaleX = container.width / content.width
  const scaleY = container.height / content.height
  const scale = Math.min(scaleX, scaleY)
  
  return {
    width: Math.round(content.width * scale),
    height: Math.round(content.height * scale)
  }
}
```

## When Not To Use

Avoid when:

- you need three-dimensional coordinates (use 3D vector types)
- working with single-axis measurements (use `number` directly)
- you need different units for width/height (create specific interfaces)
- working with positioned elements (use position + dimensions types)

## Design Notes

This type is intentionally simple and domain-agnostic:

1. **Numeric values**: Uses `number` for maximum flexibility (pixels, percentages, etc.)
2. **Required properties**: Both `width` and `height` must be specified
3. **Domain-agnostic**: Works for images, screens, containers, or any 2D measurements
4. **Library consistency**: Used throughout the library for scaling and aspect ratio utilities

The type serves as a foundation for more complex operations while maintaining simplicity for basic use cases.

## Summary

`Dimensions` provides a standardized representation for two-dimensional sizes, enabling consistent width/height handling across image processing, responsive design, and layout calculations throughout the library.
