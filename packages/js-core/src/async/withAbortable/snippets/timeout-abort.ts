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
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Task was aborted", "AbortError"));
      });
    });
  },
  { timeoutMs: 3000 }, // 3 second timeout
);

// Manual abort example
const downloadFile = withAbortable(async ({ signal }, url: string) => {
  console.log(`Downloading ${url}...`);

  // Simulate file download with progress
  for (let i = 0; i <= 100; i += 10) {
    if (signal.aborted) {
      throw new DOMException("Download cancelled", "AbortError");
    }

    console.log(`Download progress: ${i}%`);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  return `Downloaded ${url} successfully`;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _timeoutExample() {
  console.log("\n=== Timeout Example ===");

  try {
    // This will timeout after 3 seconds
    const result = await longTask.execute(5000);
    console.log(result);
  } catch (error) {
    const err = error as Error;
    if (err.name === "AbortError") {
      console.log("Task was aborted due to timeout");
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _manualAbortExample() {
  console.log("\n=== Manual Abort Example ===");

  const downloadPromise = downloadFile.execute("https://example.com/file.zip");

  // Abort after 1 second
  setTimeout(() => {
    console.log("Manually cancel download...");
    downloadFile.cancel();
  }, 1000);

  try {
    const result = await downloadPromise;
    console.log(result);
  } catch (error) {
    const err = error as Error;
    if (err.name === "AbortError") {
      console.log("Download was manually cancelled");
    }
  }
}

// Run examples
// _timeoutExample();
// _manualAbortExample();
