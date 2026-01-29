export type Size = {
  width: number;
  height: number;
};

export type ScaleTarget =
  | { width: number; height?: never; }
  | { width?: never; height: number; };

export type RoundFn = (value: number) => number;
