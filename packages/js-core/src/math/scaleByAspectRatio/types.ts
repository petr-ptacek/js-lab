export type DimensionsTarget =
  | { width: number; height?: never; }
  | { width?: never; height: number; };
