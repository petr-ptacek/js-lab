export type MetaKind = "composable" | "component" | "utility" | "type";

export type Meta = Readonly<{
  id: string;
  name: string;
  kind: MetaKind;
  description?: string;
  demo?: boolean;
  snippets?: boolean;
  tags?: readonly string[];
  since?: `${number}.${number}.${number}`;
  experimental?: boolean;
  deprecated?: boolean;
}>;
