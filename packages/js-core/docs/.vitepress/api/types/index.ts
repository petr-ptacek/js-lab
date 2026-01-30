export type ApiSymbolKind =
  | "overview"
  | "function"
  | "class"
  | "type"
  | "variable";

export type ApiSymbol = {
  name: string;
  kind: ApiSymbolKind;
};

export type ApiModule = {
  title: string;
  description?: string;
  symbols: ApiSymbol[];
};
