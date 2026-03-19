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
