export type MetaCategory =
  | "async"
  | "array"
  | "browser"
  | "crypto"
  | "error"
  | "event"
  | "number"
  | "object"
  | "validation"
  | "type";

export type Meta = Readonly<{
  id: string;
  name: string;
  category: MetaCategory;
  description?: string;
  demo?: boolean;
  snippets?: boolean;
  tags?: readonly string[];
  deprecated?: boolean;
  since?: `${number}.${number}.${number}`;
  experimental?: boolean;
}>;
