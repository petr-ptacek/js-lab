import type { ApiModule } from "./types";

import { moduleArray } from "./manifest.array";
import { moduleTypes } from "./manifest.types";

export const manifest: Record<string, ApiModule> = {
  array: moduleArray,
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
