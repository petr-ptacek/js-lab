import { ApiSymbolKind } from "../types";

export function resolveSymbolPath(
  moduleKey: string,
  symbolName: string,
  kind: ApiSymbolKind,
): string {
  switch (kind) {
    case "overview":
      return `/api/${moduleKey}`;

    case "function":
      return `/api-generated/functions/${symbolName}`;

    case "class":
      return `/api-generated/classes/${symbolName}`;

    case "type":
      return `/api-generated/type-aliases/${symbolName}`;

    case "variable":
      return `/api-generated/variables/${symbolName}`;

    default: {
      // exhaustiveness check
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
