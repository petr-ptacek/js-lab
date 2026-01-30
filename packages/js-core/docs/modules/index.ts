import { defineModules } from "../.vitepress";
import { moduleArray } from "./array";
import { moduleTypes } from "./types";
import { moduleObject } from "./object";
import { moduleEmitter } from "./emitter";
import { moduleDOM } from "./dom";
import { moduleVariables } from "./variables";

export const modules = defineModules([
  { key: "array", module: moduleArray },
  { key: "object", module: moduleObject },
  { key: "emitter", module: moduleEmitter },
  { key: "dom", module: moduleDOM },
  { key: "types", module: moduleTypes },
  { key: "variables", module: moduleVariables },
]);
