import { withRunId } from "@petr-ptacek/js-core";

// --- Strategy: "drop" ---
// New calls are ignored while a run is active.
// Useful for preventing button spam or duplicate submissions.

const submitForm = withRunId(
  async (_ctx, data: Record<string, string>) => {
    console.log("Submitting form...", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
  { strategy: "drop" },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _dropExample() {
  const [result1, result2] = await Promise.all([
    submitForm.execute({ name: "Alice" }),
    submitForm.execute({ name: "Bob" }), // ignored — first call still running
  ]);

  console.log(result1); // { status: "success", result: { success: true } }
  console.log(result2); // { status: "skipped" }
}

// --- Strategy: "queue" ---
// Each call waits for the previous one to finish before starting.
// Useful for sequential writes or ordered mutations.

const saveRecord = withRunId(
  async (_ctx, record: { id: number; value: string }) => {
    console.log(`Saving record ${record.id}...`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { saved: true, id: record.id };
  },
  { strategy: "queue" },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _queueExample() {
  // All three calls will execute — one after another, in order
  const [r1, r2, r3] = await Promise.all([
    saveRecord.execute({ id: 1, value: "a" }),
    saveRecord.execute({ id: 2, value: "b" }),
    saveRecord.execute({ id: 3, value: "c" }),
  ]);

  console.log(r1); // { status: "success", result: { saved: true, id: 1 } }
  console.log(r2); // { status: "success", result: { saved: true, id: 2 } }
  console.log(r3); // { status: "success", result: { saved: true, id: 3 } }
}

// --- Strategy: "replace" ---
// A new call starts immediately and the previous result is discarded.
// Useful for search inputs or "latest wins" scenarios.

const search = withRunId(
  async (_ctx, query: string) => {
    console.log(`Searching for: "${query}"...`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [`result for "${query}"`];
  },
  { strategy: "replace" },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function _replaceExample() {
  // Simulate rapid user typing
  const [r1, r2, r3] = await Promise.all([
    search.execute("j"),
    search.execute("jo"), // replaces "j"
    search.execute("joh"), // replaces "jo"
  ]);

  console.log(r1); // { status: "replaced" }
  console.log(r2); // { status: "replaced" }
  console.log(r3); // { status: "success", result: ['result for "joh"'] }
}

// _dropExample();
// _queueExample();
// _replaceExample();
