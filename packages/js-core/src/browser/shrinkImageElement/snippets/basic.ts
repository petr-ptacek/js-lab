import { shrinkImageElement } from "@petr-ptacek/js-core";

// Basic usage: Resize an image element for display
const img = document.querySelector<HTMLImageElement>("img")!;

try {
  const resized = await shrinkImageElement(img, {
    maxWidth: 1200,
    maxHeight: 1200,
  });

  // Replace the original image
  img.replaceWith(resized);

  console.log("Image resized and displayed");
} catch ( error ) {
  console.error("Failed to resize image:", error);
}

