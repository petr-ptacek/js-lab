import { withAbortable } from "@petr-ptacek/js-core";

// Search with debouncing - cancel previous searches
const searchUsers = withAbortable(async ({ signal }, query: string) => {
  if (!query.trim()) {
    return [];
  }

  console.log(`Searching for: "${query}"`);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
});

// Image loading with fallback
const loadImage = withAbortable(
  async ({ signal }, src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

      // Handle abort
      signal.addEventListener("abort", () => {
        img.src = ""; // Stop loading
        reject(new DOMException("Image loading cancelled", "AbortError"));
      });

      img.src = src;
    });
  },
  { timeoutMs: 10000 }, // 10 second timeout for images
);

// Data fetching with retry logic
const fetchWithRetry = withAbortable(
  async ({ signal }, url: string, maxRetries: number = 3) => {
    let lastError: Error = new Error("No attempts made");

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries} for ${url}`);

        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;

        // Don't retry if aborted
        if (signal.aborted || (error as Error).name === "AbortError") {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff
        const delay = 2 ** (attempt - 1) * 1000;
        console.log(`Retry ${attempt} failed, waiting ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  },
);

// Simulated UI component behavior
class SearchComponent {
  private currentQuery = "";

  async handleSearch(query: string) {
    this.currentQuery = query;

    try {
      // Previous search is automatically cancelled
      const results = await searchUsers.execute(query);

      // Check if query is still current (user didn't type something else)
      if (this.currentQuery === query) {
        console.log(`Search results for "${query}":`, results);
        return results;
      } else {
        console.log(`Discarding stale results for "${query}"`);
        return [];
      }
    } catch (error) {
      const err = error as Error;
      if (err.name === "AbortError") {
        console.log(`Search for "${query}" was cancelled`);
        return [];
      }
      throw error;
    }
  }
}

// Image gallery with loading management
class ImageGallery {
  private loadedImages = new Map<string, HTMLImageElement>();

  async loadImages(urls: string[]) {
    console.log(`Loading ${urls.length} images...`);

    // Load images concurrently, but allow cancellation of the whole batch
    const results = await Promise.allSettled(
      urls.map((url) => loadImage.execute(url)),
    );

    const successful: HTMLImageElement[] = [];
    const failed: string[] = [];

    results.forEach((result, index) => {
      const url = urls[index];
      if (!url) return;

      if (result.status === "fulfilled") {
        const img = result.value;
        this.loadedImages.set(url, img);
        successful.push(img);
      } else {
        failed.push(url);
        console.warn(`Failed to load image: ${url}`);
      }
    });

    console.log(`Loaded ${successful.length}/${urls.length} images`);

    if (failed.length > 0) {
      console.log(`Failed images:`, failed);
    }

    return { successful, failed };
  }

  _cancelImageLoading() {
    loadImage.abort();
    console.log("Cancelled image loading");
  }
}

// Usage examples
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _demonstratePatterns() {
  console.log("=== Search Pattern ===");
  const searchComponent = new SearchComponent();

  // Simulate rapid typing - previous searches get cancelled
  searchComponent.handleSearch("jo");
  searchComponent.handleSearch("joh"); // cancels "jo"
  await searchComponent.handleSearch("john"); // cancels "joh"

  console.log("\n=== Image Loading Pattern ===");
  const gallery = new ImageGallery();

  const imageUrls = [
    "https://picsum.photos/200/200?random=1",
    "https://picsum.photos/200/200?random=2",
    "https://picsum.photos/200/200?random=3",
  ];

  try {
    await gallery.loadImages(imageUrls);
  } catch (error) {
    console.error("Image loading failed:", error);
  }

  console.log("\n=== Retry Pattern ===");
  try {
    const data = await fetchWithRetry.execute(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    console.log("Fetched data:", data.title);
  } catch (error) {
    const err = error as Error;
    console.error("All retry attempts failed:", err.message);
  }
}

// _demonstratePatterns();
