import { defineModule } from "../.vitepress";

export const moduleEmitter = defineModule({
  title: "Emitter",
  description: "Utility functions for working with objects.",
  symbols: [
    {
      kind: "class",
      name: "Emitter",
      order: 0,
    },
    // {
    //   kind: "section",
    //   name: "Types",
    //   order: 10,
    //   items: [
    //     { name: "EmitterEvents", kind: "type" },
    //     { name: "EmitterInitialHandlers", kind: "type" },
    //   ],
    // },
  ],
});
