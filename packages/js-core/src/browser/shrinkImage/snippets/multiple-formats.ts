import { shrinkImage } from "@petr-ptacek/js-core";

// Fit image inside a bounding box (e.g., 1600x1200)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeImageForGallery(imageElement: HTMLImageElement) {
  try {
    const blob = await shrinkImage(imageElement, {
      maxWidth: 1600,
      maxHeight: 1200,
    });

    console.log("Image optimized for gallery display");
    console.log(`Size: ${blob.size} bytes`);
    return blob;
  } catch (error) {
    console.error("Failed to optimize image:", error);
  }
}

// Different quality levels for different formats

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeWithFormats(imageElement: HTMLImageElement) {
  // High quality JPEG for thumbnails
  const thumbnail = await shrinkImage(imageElement, {
    maxWidth: 200,
    maxHeight: 200,
    quality: 0.85,
    mimeType: "image/jpeg",
  });

  // Medium quality WebP for display
  const display = await shrinkImage(imageElement, {
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.75,
    mimeType: "image/webp",
  });

  // High quality PNG for archive (lossless)
  const archive = await shrinkImage(imageElement, {
    maxWidth: 2000,
    maxHeight: 2000,
    mimeType: "image/png",
  });

  return { thumbnail, display, archive };
}
