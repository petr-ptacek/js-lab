import { withRunId } from "@petr-ptacek/js-core";

// --- Result-based error handling (default, throwOnError: false) ---
// Errors are captured and returned as { status: "error", error }.
// No try/catch needed at the call site.

const loadData = withRunId(async (_ctx, id: string) => {
  const response = await fetch(`/api/data/${id}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<unknown>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _resultBasedExample() {
  const result = await loadData.execute("42");

  if (result.status === "success") {
    console.log("Data loaded:", result.result);
    return;
  }

  if (result.status === "error") {
    console.error("Failed to load data:", result.error);
    return;
  }

  // handle skipped / replaced / canceled
  console.warn("Execution did not complete:", result.status);
}

// --- Exception-based error handling (throwOnError: true) ---
// Errors are re-thrown and must be caught with try/catch.

const loadDataStrict = withRunId(
  async (_ctx, id: string) => {
    const response = await fetch(`/api/data/${id}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<unknown>;
  },
  { throwOnError: true },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _throwExample() {
  try {
    const result = await loadDataStrict.execute("42");

    if (result.status === "success") {
      console.log("Data loaded:", result.result);
    }
  } catch (error) {
    console.error("Caught error:", error);
  }
}

// --- Using an external AbortSignal ---
// Combine withRunId with an AbortController for real cancellation.

const controller = new AbortController();

const fetchWithSignal = withRunId(
  async (_ctx, url: string) => {
    // Pass the signal to the underlying fetch for real cancellation
    const response = await fetch(url, { signal: controller.signal });
    return response.json() as Promise<unknown>;
  },
  { signal: controller.signal },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _abortSignalExample() {
  // Abort after 2 seconds
  setTimeout(() => controller.abort(), 2000);

  const result = await fetchWithSignal.execute("https://api.example.com/data");

  if (result.status === "canceled") {
    console.log("Execution was canceled via AbortSignal");
  }
}

// _resultBasedExample();
// _throwExample();
// _abortSignalExample();
