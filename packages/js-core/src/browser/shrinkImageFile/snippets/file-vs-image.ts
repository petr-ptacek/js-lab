import { shrinkImageFile, shrinkImage } from "@petr-ptacek/js-core";

// Demonstrate use cases: when to use shrinkImageFile vs shrinkImage

// Use shrinkImageFile when you have a File from input

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleFileInputUpload(): Promise<void> {
  const input = document.querySelector<HTMLInputElement>("input[type='file']")!;
  const file = input.files![0]!;

  // File in → File out
  const optimized = await shrinkImageFile(file, {
    maxWidth: 1600,
    maxHeight: 1600,
  });

  const formData = new FormData();
  formData.append("file", optimized);
  // await fetch("/api/upload", { method: "POST", body: formData });
}

// Use shrinkImage when you have an HTMLImageElement

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleImageElementOptimization(): Promise<void> {
  const img = document.querySelector<HTMLImageElement>("img")!;

  // Image element in → Blob out
  const blob = await shrinkImage(img, {
    maxWidth: 1600,
    maxHeight: 1600,
  });

  const formData = new FormData();
  formData.append("image", blob);
  // await fetch("/api/upload", { method: "POST", body: formData });
}

// Real-world example: Avatar upload form

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadAvatarForm(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const input = form.querySelector<HTMLInputElement>("input[type='file']")!;
  const file = input.files?.[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  try {
    // Optimize for avatar (square, smaller size)
    const optimized = await shrinkImageFile(file, {
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.85,
    });

    // Submit form with optimized file
    const formData = new FormData(form);
    formData.set("avatar", optimized, optimized.name);

    const response = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    console.log("Avatar uploaded successfully");
  } catch (error) {
    console.error("Failed to upload avatar:", error);
  }
}

