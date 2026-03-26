import { shrinkImage, shrinkImageElement } from "@petr-ptacek/js-core";

// Demonstrate the difference between shrinkImage and shrinkImageElement

// Use shrinkImage when you need to upload/save the blob

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadOptimizedImage(imageElement: HTMLImageElement): Promise<void> {
  // Get blob for upload
  const blob = await shrinkImage(imageElement, {
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  });

  const formData = new FormData();
  formData.set("image", blob, "optimized.jpg");

  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
}

// Use shrinkImageElement when you need to display the resized image

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function displayOptimizedImage(imageElement: HTMLImageElement): Promise<void> {
  // Get element for display
  const resized = await shrinkImageElement(imageElement, {
    maxWidth: 1200,
    maxHeight: 1200,
  });

  // Append directly to DOM
  document.body.appendChild(resized);
}

// Practical example: Optimize AND upload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeAndDisplay(
  originalImg: HTMLImageElement,
): Promise<{ displayImage: HTMLImageElement; uploadBlob: Blob }> {
  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  };

  // Get blob for upload
  const uploadBlob = await shrinkImage(originalImg, options);

  // Get element for display (may use same blob converted back to element)
  const displayImage = await shrinkImageElement(originalImg, options);

  return { displayImage, uploadBlob };
}
