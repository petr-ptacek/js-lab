import { defineModule } from "../.vitepress";

export const moduleTypes = defineModule({
  title: "Types",
  description: "Global TypeScript utility types.",
  symbols: [
    // { name: "Overview", kind: "overview" },

    { name: "EmitterEvents", kind: "type", order: -1 },
    { name: "EmitterInitialHandlers", kind: "type", order: -1 },
    { name: "MaybeNullable", kind: "type" },
    { name: "MaybeNull", kind: "type" },
    { name: "MaybeUndefined", kind: "type" },
    { name: "MaybePromise", kind: "type" },
    { name: "Dict", kind: "type" },
    { name: "PrimitiveValue", kind: "type" },
  ],
});
