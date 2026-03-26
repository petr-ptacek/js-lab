import { shrinkImageElement } from "@petr-ptacek/js-core";

// Preview before upload: Show optimized version while keeping original for upload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function previewOptimizedImage(
  sourceImage: HTMLImageElement,
  previewContainer: HTMLElement,
): Promise<void> {
  try {
    // Create optimized preview (smaller quality/size for display)
    const preview = await shrinkImageElement(sourceImage, {
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.7,
    });

    // Display the preview
    previewContainer.innerHTML = "";
    previewContainer.appendChild(preview);

    console.log("Optimized preview ready for upload");
  } catch (error) {
    console.error("Failed to create preview:", error);
  }
}

// Replace gallery images with optimized versions

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeGalleryImages(): Promise<void> {
  const images =
    document.querySelectorAll<HTMLImageElement>("img.gallery-item");

  for (const img of Array.from(images)) {
    try {
      const optimized = await shrinkImageElement(img, {
        maxWidth: 1600,
        maxHeight: 1600,
      });

      img.replaceWith(optimized);
    } catch (error) {
      console.error(`Failed to optimize image: ${img.src}`, error);
    }
  }
}

// Generate responsive display versions

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createResponsiveVersions(
  sourceImage: HTMLImageElement,
): Promise<{
  small: HTMLImageElement;
  medium: HTMLImageElement;
  large: HTMLImageElement;
}> {
  const [small, medium, large] = await Promise.all([
    shrinkImageElement(sourceImage, { maxWidth: 400, maxHeight: 400 }),
    shrinkImageElement(sourceImage, { maxWidth: 800, maxHeight: 800 }),
    shrinkImageElement(sourceImage, { maxWidth: 1600, maxHeight: 1600 }),
  ]);

  return { small, medium, large };
}
