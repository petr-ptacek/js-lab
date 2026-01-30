import { defineModule } from "../.vitepress";

export const moduleDOM = defineModule({
  title: "DOM",
  description: "Utilities for working with DOM elements.",
  symbols: [
    { kind: "function", name: "isInteractiveElement" },
  ],
});
