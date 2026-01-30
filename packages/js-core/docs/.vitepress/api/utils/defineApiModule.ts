import { ApiModule } from "../types";

export function defineApiModule(module: ApiModule): ApiModule {
  return {
    ...module,
    symbols: module.symbols.slice().sort((a, b) => {
      // Overview always first
      if (a.kind === "overview" && b.kind !== "overview") return -1;
      if (a.kind !== "overview" && b.kind === "overview") return 1;

      // Otherwise sort alphabetically
      return a.name.localeCompare(b.name);
    }),
  };
}
