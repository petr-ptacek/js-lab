import { ModuleDefinition, ModuleSymbol } from "../types";

function compareModuleSymbols(a: ModuleSymbol, b: ModuleSymbol): number {
  const aOrder = a.order ?? Infinity;
  const bOrder = b.order ?? Infinity;

  if (aOrder !== bOrder) {
    return aOrder - bOrder;
  }

  return a.name.localeCompare(b.name);
}

function sortModuleSymbols(symbols: ModuleSymbol[]): ModuleSymbol[] {
  return symbols
    .slice()
    .sort(compareModuleSymbols)
    .map(symbol => {
      if (symbol.kind === "section" && symbol.items?.length) {
        return {
          ...symbol,
          items: sortModuleSymbols(symbol.items),
        };
      }

      return symbol;
    });
}

export function defineModule(module: ModuleDefinition): ModuleDefinition {
  return {
    ...module,
    symbols: sortModuleSymbols(module.symbols),
  };
}
