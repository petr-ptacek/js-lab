import { shrinkImage } from "@petr-ptacek/js-core";

// Basic usage: Shrink image before upload
const imageInput =
  document.querySelector<HTMLInputElement>("input[type='file']")!;

imageInput.addEventListener("change", async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  // Create image element
  const img = new Image();
  img.onload = async () => {
    try {
      // Shrink image to max 1600x1600
      const blob = await shrinkImage(img, {
        maxWidth: 1600,
        maxHeight: 1600,
      });

      console.log(`Original: ${file.size} bytes`);
      console.log(`Optimized: ${blob.size} bytes`);
      console.log(`Saved: ${((1 - blob.size / file.size) * 100).toFixed(1)}%`);
    } catch (error) {
      console.error("Failed to shrink image:", error);
    }
  };

  // Load image from file
  img.src = URL.createObjectURL(file);
});
