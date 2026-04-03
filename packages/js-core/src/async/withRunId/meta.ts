import type { Meta } from "../../_internal/meta";

export const meta = {
  id: "withRunId",
  name: "withRunId",
  description:
    "Wraps a function with controlled execution semantics based on a configurable concurrency strategy.",
  category: "async",
  tags: [
    "async",
    "concurrency",
    "race-condition",
    "queue",
    "drop",
    "replace",
    "run-id",
    "strategy",
  ],
  demo: false,
  snippets: true,
  since: "1.0.0",
} satisfies Meta;
