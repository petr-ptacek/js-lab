export type ModuleSymbolKind =
  | "section"
  | "function"
  | "class"
  | "type"
  | "variable";

export type ModuleSection = {
  kind: "section";
  name: string;
  order?: number;
  items?: ModuleSymbol[];
};

export type ModuleItem = {
  kind: Exclude<ModuleSymbolKind, "section">;
  name: string;
  order?: number;
};

export type ModuleSymbol = ModuleSection | ModuleItem;

export type ModuleDefinition = {
  opened?: boolean;
  title: string;
  description?: string;
  symbols: ModuleSymbol[];
};

export type EntryOfModule = {
  key: string;
  module: ModuleDefinition;
}
