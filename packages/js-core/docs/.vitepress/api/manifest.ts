import type { ApiModule } from "./types";

import { moduleArray } from "./manifest.array";
import { moduleTypes } from "./manifest.types";
import { moduleObject } from "./manifest.object";
import { moduleEmitter } from "./manifest.emitter";
import { moduleDOM } from "./manifest.dom";

export const manifest: Record<string, ApiModule> = {
  array: moduleArray,
  object: moduleObject,
  emitter: moduleEmitter,
  dom: moduleDOM,
  types: moduleTypes,
  // common: {
  //   title: "common",
  //   symbols: [
  //     { name: "withTryCatch", kind: "function" },
  //     { name: "TryCatchResult", kind: "type" },
  //   ],
  // },

  // dom: {
  //   title: "dom",
  //   symbols: [
  //     { name: "isInteractiveElement", kind: "function" },
  //     { name: "DEFAULT_INTERACTIVE_SELECTORS", kind: "variable" },
  //   ],
  // },
};
