import { defineApiModule } from "./utils";

export const moduleTypes = defineApiModule({
  title: "types",
  description: "Global TypeScript utility types.",
  symbols: [
    // { name: "Overview", kind: "overview" },
    { name: "MaybeNullable", kind: "type" },
    { name: "MaybeNull", kind: "type" },
    { name: "MaybeUndefined", kind: "type" },
    { name: "MaybePromise", kind: "type" },
    { name: "Dict", kind: "type" },
    { name: "PrimitiveValue", kind: "type" },
  ],
});
