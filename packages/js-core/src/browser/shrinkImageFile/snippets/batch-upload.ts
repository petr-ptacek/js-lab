import { shrinkImageFile } from "@petr-ptacek/js-core";

// Multiple file upload with optimization

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadMultipleImages(files: FileList): Promise<void> {
  const optimized: File[] = [];

  for (const file of Array.from(files)) {
    try {
      const shrunk = await shrinkImageFile(file, {
        maxWidth: 1600,
        maxHeight: 1200,
        quality: 0.8,
      });

      optimized.push(shrunk);
      console.log(`✓ ${file.name} optimized: ${file.size} → ${shrunk.size}`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${file.name}:`, error);
    }
  }

  // Upload all optimized files
  const formData = new FormData();
  optimized.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });

  // await fetch("/api/upload-multiple", {
  //   method: "POST",
  //   body: formData,
  // });
}

// Different quality presets for different use cases

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function optimizeWithPresets(file: File): Promise<{
  thumbnail: File;
  display: File;
  archive: File;
}> {
  const [thumbnail, display, archive] = await Promise.all([
    shrinkImageFile(file, {
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.85,
      mimeType: "image/jpeg",
    }),
    shrinkImageFile(file, {
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 0.8,
      mimeType: "image/webp",
    }),
    shrinkImageFile(file, {
      maxWidth: 2000,
      maxHeight: 2000,
      mimeType: "image/png",
    }),
  ]);

  return { thumbnail, display, archive };
}
