---
title: withAbortable
category: async
tags:
  - async
  - abort
  - controller
  - cancellation
  - timeout
  - lifecycle
since: 1.0.0
---


> **Category:** async
> **Since:** 1.0.0
> **Tags:** async, abort, controller, cancellation, timeout, lifecycle


# withAbortable

Wraps an asynchronous function with AbortController lifecycle management.

## Usage

```ts
import { withAbortable } from "@petr-ptacek/js-core"

const getUser = withAbortable(
  async ({ signal }, id: string) => {
    const res = await fetch(`/api/users/${id}`, { signal });
    return res.json();
  }
);

const user = await getUser.execute("123");
```

## Why This Utility Exists

JavaScript's native AbortController requires manual lifecycle management and cleanup. This utility provides deterministic cancellation semantics for async tasks by automatically creating and controlling AbortController instances. It enforces a "latest execution wins" model by default, preventing race conditions in UI applications.

## Signature

```ts
function withAbortable<Args extends unknown[], R>(
  fn: AbortableFn<Args, R>,
  options?: WithAbortableOptions
): WithAbortableReturn<Args, R>
```

## Parameters

- `fn` (`AbortableFn<Args, R>`): An asynchronous function that receives an AbortableContext containing an AbortSignal. The function MUST respect the provided signal to ensure proper cancellation behavior.
- `options` (`WithAbortableOptions`, optional): Configuration options.
  - `autoAbort` (`boolean`, default `true`): Automatically aborts the previous execution before starting a new one.
  - `timeoutMs` (`number`, optional): Automatically aborts the execution if it does not complete within the specified milliseconds.

## Type Parameters

- `<Args extends unknown[]>`: The argument types of the wrapped function.
- `<R>`: The return type of the wrapped function.

## Return Type

Returns an object containing:
- `execute(...args)` — executes the wrapped function with the provided arguments.
- `abort()` — aborts the currently active execution.
- `signal` — the current AbortSignal or null if idle.
- `isRunning` — indicates whether an execution is currently in progress.

## Type Declarations

The utility exports several TypeScript types for proper integration:

```ts
type AbortableContext = {
  signal: AbortSignal;
}

type AbortableFn<Args extends unknown[], R> = 
  (context: AbortableContext, ...args: Args) => Promise<R>

type WithAbortableOptions = {
  autoAbort?: boolean;
  timeoutMs?: number;
}

type WithAbortableReturn<Args extends unknown[], R> = {
  execute: (...args: Args) => Promise<R>;
  abort: () => void;
  readonly signal: AbortSignal | null;
  readonly isRunning: boolean;
}
```

These types enable proper TypeScript integration and ensure type safety when using the utility.

## Design Notes

The implementation uses a "latest execution wins" model by default. When `autoAbort: true`, starting a new execution automatically aborts the previous one, guaranteeing a single active execution at a time.

The wrapped function MUST properly handle the provided AbortSignal. If it ignores the signal, cancellation cannot be guaranteed. When an execution is aborted, the returned promise typically rejects with a DOMException named "AbortError".

Timeout functionality is implemented via AbortController without introducing custom error types, maintaining consistency with native cancellation patterns.

## When To Use

Use `withAbortable` when you need:

- deterministic cancellation for async operations (especially API calls)
- automatic cleanup of previous requests when starting new ones
- timeout handling for long-running operations
- race condition prevention in UI components

## When Not To Use

Avoid when:

- the wrapped function doesn't support AbortSignal
- you need multiple concurrent executions without cancellation
- simple Promise-based operations without cancellation needs
- synchronous operations

## Summary

`withAbortable` provides robust AbortController lifecycle management with automatic cleanup, timeout support, and deterministic cancellation semantics for async functions.


## Snippets

### basic.ts

```ts
import { withAbortable } from "@petr-ptacek/js-core";

// Basic API call with automatic abort
const getUser = withAbortable(
  async ({ signal }, id: string) => {
    console.log(`Fetching user ${id}...`);
    const response = await fetch(`/api/users/${id}`, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    return response.json();
  }
);

// Execute the function
async function _example() {
  try {
    console.log("=== Basic Usage ===");

    // This will complete normally
    const user1 = await getUser.execute("123");
    console.log("User 1:", user1);

    // Start multiple executions - previous will be auto-aborted
    const promise1 = getUser.execute("456");
    const promise2 = getUser.execute("789"); // This aborts promise1

    const user2 = await promise2;
    console.log("User 2:", user2);

    try {
      await promise1; // This will likely be aborted
    } catch (error) {
      const err = error as Error;
      console.log("Promise1 was aborted:", err.name === "AbortError");
    }

  } catch (error) {
    const err = error as Error;
    console.error("Error:", err.message);
  }
}

// Check execution state
console.log("Is running before:", getUser.isRunning); // false
const promise = getUser.execute("current-user");
console.log("Is running during:", getUser.isRunning); // true
console.log("Current signal:", getUser.signal?.aborted); // false

promise.finally(() => {
  console.log("Is running after:", getUser.isRunning); // false
  console.log("Signal after:", getUser.signal); // null
});

// example();

```

### real-world-usage.ts

```ts
import { withAbortable } from "@petr-ptacek/js-core";

// Search with debouncing - cancel previous searches
const searchUsers = withAbortable(
  async ({ signal }, query: string) => {
    if (!query.trim()) {
      return [];
    }

    console.log(`Searching for: "${query}"`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    return response.json();
  }
);

// Image loading with fallback
const loadImage = withAbortable(
  async ({ signal }, src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

      // Handle abort
      signal.addEventListener('abort', () => {
        img.src = ''; // Stop loading
        reject(new DOMException('Image loading cancelled', 'AbortError'));
      });

      img.src = src;
    });
  },
  { timeoutMs: 10000 } // 10 second timeout for images
);

// Data fetching with retry logic
const fetchWithRetry = withAbortable(
  async ({ signal }, url: string, maxRetries: number = 3) => {
    let lastError: Error = new Error('No attempts made');

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
        if (signal.aborted || (error as Error).name === 'AbortError') {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(`Retry ${attempt} failed, waiting ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
);

// Simulated UI component behavior
class SearchComponent {
  private currentQuery = '';

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
      if (err.name === 'AbortError') {
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
      urls.map(url => loadImage.execute(url))
    );

    const successful: HTMLImageElement[] = [];
    const failed: string[] = [];

    results.forEach((result, index) => {
      const url = urls[index];
      if (!url) return;

      if (result.status === 'fulfilled') {
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
async function _demonstratePatterns() {
  console.log("=== Search Pattern ===");
  const searchComponent = new SearchComponent();

  // Simulate rapid typing - previous searches get cancelled
  searchComponent.handleSearch("jo");
  searchComponent.handleSearch("joh");  // cancels "jo"
  await searchComponent.handleSearch("john"); // cancels "joh"

  console.log("\n=== Image Loading Pattern ===");
  const gallery = new ImageGallery();

  const imageUrls = [
    "https://picsum.photos/200/200?random=1",
    "https://picsum.photos/200/200?random=2",
    "https://picsum.photos/200/200?random=3"
  ];

  try {
    await gallery.loadImages(imageUrls);
  } catch (error) {
    console.error("Image loading failed:", error);
  }

  console.log("\n=== Retry Pattern ===");
  try {
    const data = await fetchWithRetry.execute("https://jsonplaceholder.typicode.com/posts/1");
    console.log("Fetched data:", data.title);
  } catch (error) {
    const err = error as Error;
    console.error("All retry attempts failed:", err.message);
  }
}

// _demonstratePatterns();

```

### timeout-abort.ts

```ts
import { withAbortable } from "@petr-ptacek/js-core";

// Long-running operation with timeout
const longTask = withAbortable(
  async ({ signal }, duration: number) => {
    console.log(`Starting task that takes ${duration}ms...`);

    return new Promise<string>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        resolve(`Task completed in ${duration}ms`);
      }, duration);

      // Handle abort signal
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Task was aborted', 'AbortError'));
      });
    });
  },
  { timeoutMs: 3000 } // 3 second timeout
);

// Manual abort example
const downloadFile = withAbortable(
  async ({ signal }, url: string) => {
    console.log(`Downloading ${url}...`);

    // Simulate file download with progress
    for (let i = 0; i <= 100; i += 10) {
      if (signal.aborted) {
        throw new DOMException('Download cancelled', 'AbortError');
      }

      console.log(`Download progress: ${i}%`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return `Downloaded ${url} successfully`;
  }
);

async function _timeoutExample() {
  console.log("\n=== Timeout Example ===");

  try {
    // This will timeout after 3 seconds
    const result = await longTask.execute(5000);
    console.log(result);
  } catch (error) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      console.log("Task was aborted due to timeout");
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

async function _manualAbortExample() {
  console.log("\n=== Manual Abort Example ===");

  const downloadPromise = downloadFile.execute("https://example.com/file.zip");

  // Abort after 1 second
  setTimeout(() => {
    console.log("Manually aborting download...");
    downloadFile.abort();
  }, 1000);

  try {
    const result = await downloadPromise;
    console.log(result);
  } catch (error) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      console.log("Download was manually cancelled");
    }
  }
}

// Concurrent executions with autoAbort: false
const concurrentTask = withAbortable(
  async ({ signal }, taskId: number) => {
    console.log(`Starting concurrent task ${taskId}...`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (signal.aborted) {
      throw new DOMException(`Task ${taskId} was aborted`, 'AbortError');
    }

    return `Task ${taskId} completed`;
  },
  { autoAbort: false } // Allow concurrent executions
);

async function _concurrentExample() {
  console.log("\n=== Concurrent Example ===");

  // Start multiple tasks concurrently
  const promises = [
    concurrentTask.execute(1),
    concurrentTask.execute(2),
    concurrentTask.execute(3)
  ];

  // Wait for all to complete
  const results = await Promise.allSettled(promises);
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Result ${index + 1}:`, result.value);
    } else {
      console.log(`Task ${index + 1} failed:`, result.reason.message);
    }
  });
}

// Run examples
// _timeoutExample();
// _manualAbortExample();
// _concurrentExample();

```




