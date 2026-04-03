import { isAbortError } from "@petr-ptacek/js-core";

// Basic check
console.log(isAbortError(new DOMException("Aborted", "AbortError"))); // true
console.log(isAbortError(new Error("Aborted"))); // false
console.log(isAbortError(null)); // false

// Type guard usage in a try/catch block
const controller = new AbortController();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _fetchWithAbort(url: string) {
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response.json();
  } catch (error) {
    if (isAbortError(error)) {
      // error is narrowed to DOMException
      console.log("Request was aborted:", error.message);
      return null;
    }
    throw error;
  }
}
