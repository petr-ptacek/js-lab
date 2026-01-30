import type { DefaultTheme } from "vitepress";
import { EntryOfModule } from "./types";
import { resolveModulePath } from "./utils";


export function createSidebar(
  modules: EntryOfModule[],
): DefaultTheme.Sidebar {
  return [
    {
      items: [
        { text: "Overview", link: "/api/" },

        ...modules.map(({ key, module }) => ({
          text: module.title,
          collapsed: false,
          items: module.symbols.map(symbol => {
            if (symbol.kind === "section") {
              return {
                text: symbol.name,
                items: symbol.items?.map(item => ({
                  text: item.name,
                  link: resolveModulePath(key, item.name, item.kind),
                })),
              };
            }

            return {
              text: symbol.name,
              link: resolveModulePath(key, symbol.name, symbol.kind),
            };
          }),
        })),
      ],
    },
  ];
}
