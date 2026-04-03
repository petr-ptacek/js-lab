import { withRunId } from "@petr-ptacek/js-core";

// Wrap an async function with default "drop" strategy
const fetchUser = withRunId(async (_ctx, id: string) => {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json() as Promise<{ id: string; name: string }>;
});

// Execute and handle the result via discriminated union
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _example() {
  const result = await fetchUser.execute("123");

  switch (result.status) {
    case "success":
      console.log("User:", result.result);
      break;
    case "skipped":
      console.log("Execution was skipped — a run is already active");
      break;
    case "error":
      console.error("Execution failed:", result.error);
      break;
  }
}

// Check execution state
console.log("Is running before:", fetchUser.isRunning); // false

const promise = fetchUser.execute("456");
console.log("Is running during:", fetchUser.isRunning); // true

promise.finally(() => {
  console.log("Is running after:", fetchUser.isRunning); // false
});

// _example();
