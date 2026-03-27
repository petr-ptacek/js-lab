import { shrinkImage } from "@petr-ptacek/js-core";

// Helper function for form submission with image optimization

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function submitFormWithOptimizedImage(
  formElement: HTMLFormElement,
  imageElement: HTMLImageElement,
  maxWidth: number,
  maxHeight: number,
): Promise<void> {
  try {
    // Optimize the image
    const optimizedBlob = await shrinkImage(imageElement, {
      maxWidth,
      maxHeight,
      quality: 0.8,
    });

    // Create FormData
    const formData = new FormData(formElement);

    // Replace or add the image file
    formData.set("image", optimizedBlob, "optimized-image.jpg");

    // Submit the form
    const response = await fetch(formElement.action, {
      method: formElement.method || "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    console.log("Image uploaded successfully");
  } catch (error) {
    console.error("Failed to upload image:", error);
  }
}

// Example usage:
// const form = document.querySelector("form")!;
// const img = document.querySelector("img")!;
// await submitFormWithOptimizedImage(form, img, 1600, 1600);
