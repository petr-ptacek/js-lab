import { shrinkImageFile } from "@petr-ptacek/js-core";

// Basic usage: Shrink file before upload
const input = document.querySelector<HTMLInputElement>("input[type='file']")!;

input.addEventListener("change", async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    // Optimize the file
    const shrunk = await shrinkImageFile(file, {
      maxWidth: 1600,
      maxHeight: 1600,
    });

    console.log(`Original: ${file.size} bytes`);
    console.log(`Optimized: ${shrunk.size} bytes`);
    console.log(`Saved: ${((1 - shrunk.size / file.size) * 100).toFixed(1)}%`);

    // Ready for upload
    const formData = new FormData();
    formData.append("image", shrunk);
    // await fetch("/api/upload", { method: "POST", body: formData });
  } catch (error) {
    console.error("Failed to optimize file:", error);
  }
});

