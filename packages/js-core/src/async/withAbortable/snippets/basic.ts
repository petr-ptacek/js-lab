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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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
