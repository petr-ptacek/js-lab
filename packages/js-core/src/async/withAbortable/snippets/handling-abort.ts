import { withAbortable } from "@petr-ptacek/js-core";

const fetchUser = withAbortable(async ({ signal }, id: string) => {
  const response = await fetch(`/api/users/${id}`, { signal });

  if (!response.ok) {
    throw new Error(`Failed: ${response.status}`);
  }

  return response.json() as Promise<{ id: string; name: string }>;
});

// --- Helper: check if an error is an AbortError ---

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

// --- Pattern 1: try/catch — explicit abort handling ---
// Use when you need to distinguish abort from other errors.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _tryCatchPattern(id: string) {
  try {
    const user = await fetchUser.execute(id);
    console.log("User:", user);
  } catch (error) {
    if (isAbortError(error)) {
      // Execution was superseded or manually cancelled — silently ignore.
      return;
    }
    // Re-throw unexpected errors.
    throw error;
  }
}

// --- Pattern 2: .catch() inline — silent abort ---
// Use when abort should always be silently ignored (e.g. UI components).

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _inlineCatchPattern(id: string) {
  const user = await fetchUser
    .execute(id)
    .catch((error: unknown) => (isAbortError(error) ? undefined : Promise.reject(error)));

  if (user === undefined) {
    // Aborted — skip state update.
    return;
  }

  console.log("User:", user);
}

// --- Pattern 3: React / Vue effect — cancel on unmount ---
// Each new call to the effect aborts the previous one automatically.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function _useUserEffect(userId: string) {
  // In a Vue watchEffect or React useEffect:
  fetchUser
    .execute(userId)
    .then((user) => {
      console.log("Loaded:", user);
    })
    .catch((error: unknown) => {
      if (!isAbortError(error)) {
        console.error("Unexpected error:", error);
      }
      // AbortError is ignored — a newer call is already in progress.
    });

  // Cleanup: cancel on unmount or before the next effect run.
  return () => fetchUser.cancel();
}

// _tryCatchPattern("123");
// _inlineCatchPattern("123");
