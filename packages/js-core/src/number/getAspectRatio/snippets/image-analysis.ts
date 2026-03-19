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
