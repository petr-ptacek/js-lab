---
title: getAspectRatio
category: number
tags:
  - aspect-ratio
  - dimensions
  - ratio
  - calculation
  - image
since: 1.0.0
---


> **Category:** number
> **Since:** 1.0.0
> **Tags:** aspect-ratio, dimensions, ratio, calculation, image


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


## Snippets

### basic.ts

```ts
import { getAspectRatio } from "@petr-ptacek/js-core";

// common aspect ratios
const widescreen = getAspectRatio(1920, 1080);
console.log("16:9 widescreen:", widescreen); // 1.7777777777777777

const traditional = getAspectRatio(1024, 768);
console.log("4:3 traditional:", traditional); // 1.3333333333333333

const square = getAspectRatio(400, 400);
console.log("1:1 square:", square); // 1

const portrait = getAspectRatio(600, 800);
console.log("3:4 portrait:", portrait); // 0.75

// ultra-wide and cinematic ratios
const ultrawide = getAspectRatio(3440, 1440);
console.log("21:9 ultrawide:", ultrawide); // 2.388888888888889

const cinematic = getAspectRatio(2048, 858);
console.log("2.39:1 cinematic:", cinematic); // 2.387645787545787

```

### image-analysis.ts

```ts
import { getAspectRatio } from "@petr-ptacek/js-core";

// image analysis and classification
function analyzeImageDimensions(width: number, height: number) {
  const aspectRatio = getAspectRatio(width, height);

  let orientation: string;
  let category: string;

  // determine orientation
  if (aspectRatio > 1) {
    orientation = "landscape";
  } else if (aspectRatio < 1) {
    orientation = "portrait";
  } else {
    orientation = "square";
  }

  // categorize common ratios
  if (Math.abs(aspectRatio - 1.777) < 0.01) {
    category = "16:9 widescreen";
  } else if (Math.abs(aspectRatio - 1.333) < 0.01) {
    category = "4:3 traditional";
  } else if (Math.abs(aspectRatio - 1) < 0.01) {
    category = "1:1 square";
  } else if (Math.abs(aspectRatio - 0.75) < 0.01) {
    category = "3:4 portrait";
  } else if (aspectRatio > 2) {
    category = "ultra-wide";
  } else {
    category = "custom ratio";
  }

  return {
    width,
    height,
    aspectRatio,
    orientation,
    category
  };
}

// example images
const images = [
  { name: "Desktop wallpaper", width: 1920, height: 1080 },
  { name: "Instagram post", width: 1080, height: 1080 },
  { name: "Phone screenshot", width: 375, height: 812 },
  { name: "Traditional photo", width: 800, height: 600 },
  { name: "Ultrawide monitor", width: 3440, height: 1440 }
];

images.forEach(({ name, width, height }) => {
  const analysis = analyzeImageDimensions(width, height);
  console.log(`${name}:`, {
    ratio: analysis.aspectRatio.toFixed(3),
    orientation: analysis.orientation,
    category: analysis.category
  });
});

// Output:
// Desktop wallpaper: { ratio: '1.778', orientation: 'landscape', category: '16:9 widescreen' }
// Instagram post: { ratio: '1.000', orientation: 'square', category: '1:1 square' }
// Phone screenshot: { ratio: '0.462', orientation: 'portrait', category: 'custom ratio' }
// Traditional photo: { ratio: '1.333', orientation: 'landscape', category: '4:3 traditional' }
// Ultrawide monitor: { ratio: '2.389', orientation: 'landscape', category: 'ultra-wide' }

```

### responsive-layout.ts

```ts
import { getAspectRatio } from "@petr-ptacek/js-core";

// responsive layout helper
class ResponsiveContainer {
  private width: number;
  private height: number;

  constructor(
    width: number,
    height: number
  ) {
    this.width = width;
    this.height = height;
  }

  get aspectRatio(): number {
    return getAspectRatio(this.width, this.height);
  }

  // check if content fits without letterboxing/pillarboxing
  canFitContent(contentWidth: number, contentHeight: number): boolean {
    const containerRatio = this.aspectRatio;
    const contentRatio = getAspectRatio(contentWidth, contentHeight);

    // content fits if its ratio is between container ratio bounds
    // (allowing for some small floating point tolerance)
    return Math.abs(containerRatio - contentRatio) < 0.001;
  }

  // determine how content will be displayed
  getDisplayMode(contentWidth: number, contentHeight: number) {
    const containerRatio = this.aspectRatio;
    const contentRatio = getAspectRatio(contentWidth, contentHeight);

    if (Math.abs(containerRatio - contentRatio) < 0.001) {
      return "perfect fit";
    } else if (contentRatio > containerRatio) {
      return "letterboxed"; // black bars top/bottom
    } else {
      return "pillarboxed"; // black bars left/right
    }
  }

  // suggest optimal dimensions for content
  getOptimalContentSize(targetWidth?: number, targetHeight?: number) {
    const ratio = this.aspectRatio;

    if (targetWidth) {
      return {
        width: targetWidth,
        height: Math.round(targetWidth / ratio)
      };
    } else if (targetHeight) {
      return {
        width: Math.round(targetHeight * ratio),
        height: targetHeight
      };
    } else {
      // suggest based on container dimensions
      return {
        width: this.width,
        height: this.height
      };
    }
  }
}

// usage examples
const videoPlayer = new ResponsiveContainer(800, 450); // 16:9 player
console.log("Player aspect ratio:", videoPlayer.aspectRatio.toFixed(3)); // 1.778

// test different video formats
const videos = [
  { name: "YouTube video", width: 1920, height: 1080 },
  { name: "Old TV show", width: 640, height: 480 },
  { name: "Vertical TikTok", width: 608, height: 1080 },
  { name: "Square Instagram", width: 1080, height: 1080 }
];

videos.forEach(({ name, width, height }) => {
  const mode = videoPlayer.getDisplayMode(width, height);
  const fits = videoPlayer.canFitContent(width, height);
  console.log(`${name}: ${mode} (perfect fit: ${fits})`);
});

// generate optimal thumbnail sizes
const thumbnailSizes = [200, 400, 600].map(width =>
  videoPlayer.getOptimalContentSize(width)
);

console.log("Optimal thumbnail sizes:", thumbnailSizes);
// [
//   { width: 200, height: 113 },
//   { width: 400, height: 225 },
//   { width: 600, height: 338 }
// ]

```




