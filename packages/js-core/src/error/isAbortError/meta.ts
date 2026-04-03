import type { Meta } from "../../_internal/meta";

export const meta = {
  id: "isAbortError",
  name: "isAbortError",
  description: "Checks whether a value is a DOMException with name 'AbortError'.",
  category: "error",
  tags: ["error", "abort", "dom-exception", "type-guard", "cancellation"],
  demo: false,
  snippets: true,
  since: "1.1.0",
} satisfies Meta;
