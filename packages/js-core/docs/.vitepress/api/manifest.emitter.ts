import { defineApiModule } from "./utils";

export const moduleEmitter = defineApiModule({
  title: "Emitter",
  description: "Utility functions for working with objects.",
  symbols: [
    // { name: "Overview", kind: "overview" },
    { name: "Emitter", kind: "class" },
    { name: "EmitterEvents", kind: "type" },
    { name: "EmitterInitialHandlers", kind: "type" },
  ],
});
