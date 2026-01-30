import { defineApiModule } from "./utils";

export const moduleArray = defineApiModule({
  title: "Array",
  description: "Utility functions for working with arrays.",
  symbols: [
    { name: "Overview", kind: "overview" },
    { name: "range", kind: "function" },
    { name: "shuffle", kind: "function" },
    { name: "zip", kind: "function" },
  ],
});
