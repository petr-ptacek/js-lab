import { defineApiModule } from "./utils";

export const moduleObject = defineApiModule({
  title: "Object",
  description: "Utility functions for working with objects.",
  symbols: [
    // { name: "Overview", kind: "overview" },
    { name: "get", kind: "function" },
    { name: "entries", kind: "function" },
  ],
});
