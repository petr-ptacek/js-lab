import type { DefaultTheme } from "vitepress";
import { resolveSymbolPath } from "./utils";
import { manifest } from "./manifest";

function entries<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}

export function createApiSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: "Overview", link: "/api/" },

        ...entries(manifest).map(([key, module]) => ({
          text: module.title,
          collapsed: false,
          items: module.symbols.map(symbol => ({
            text: symbol.name,
            link: resolveSymbolPath(key, symbol.name, symbol.kind),
          })),
        })),
      ],
    },
  ];
}
