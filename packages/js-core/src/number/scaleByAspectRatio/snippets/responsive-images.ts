import { scaleByAspectRatio } from "@petr-ptacek/js-core";

// responsive image scaling
class ResponsiveImage {
  private originalDimensions: { width: number; height: number };

  constructor(width: number, height: number) {
    this.originalDimensions = { width, height };
  }

  // scale to fit within container width
  scaleToFitWidth(containerWidth: number) {
    return scaleByAspectRatio(this.originalDimensions, {
      width: containerWidth,
    });
  }

  // scale to fit within container height
  scaleToFitHeight(containerHeight: number) {
    return scaleByAspectRatio(this.originalDimensions, {
      height: containerHeight,
    });
  }

  // scale to fit within container (uses smallest dimension)
  scaleToFitContainer(containerWidth: number, containerHeight: number) {
    const scaledByWidth = this.scaleToFitWidth(containerWidth);
    const scaledByHeight = this.scaleToFitHeight(containerHeight);

    // choose the scaling that fits entirely within container
    if (scaledByWidth.height <= containerHeight) {
      return scaledByWidth;
    }
    return scaledByHeight;
  }

  // generate multiple sizes for srcset
  generateSizes(widths: number[]) {
    return widths.map((width) => ({
      ...scaleByAspectRatio(this.originalDimensions, { width }),
    }));
  }
}

// usage example
const image = new ResponsiveImage(2048, 1536); // 4:3 ratio

console.log("Mobile:", image.scaleToFitWidth(320));
// Mobile: { width: 320, height: 240 }

console.log("Tablet:", image.scaleToFitWidth(768));
// Tablet: { width: 768, height: 576 }

console.log("Desktop:", image.scaleToFitWidth(1200));
// Desktop: { width: 1200, height: 900 }

// generate srcset sizes
const sizes = image.generateSizes([320, 640, 1024, 1920]);
console.log("Srcset sizes:", sizes);
// [
//   { width: 320, height: 240 },
//   { width: 640, height: 480 },
//   { width: 1024, height: 768 },
//   { width: 1920, height: 1440 }
// ]
