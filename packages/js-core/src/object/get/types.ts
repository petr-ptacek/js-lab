import type { PrimitiveValue } from "../../type";

export type Path<T> = T extends PrimitiveValue
  ? never
  : T extends readonly (infer U)[]
    ? `${number}` | `${number}.${Path<U>}`
    : {
        [K in keyof T & string]: T[K] extends PrimitiveValue
          ? K
          : K | `${K}.${Path<T[K]>}`;
      }[keyof T & string];

export type PathValue<T, P extends string> = T extends readonly (infer U)[]
  ? P extends `${number}.${infer Rest}`
    ? PathValue<U, Rest>
    : P extends `${number}`
      ? U
      : never
  : P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;
